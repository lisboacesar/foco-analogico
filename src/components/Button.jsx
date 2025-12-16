import { twMerge } from 'tailwind-merge';

export const Button = ({ children, onClick, className, variant = 'primary' }) => {
  const baseStyles = "px-4 py-2 font-bold text-sm uppercase tracking-widest transition-all active:translate-y-[2px] active:shadow-none border-2 border-retro-dark";
  
  const variants = {
    primary: "bg-retro-surface text-retro-dark shadow-hard hover:bg-[#E0DBCF]",
    danger: "bg-retro-accent text-white shadow-hard hover:opacity-90",
    display: "bg-transparent shadow-none border-none p-0 hover:text-retro-accent"
  };

  return (
    <button onClick={onClick} className={twMerge(baseStyles, variants[variant], className)}>
      {children}
    </button>
  );
};