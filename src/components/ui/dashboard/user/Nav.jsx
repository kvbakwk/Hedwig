export default function Nav({ children }) {
  return (
    <div className="flex justify-center items-center flex-wrap md:flex-nowrap gap-[10px] md:gap-[30px]">
      {children}
    </div>
  );
}
