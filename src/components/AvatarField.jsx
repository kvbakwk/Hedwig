import Icon from "@components/Icon";

export default function AvatarField({ avatar, setAvatar }) {
  return (
    <label
      className="flex justify-center items-center w-[100px] h-[100px] mb-[10px] bg-background shadow-md glass-border rounded-full cursor-pointer"
      htmlFor="avatar">
      {avatar.length === 0 && <Icon icon="add_photo_alternate" fill={false} />}
      {avatar.length === 1 && (
        <img
          className="w-full h-full rounded-full"
          src={URL.createObjectURL(avatar[0])}
        />
      )}
      <input
        className="hidden"
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        onChange={(e) => setAvatar(e.target.files)}
      />
    </label>
  );
}
