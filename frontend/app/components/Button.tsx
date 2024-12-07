
type ButtonProp = {
  children: React.ReactNode;
  onClick?: () => void;
  bg?: string;
  width?: string;
};

const Button: React.FC<ButtonProp> = ({ onClick, children, bg, width }) => {
  const containerStyle: React.CSSProperties = {
    width: width ? `${width}rem` : '8rem',
    backgroundColor: bg || '#2BD17E',
    border: bg === 'transparent' ? '1px solid #2BD17E' : 'none',
    borderRadius: '0.5rem',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, border 0.3s ease',
  };

  const buttonStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    color: 'white',
    backgroundColor: 'inherit',
    border: 'none',
    cursor: 'pointer',
  };

  const hoverStyle: React.CSSProperties = {
    backgroundColor: bg === 'transparent' ? '#2BD17E' : 'transparent',
    border: bg !== 'transparent' ? '1px solid #2BD17E' : undefined,
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
      onMouseLeave={(e) =>
        Object.assign(e.currentTarget.style, {
          backgroundColor: bg || '#2BD17E',
          border: bg === 'transparent' ? '1px solid #2BD17E' : 'none',
        })
      }
    >
      <button onClick={onClick} style={buttonStyle}>
        {children}
      </button>
    </div>
  );
};

export default Button;
