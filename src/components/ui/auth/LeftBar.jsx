export default function LeftBar({ children }) {
  return (
    <div className="fixed md:static z-50 bottom-0 md:flex md:flex-col md:justify-around md:items-center w-full md:w-[102.5px] lg:w-[265px] xl:w-[345px] h-20 md:h-full bg-[color:rgb(var(--background)/1)] border-t-[1px] md:border-0 border-[color:rgb(var(--shadow)/1)]">
      {children}
    </div>
  );
}
