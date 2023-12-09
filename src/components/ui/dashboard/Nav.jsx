export default function Nav({ children }) {
  return (
    <div className="contents md:flex md:flex-col md:justify-start md:items-center md:gap-[10px] md:w-auto md:h-1/2">
      {children}
    </div>
  );
}
