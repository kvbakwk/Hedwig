export default function RootLayoutChildren({ children }) {
  return (
    <div className="z-10 relative w-screen md:w-[700px] lg:w-[750px] min-h-screen mx-auto">
      {children}
    </div>
  );
}
