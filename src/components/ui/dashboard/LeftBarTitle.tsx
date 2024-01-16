export default function LeftBarTitle({ children }) {
  return (
    <div className="md:flex hidden justify-center items-center text-[32px] text-center tracking-[4.16px] xl:w-[250px] lg:w-[180px] w-[70px] lg:h-[70px] h-[250px] lg:rotate-0 rotate-90">
      {children}
    </div>
  );
}
