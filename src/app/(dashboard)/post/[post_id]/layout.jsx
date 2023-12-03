export default function PostLayout({ children }) {
  return (
    <div className="relative w-[full] h-auto md:px-[15px]">
      <div className="z-50 fixed hidden md:flex items-center text-[22px] w-[720px] h-[70px] pl-[50px] border-[1px] border-t-0 border-gray-300 border-solid transition-shadow rounded-b-2xl backdrop-blur-xl glass-shadow">
        post
      </div>
      <div className="z-0 relative flex flex-col gap-[20px] w-full py-[90px] md:px-[5px]">
        {children}
      </div>
    </div>
  );
}
