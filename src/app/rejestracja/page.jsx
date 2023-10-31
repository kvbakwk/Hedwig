import { loginCheck } from "@app/api/login";

import FormRegister from "@components/FormRegister";

export default async function RegisterPage() {

  await loginCheck(true);

  return (
    <div>
      <FormRegister />
    </div>
  );
}
