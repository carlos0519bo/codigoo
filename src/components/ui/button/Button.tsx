interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

export const Button = ({
  children,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`w-full sm:w-auto text-white bg-[#050708] hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center me-2 mb-2 transition-colors duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
