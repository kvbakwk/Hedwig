import getUser from "@app/api/getUser";
import Back from "@components/Back";
import Container from "@components/styled/dashboard/home/Container";
import Header from "@components/styled/dashboard/home/Header";
import Main from "@components/dashboard/Main";

export const metadata = {
  title: "schcool | główna",
};

export default async function HomePage() {
  const user = await getUser();

  return (
    <Container>
      <Header>
        <Back />
        główna
      </Header>
      <Main user={user} />
    </Container>
  );
}
