export default function Checkbox({name, label}) {
  return (
    <label
      htmlFor={name}
      className="flex justify-center items-center gap-[10px] text-[16px] font-light"
    >
      <input type="checkbox" name={name} id={name} />
      {label}
    </label>
  );
}
