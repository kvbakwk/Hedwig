import { loginCheck } from "@app/api/login";

import FormLogin from "@components/FormLogin";

export default async function LoginPage() {

  await loginCheck(true);

  return (
    <div>
      <FormLogin />
    </div>
  );
}
