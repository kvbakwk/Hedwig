import { loginCheck } from "@app/utils/login";

import FormRegister from "@components/FormRegister";

export default async function RegisterPage() {

  await loginCheck(true);

  return (
    <div>
      <FormRegister />
    </div>
  );
}
