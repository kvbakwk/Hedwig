import Back from "@components/Back";
import Container from "@components/styled/dashboard/post/Container";
import Header from "@components/styled/dashboard/post/Header";
import Main from "@components/styled/dashboard/post/Main";

export default function PostLayout({ children }) {
  return (
    <Container>
      <Header>
        <Back />
        post
      </Header>
      <Main>{children}</Main>
    </Container>
  );
}
