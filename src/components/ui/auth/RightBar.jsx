export default function RightBar({ children }) {
  return (
    <div className="fixed md:static z-50 top-0 flex md:flex-col justify-between md:justify-center items-center w-full md:w-[102.5px] lg:w-[265px] xl:w-[345px] h-[60px] sm:h-[70px] md:h-full px-8 md:px-0 md:pb-40 border-b-[1px] md:border-0 border-[color:rgb(var(--shadow)/1)]">
      {children}
    </div>
  );
}
