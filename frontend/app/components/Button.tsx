


type ButtonProp = {
    title: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProp> = ({ onClick, title }) =>{
  return (
    <>
              <div className=" w-32 bg-[#2BD17E] hover:bg-transparent border border-white rounded-lg shadow-lg">
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
