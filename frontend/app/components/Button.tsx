type ButtonProp = {
  children: React.ReactNode; // Accept any React node
  onClick?: () => void;
  bg?: string;
  width?: string;
};

const Button: React.FC<ButtonProp> = ({ onClick, children, bg, width }) => {
  return (
    <div
      className={`${
        width ? `w-${width}` : 'w-32'
      } ${bg ? `bg-${bg}` : 'bg-[#2BD17E]'} border ${
        bg === 'transparent' && 'hover:bg-[#2BD17E]'
      } hover:bg-transparent hover:border rounded-lg shadow-lg`}
    >
      <button
        onClick={onClick}
        className="block w-full text-center px-4 py-2 rounded-lg text-white"
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
