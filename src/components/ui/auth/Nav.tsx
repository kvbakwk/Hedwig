export default function Nav({ children }) {
  return (
    <div className="flex md:flex-col md:justify-center justify-around items-center md:gap-[10px] md:pt-0 pt-3 md:pb-0 pb-4">
      {children}
    </div>
  );
}
