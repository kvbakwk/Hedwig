export default function TextField({
  type,
  name,
  placeholder,
  error,
  errorMessage,
}: {
  type: string;
  name: string;
  placeholder: string;
  error: boolean;
  errorMessage: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[55px]">
      <div className="w-full h-[35px] rounded-lg">
        <input
          className={`text-xl font-light text-center w-full h-full p-1 focus-visible:outline-none rounded-lg ${
            error ? "bg-red-100 dark:bg-[#222]" : "bg-[#eee] dark:bg-[#222]"
          } `}
          type={type}
          name={name}
          placeholder={placeholder}
        />
      </div>
      <div
        className={`justify-center items-center text-red-400 text-xs w-full h-[20px] p-1 ${
          error ? "flex" : "hidden"
        }`}>
        {errorMessage}
      </div>
    </div>
  );
}
