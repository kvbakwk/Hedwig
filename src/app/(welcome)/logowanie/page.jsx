import { loginCheck } from "@app/api/login";

import FormLogin from "@components/FormLogin";

export const metadata = {
  title: "schcool | logowanie",
};

export default async function LoginPage() {

  await loginCheck(true);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <FormLogin />
    </div>
  );
}
