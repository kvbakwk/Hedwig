import { Icon } from "@components/Icon";
import { IconButton } from "@components/IconButton";

export default function PostFooterOption({
  handleClick,
  icon,
  iconFilled,
  iconColor,
  count,
}) {
  return (
    <div
      className="flex justify-center items-center cursor-pointer"
      onClick={handleClick}
    >
      <IconButton>
        <Icon className={`${iconFilled ? "fill " + iconColor : ""}`}>
          {icon}
        </Icon>
      </IconButton>
      <div className="flex justify-center items-center text-on-surface-variant text-[14px] font-medium w-[26px]">
        {count}
      </div>
    </div>
  );
}
