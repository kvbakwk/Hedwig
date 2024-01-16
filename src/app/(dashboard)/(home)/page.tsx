import getUser from "@app/api/getUser";
import Back from "@components/Back";
import Container from "@components/ui/dashboard/home/Container";
import Header from "@components/ui/dashboard/home/Header";
import Main from "@components/ui/dashboard/home/Main";

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
