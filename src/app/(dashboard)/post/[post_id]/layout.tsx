import Back from "@components/Back";

export default function PostLayout({ children }) {
  return (
    <div className="relative w-[full] h-auto md:px-[15px]">
      <div className="z-50 fixed top-[10px] flex items-center gap-[25px] text-primary text-[22px] w-[720px] h-[70px] pl-[25px] bg-surface rounded-2xl shadow-lg">
        <Back />
        <span className="text-on-surface">post</span>
      </div>
      <div className="z-0 relative flex flex-col justify-center items-center gap-[20px] w-full py-[90px] md:px-[5px]">
        {children}
      </div>
    </div>
  );
}
