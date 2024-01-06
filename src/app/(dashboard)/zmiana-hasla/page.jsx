import Back from "@components/Back";
import FormChangePassword from "@components/forms/FormChangePassword";
import Container from "@components/ui/dashboard/password/Container";
import Header from "@components/ui/dashboard/password/Header";
import MainContainer from "@components/ui/dashboard/password/MainContainer";

export default function PasswordPage() {
  return (
    <Container>
      <Header>
        <Back />
        zmiana hasła
      </Header>
      <MainContainer>
        <FormChangePassword />
      </MainContainer>
    </Container>
  );
}
