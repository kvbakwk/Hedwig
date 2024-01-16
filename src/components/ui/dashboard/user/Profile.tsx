export default function Profile({ children }) {
  return (
    <div className="relative flex flex-col md:justify-start justify-center md:items-start items-center gap-[5px] md:pl-[40px] md:pt-[100px] pt-[20px] md:pb-[40px] pb-[20px] md:mt-[60px] md:glass">
      {children}
    </div>
  );
}
