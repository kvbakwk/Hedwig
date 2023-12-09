export default function LeftBar({ children }) {
  return (
    <div className="fixed md:static z-50 bottom-0 flex md:flex-col justify-around md:justify-between items-center md:gap-2 w-screen md:w-full h-20 md:h-full pt-3 pb-4 md:py-[50px] bg-[color:rgb(var(--background)/1)] border-t-[1px] border-[color:rgb(var(--shadow)/1)] md:border-0">
      {children}
    </div>
  );
}
