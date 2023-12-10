import Avatar from "@components/Avatar";

export default function ProfileAvatar({ user_id }) {
  return (
    <Avatar
      className="md:absolute static top-[-50px] left-[60px] w-[100px] h-[100px] md:mb-0 mb-[20px] bg-background md:border-1 md:border-gray-300 rounded-full"
      user_id={user_id}
      anonymous={false}
    />
  );
}
