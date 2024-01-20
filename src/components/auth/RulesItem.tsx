import Icon from "@components/Icon";
import Link from "next/link";

export default function RulesItem() {
  return (
    <Link
      href="/regulamin"
      className="relative flex lg:justify-start justify-center items-center xl:text-[22px] text-xl font-light xl:w-[250px] lg:w-[180px] md:w-[60px] w-10 lg:h-[70px] md:h-[60px] h-10 border-1 border-shadow rounded-2xl md:glass">
      <div className="z-10 relative flex justify-center items-center lg:w-auto w-16 lg:h-auto h-8 lg:px-[18px]">
        <Icon icon="book_5" fill={false} />
      </div>
      <span className="lg:contents hidden">regulamin</span>
    </Link>
  );
}
