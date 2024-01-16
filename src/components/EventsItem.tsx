import Icon from "@components/Icon";

export default function EventsItem() {
  return (
    <div className="flex justify-center items-center xl:w-[250px] lg:w-[180px] md:w-[60px] sm:w-[50px] w-[40px] lg:h-[70px] md:h-[60px] sm:h-[50px] h-[40px] bg-shadow rounded-2xl">
      <Icon icon="newspaper" fill={false} />
    </div>
  );
}
