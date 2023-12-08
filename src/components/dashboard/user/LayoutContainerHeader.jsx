export default function DashboardUserLayoutContainerHeader({ children }) {
  return (
    <div className="z-50 fixed hidden md:flex items-center text-[22px] w-[720px] h-[70px] pl-[50px] border-[1px] border-t-0 border-gray-300 border-solid transition-shadow rounded-b-2xl backdrop-blur-xl glass-shadow">
      {children}
    </div>
  );
}
