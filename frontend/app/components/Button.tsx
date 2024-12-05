


type ButtonProp = {
    title: string | any;
    onClick?: () => void;
    bg?: string;
    width?: string;
}

const Button: React.FC<ButtonProp> = ({ onClick, title, bg, width }) =>{
  return (
    <>
              <div className={`${width ? `w-${width}` : 'w-32'} ${bg ? `bg-${bg}` : 'bg-[#2BD17E]'}  hover:bg-transparent hover:border rounded-lg shadow-lg`}>
                <button
                  onClick = {onClick}
                  className="block w-full text-center px-4 py-2 rounded-lg text-white"
                >
                  {title}
                </button>
              </div>
    </>
  );
};

export default Button
