export default function LeftBar({ children }) {
  return (
    <div className="z-50 md:static fixed bottom-0 md:flex md:flex-col md:justify-around md:items-center w-full md:h-full h-20 bg-background md:border-0 border-t-1 border-shadow">
      {children}
    </div>
  );
}
