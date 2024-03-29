export default function Layout({ children }) {
  return (
    <div className="md:z-0 md:fixed md:grid lg:grid-cols-[1fr_750px_1fr] md:grid-cols-[1fr_700px_1fr] md:w-screen md:h-screen">
      {children}
    </div>
  );
}
