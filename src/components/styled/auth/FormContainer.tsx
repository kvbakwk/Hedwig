export default function FormContainer({ children }) {
  return (
    <div className="flex flex-col justify-center items-center gap-[25px] md:w-[500px] w-full md:h-auto h-full md:py-16 pb-40 md:glass">
      {children}
    </div>
  );
}
