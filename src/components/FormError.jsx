export default function FormError({children, show}) {
    return (
        <div
        className={`flex-col justify-center items-center gap-[10px] text-white text-sm w-[350px] py-[25px] bg-red-300 rounded-md ${
          show ? "flex" : "hidden"
        }`}
      >
        {children}
      </div>
    )
}