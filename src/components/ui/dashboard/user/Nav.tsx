export default function Nav({ children }) {
  return (
    <div className="flex md:flex-nowrap flex-wrap justify-center items-center md:gap-[30px] gap-[10px]">
      {children}
    </div>
  );
}
