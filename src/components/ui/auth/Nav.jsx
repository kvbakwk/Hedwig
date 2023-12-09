export default function Nav({ children }) {
  return (
    <div className="flex md:flex-col justify-around md:justify-center md:items-center md:gap-[10px] items-center pt-3 pb-4">
      {children}
    </div>
  );
}
