export default function CenterBar({ children }) {
  return (
    <div className="flex justify-center items-center w-full lg:w-[750px] h-full">
      {children}
    </div>
  );
}
