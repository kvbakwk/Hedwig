export default function RightBar({ children }) {
  return (
    <div className="z-50 md:static fixed top-0 flex md:flex-col md:justify-center justify-between items-center md:w-full w-screen md:h-full sm:h-[70px] h-[60px] md:px-0 px-[50px] lg:pb-[200px] bg-background border-b-1 border-shadow">
      {children}
    </div>
  );
}
