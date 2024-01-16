import login from "@app/api/login";

import Login from "@components/ui/auth/login/Login";

export const metadata = {
  title: "schcool | logowanie",
};

export default function LoginPage() {
  return <Login login={login} />;
}
