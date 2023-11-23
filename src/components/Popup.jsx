"use client";

export default function Popup({ children, show, setShow }) {
  const handleClose = () => {
    setShow(0);
  };

  return (
    <div
      className={`fixed bottom-1  justify-center items-center w-[600px] h-[400px] mx-[calc(50vw-300px)] border-[1px] border-solid border-black ${
        show ? "flex" : "hidden"
      }`}>
      <div onClick={handleClose}>
        <span className="material-symbols-outlined">close</span>
      </div>
      {children}
    </div>
  );
}
