import login from "@app/api/login";

import FormLogin from "@components/forms/FormLogin";

export const metadata = {
  title: "schcool | logowanie",
};

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center w-full lg:w-[750px] h-full">
      <FormLogin login={login} />
    </div>
  );
}
