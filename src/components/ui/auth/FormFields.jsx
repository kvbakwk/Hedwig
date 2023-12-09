export default function FormFields({ children }) {
  return (
    <div className="flex flex-col justify-center items-center gap-[10px] w-11/12 sm:w-1/2 md:w-[300px]">
      {children}
    </div>
  );
}
