export default function RightBar({ children }) {
  return (
    <div className="fixed md:static z-50 top-0 flex md:flex-col justify-between md:justify-center items-center w-screen md:w-full h-[60px] sm:h-[70px] md:h-full px-[50px] md:px-0  lg:pb-[200px] bg-[color:rgb(var(--background)/1)] border-b-[1px] border-[color:rgb(var(--shadow)/1)]">
      {children}
    </div>
  );
}
