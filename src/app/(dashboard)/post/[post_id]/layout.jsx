import Container from "@components/dashboard/post/LayoutContainer";
import Header from "@components/dashboard/post/LayoutContainerHeader";
import Main from "@components/dashboard/post/LayoutContainerMain";

export default function PostLayout({ children }) {
  return (
    <Container>
      <Header>post</Header>
      <Main>{children}</Main>
    </Container>
  );
}
