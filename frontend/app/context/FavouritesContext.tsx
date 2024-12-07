"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface FavouritesItems {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  quantity?: number;
}

interface FavouritesContextType {
  favouritesItems: FavouritesItems[];
  itemCount: number;
  addToFavourites: (item: FavouritesItems) => void;
  removeFromFavourites: (id: number) => void; 
}

const FavouritesContext = createContext<FavouritesContextType | undefined | any>(undefined);

export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  const addToFavourites = (item: FavouritesItems) => {
    const confirmItem:any = favouritesItems.find((element:any) => element.id === item.id);
  
    if (confirmItem) {
      setFavouritesItems((prev) =>
        prev.map((element:any) =>
          element.id === item.id
            ? { ...element, quantity: element.quantity + 1 }
            : element
        )
      );
    } else {
      setFavouritesItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const removeFromFavourites = (id: number) => {
    setFavouritesItems((prev) => prev.filter(item => item.id !== id));
  };

  const itemCount = favouritesItems.length;

  return (
    <FavouritesContext.Provider value={{ favouritesItems, itemCount, addToFavourites, removeFromFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = (): FavouritesContextType => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavoutites must be used within a FavouritesProvider');
  }
  return context;
};
