export default function Profile({ children }) {
  return (
    <div className="relative flex flex-col justify-center md:justify-start items-center md:items-start gap-[5px] md:pl-[40px] pt-[20px] md:pt-[100px] pb-[20px] md:pb-[40px] md:mt-[60px] md:glass">
      {children}
    </div>
  );
}
