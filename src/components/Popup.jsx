"use client";

export default function Popup({ children, show, setShow }) {
  const handleClose = () => {
    setShow(0);
  };

  return (
    <div
      className={`fixed bottom-[50px] w-[710px] bg-[rgb(var(--background)/1)] glass-shadow glass-border rounded-2xl ${
        show ? "block" : "hidden"
      }`}>
      <div
        className="absolute top-2 right-2 flex justify-center items-center w-[30px] h-[30px] hover:bg-[rgb(var(--shadow)/1)] rounded-full cursor-pointer"
        onClick={handleClose}>
        <span className="material-symbols-outlined">close</span>
      </div>
      {children}
    </div>
  );
}
