export default function CenterBar({ children }) {
  return (
    <div className="z-10 relative lg:w-[750px] md:w-[700px] w-screen min-h-screen mx-auto">
      {children}
    </div>
  );
}
