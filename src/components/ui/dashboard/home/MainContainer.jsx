export default function MainContainer({ children }) {
  return (
    <div className="flex flex-col gap-[20px] w-full md:pt-[90px] sm:pt-[80px] pt-[70px] md:pb-[50px] pb-[100px] md:px-[5px]">
      {children}
    </div>
  );
}
