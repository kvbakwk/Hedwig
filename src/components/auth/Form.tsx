export default function Form({ children, handleSubmit }) {
  return (
    <form className="contents" method="post" onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
