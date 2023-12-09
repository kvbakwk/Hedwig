import login from "@app/api/login";

import FormLogin from "@components/forms/FormLogin";

export const metadata = {
  title: "schcool | logowanie",
};

export default function LoginPage() {
  return (
    <>
      <FormLogin login={login} />
    </>
  );
}
