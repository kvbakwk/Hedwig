import getUser from "@app/api/getUser";
import Container from "@components/dashboard/PageContainer";
import Header from "@components/dashboard/PageContainerHeader";
import Main from "@components/dashboard/PageContainerMain";

export const metadata = {
  title: "schcool | główna",
};

export default async function HomePage() {
  const user = await getUser();

  return (
    <Container>
      <Header>główna</Header>
      <Main user={user} />
    </Container>
  );
}
