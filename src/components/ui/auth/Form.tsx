export default function Form({ children, handleSubmit }) {
  return (
    <form
      className="flex flex-col justify-center items-center gap-[25px] md:w-[500px] w-full md:h-auto h-full md:py-16 pb-40 md:glass"
      method="post"
      onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
