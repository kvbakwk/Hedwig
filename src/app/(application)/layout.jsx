import { loginCheck } from "@app/api/login";

import Button from "@components/Button";

export default async function ApplicationLayout({ children }) {
  await loginCheck(false);

  return (
    <div className="">
      <div className="">
        <Button value="wyloguj się"/>
      </div>
      {children}
    </div>
  );
}
