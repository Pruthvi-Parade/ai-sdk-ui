import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({ variant = 'default', asChild, children, ...props }) => {
  const baseStyles = "px-4 py-2 rounded focus:outline-none focus:ring";
  const variantStyles = variant === 'outline' 
    ? "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100" 
    : "text-white bg-blue-600 hover:bg-blue-700";

  const className = `${baseStyles} ${variantStyles}`;

  const button = (
    <button className={className} {...props}>
      {children}
    </button>
  );

  return asChild ? <>{button}</> : button;
};

export default Button;