export default function Container({ children }) {
  return (
    <div className="relative md:flex w-screen h-screen md:w-[905px] lg:w-[1240px] md:mx-auto">
      {children}
    </div>
  );
}
