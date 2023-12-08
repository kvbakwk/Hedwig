import Avatar from "@components/Avatar";

export default function DashboardUserLayoutContainerMainProfileAvatar({
  user_id,
}) {
  return (
    <Avatar
      className="static md:absolute top-[-50px] left-[60px] w-[100px] h-[100px] mb-[20px] md:mb-0 bg-[rgb(var(--background)/1)] md:border-[1px] md:border-gray-300 rounded-full"
      user_id={user_id}
      anonymous={false}
    />
  );
}
