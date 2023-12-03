import getUser from "@app/api/getUser";
import Glowna from "@components/Glowna";
import Container from "@components/DashboardRootPageContainer";
import Header from "@components/DashboardRootPageContainerHeader";
import Main from "@components/DashboardRootPageContainerMain";

export const metadata = {
  title: "schcool | główna",
};

export default async function HomePage() {
  const user = await getUser();

  return (
    <Container>
      <Header>główna</Header>
      <Main>
        <Glowna user={user} />
      </Main>
    </Container>
  );
}
