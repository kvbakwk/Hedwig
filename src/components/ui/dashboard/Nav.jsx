export default function Nav({ children }) {
  return (
    <div className="md:flex contents flex-col justify-start items-center gap-[10px] md:w-auto md:h-1/2">
      {children}
    </div>
  );
}
