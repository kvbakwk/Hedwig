export default function FormError({ children, show }) {
  return (
    <div
      className={`flex-col justify-center items-center gap-[10px] text-white text-sm md:w-[320px] w-11/12 py-[20px] bg-red-300 rounded-md ${
        show ? "flex" : "hidden"
      }`}>
      {children}
    </div>
  );
}
