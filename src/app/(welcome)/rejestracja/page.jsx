import FormRegister from "@components/forms/FormRegister";

export const metadata = {
  title: "schcool | rejestracja",
};

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <FormRegister />
    </div>
  );
}
