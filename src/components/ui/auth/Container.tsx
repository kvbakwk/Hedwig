export default function Container({ children }) {
  return (
    <div className="relative grid md:grid-cols-[1fr_700px_1fr] w-screen h-screen mx-auto">
      {children}
    </div>
  );
}
