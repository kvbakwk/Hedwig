import getUser from "@app/api/getUser";
import Header from "@components/ui/dashboard/Header";
import Main from "@components/ui/dashboard/Main";
import PageContainer from "@components/ui/dashboard/PageContainer";

export const metadata = {
  title: "schcool | główna",
};

export default async function HomePage() {
  const user = await getUser();

  return (
    <PageContainer>
      <Header>główna</Header>
      <Main user={user} />
    </PageContainer>
  );
}
