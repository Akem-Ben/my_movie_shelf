import { Pencil, Trash2, Heart } from "lucide-react";

type MovieCardProp = {
    imageSrc: string;
    title: string;
    date: string;
    owner?: boolean;
}

const MovieCard: React.FC<MovieCardProp> = ({ imageSrc, title, date, owner }) =>{
  return (
    <>
      <div
        className="block bg-[#092C39] h-[30rem] hover:scale-105 hover:bg-[#0829358C] transition-all rounded-lg shadow-md p-4"
      >
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-[22rem] object-cover rounded-md mb-2"
          />
          <h2 className="text-xl text-white font-bold mb-2">
            {title}
          </h2>
          <div className="flex items-center justify-between pr-4">
          <h4 className="text-lg text-white font-light mb-2">
            {title}
          </h4>
          <div className="flex gap-4">
            <Heart className="text-white" style={{ width: "1rem", height: "1rem" }}/> {owner && <Pencil className="text-white" style={{ width: "1rem", height: "1rem" }}/>} {owner && <Trash2 className="text-white" style={{ width: "1rem", height: "1rem" }}/>}
          </div>
          </div>
      </div>
    </>
  );
};

export default MovieCard
