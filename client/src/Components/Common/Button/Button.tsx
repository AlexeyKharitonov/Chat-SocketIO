import { ButtonProps } from "./Button.type";

const Button = ({ classes, handleClick, children }: ButtonProps) => {
  const defaultBtnStyles =
    "flex justify-center items-center text-base font-semibold px-5 py-3 rounded-2xl transition-colors";

  return (
    <button onClick={handleClick} className={`${defaultBtnStyles} ${classes}`}>
      {children}
    </button>
  );
};

export { Button };
