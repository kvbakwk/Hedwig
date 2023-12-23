import Back from "@components/Back";
import Container from "@components/ui/dashboard/password/Container";
import Header from "@components/ui/dashboard/password/Header";
import MainContainer from "@components/ui/dashboard/password/MainContainer";

export default function PasswordPage() {
  return (
    <Container>
      <Header>
        <Back />
      </Header>
      <MainContainer></MainContainer>
    </Container>
  );
}
