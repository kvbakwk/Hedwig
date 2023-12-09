export default function Form({ children, handleSubmit }) {
  return (
    <form
      className="flex flex-col justify-center items-center gap-[25px] w-full md:w-[500px] h-full md:h-auto pb-40 md:py-16 md:glass"
      method="post"
      onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
