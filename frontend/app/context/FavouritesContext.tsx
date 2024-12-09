"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface FavouritesItems {
  id: string;
  title: string;
  date: number | any;
  imageSrc: string;
}

interface FavouritesContextType {
  favouritesItems: FavouritesItems[];
  itemCount: number;
  toggleFavourites: (movie: Record<string, any> | any) => void;
  removeFromFavourites: (id: string) => void
}

const FavouritesContext = createContext<
  FavouritesContextType | undefined | any
>(undefined);

export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favouritesItems, setFavouritesItems] = useState<FavouritesItems[]>([]);

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
      setFavouritesItems(JSON.parse(storedFavourites));
    }
  }, []);

  useEffect(() => {
    if (favouritesItems.length > 0) {
      localStorage.setItem("favourites", JSON.stringify(favouritesItems));
    } else {
      localStorage.removeItem("favourites");
    }
  }, [favouritesItems]);

  const toggleFavourites = (item: FavouritesItems) => {
    const itemExists = favouritesItems.some(
      (element: FavouritesItems) => element.id === item.id
    );
  
    if (itemExists) {

      setFavouritesItems((prev) =>
        prev.filter((element: FavouritesItems) => element.id !== item.id)
      );
    } else {
      setFavouritesItems((prev) => [...prev, { ...item }]);
    }
  };
  

  const removeFromFavourites = (id: string) => {
    setFavouritesItems((prev) => prev.filter((item) => item.id !== id));
  };

  const itemCount = favouritesItems.length;

  return (
    <FavouritesContext.Provider
      value={{
        favouritesItems,
        itemCount,
        toggleFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = (): FavouritesContextType => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavoutites must be used within a FavouritesProvider");
  }
  return context;
};
