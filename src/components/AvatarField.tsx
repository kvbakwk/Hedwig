import { Icon } from "@components/Icon";
import { Dispatch, SetStateAction } from "react";

export default function AvatarField({
  avatar,
  setAvatar,
}: {
  avatar: FileList;
  setAvatar: Dispatch<SetStateAction<FileList>>;
}) {
  return (
    <label
      className="flex justify-center items-center text-primary w-[100px] h-[100px] mb-[10px] rounded-full cursor-pointer"
      htmlFor="avatar">
      {(avatar === null || avatar.length === 0) && (
        <Icon>add_photo_alternate</Icon>
      )}
      {avatar !== null && avatar.length === 1 && (
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
