export default function Header({ children }) {
  return (
    <div className="z-50 fixed md:flex hidden items-center gap-[25px] text-[22px] w-[720px] h-[70px] pl-[25px] border-1 border-t-0 border-gray-300 border-solid transition-shadow rounded-b-2xl backdrop-blur-xl shadow-md">
      {children}
    </div>
  );
}
