export default function PostFooterOption({
  handleClick,
  icon,
  iconFilled,
  iconColor,
  count,
}) {
  return (
    <div
      className="flex justify-center items-center w-[50px] cursor-pointer"
      onClick={handleClick}>
      <span
        className={`material-symbols-outlined ${
          iconFilled ? "fill " + iconColor : ""
        }`}>
        {icon}
      </span>
      <div className="text-[14px] font-light flex justify-center items-center w-[26px]">
        {count}
      </div>
    </div>
  );
}
