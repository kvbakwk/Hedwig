import FormRegister from "@components/forms/FormRegister";

export const metadata = {
  title: "schcool | rejestracja",
};

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center w-full lg:w-[750px] h-full">
      <FormRegister />
    </div>
  );
}
