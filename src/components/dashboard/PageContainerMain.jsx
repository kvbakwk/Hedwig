export default function DashboardRootPageContainerMain({ children }) {
  return (
    <div className="flex flex-col gap-[20px] w-full pt-[70px] sm:pt-[80px] md:pt-[90px] pb-[100px] md:pb-[50px] md:px-[5px]">
      {children}
    </div>
  );
}
