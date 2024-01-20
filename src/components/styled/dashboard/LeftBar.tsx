export default function LeftBar({ children }) {
  return (
    <div className="z-50 md:static fixed bottom-0 flex md:flex-col md:justify-between justify-around items-center md:gap-2 md:w-full w-screen md:h-full h-20 md:py-[50px] pt-3 pb-4 bg-background md:border-0 border-t-1 border-shadow">
      {children}
    </div>
  );
}
