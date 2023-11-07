import { loginCheck } from "@app/api/login";

import FormRegister from "@components/FormRegister";

export const metadata = {
  title: "schcool | rejestracja",
};

export default async function RegisterPage() {

  await loginCheck(true);

  return (
    <div>
      <FormRegister />
    </div>
  );
}
