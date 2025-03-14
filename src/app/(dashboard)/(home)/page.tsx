import getUser from "@app/api/getUser";

import Back from "@components/Back";
import Main from "@components/dashboard/Main";

export const metadata = {
  title: "schcool | strona główna",
};

export default async function HomePage() {
  return (
    <div className="w-full min-h-full px-[15px]">
      <div className="z-50 fixed top-[10px] flex items-center gap-[25px] text-primary text-[22px] w-[720px] h-[70px] pl-[25px] bg-surface rounded-2xl shadow-lg">
        <Back />
        <span className="text-on-surface">główna</span>
      </div>
      <Main user={await getUser()} />
    </div>
  );
}
