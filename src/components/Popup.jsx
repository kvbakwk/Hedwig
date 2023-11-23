"use client";

export default function Popup({ children, show, setShow }) {
  const handleClose = () => {
    setShow(0);
  };

  return (
    <div
      className={`fixed bottom-1 w-[600px] h-[400px] mx-[calc(50vw-300px)] border-[1px] border-solid border-black ${
        show ? "block" : "hidden"
      }`}>
      <div className="cursor-pointer" onClick={handleClose}>
        <span className="material-symbols-outlined">close</span>
      </div>
      {children}
    </div>
  );
}
