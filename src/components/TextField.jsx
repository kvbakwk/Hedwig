export default function TextField({
  className,
  type,
  name,
  placeholder,
  error,
  errorMessage,
}, props) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[55px]">
      <div
        className={`w-full h-[35px] border-b-[1px] border-solid ${
          error ? "border-red-400" : "border-gray-300"
        } ${className}`}
      >
        <input
          className="text-[20px] font-light text-center w-full h-full p-1 focus-visible:outline-none rounded-t-lg"
          type={type}
          name={name}
          placeholder={placeholder}
          {...props}
        />
      </div>
      <div className={`justify-center items-center text-red-400 text-xs w-full h-[20px] p-1 ${
          error ? "flex" : "hidden"
        }`}>
        {errorMessage}
      </div>
    </div>
  );
}
