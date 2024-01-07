import getUser from "@app/api/getUser";
import Back from "@components/Back";
import FormChangePassword from "@components/forms/FormChangePassword";
import Container from "@components/ui/dashboard/password/Container";
import Header from "@components/ui/dashboard/password/Header";
import MainContainer from "@components/ui/dashboard/password/MainContainer";

export default async function PasswordPage() {
  const user = await getUser();

  return (
    <Container>
      <Header>
        <Back />
        zmiana awatara
      </Header>
      <MainContainer></MainContainer>
    </Container>
  );
}
