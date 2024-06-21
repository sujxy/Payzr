"use client";
interface ButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}

export const Button = ({ onClick, label, className }: ButtonProps) => {
  return (
    <button onClick={onClick} className={"filled-btn" + " " + className}>
      {label}
    </button>
  );
};
