


type MovieCardProp = {
    imageSrc: string;
    title: string;
    date: string;
}

const MovieCard: React.FC<MovieCardProp> = ({ imageSrc, title, date }) =>{
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
          <h4 className="text-lg text-white font-light mb-2">
            {title}
          </h4>
      </div>
    </>
  );
};

export default MovieCard
