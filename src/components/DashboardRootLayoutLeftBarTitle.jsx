export default function RootLayoutLeftBarTitle({ children }) {
  return (
    <div className="hidden md:flex justify-center items-center text-[32px] text-center tracking-[4.16px] md:w-[70px] lg:w-[180px] xl:w-[250px] md:h-[250px] lg:h-[70px] md:rotate-90 lg:rotate-0">
      {children}
    </div>
  );
}
