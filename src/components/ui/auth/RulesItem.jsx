import Link from "next/link";

export default function RulesItem() {
  return (
    <Link
      href="/regulamin?powrot=http://localhost/"
      className="relative flex justify-center lg:justify-start items-center text-xl xl:text-[22px] font-extralight w-10 md:w-[70px] lg:w-[180px] xl:w-[250px] h-10 md:h-[70px] border-[1px] border-[color:rgb(var(--shadow)/1)] rounded-2xl md:glass">
      <div className="relative z-10 flex justify-center items-center w-16 h-8 lg:w-auto lg:h-auto lg:px-[18px]">
        <span className="material-symbols-outlined">book_5</span>
      </div>
      <span className="hidden lg:contents">regulamin</span>
    </Link>
  );
}
