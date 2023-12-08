import { redirect } from "next/navigation";
import getUser from "@app/api/getUser";
import getUserById from "@app/api/getUserById";

import Container from "@components/dashboard/user/LayoutContainer";
import Header from "@components/dashboard/user/LayoutContainerHeader";
import Main from "@components/dashboard/user/LayoutContainerMain";
import Profile from "@components/dashboard/user/LayoutContainerMainProfile";
import Nav from "@components/dashboard/user/LayoutContainerMainNav";
import Item from "@components/dashboard/user/LayoutContainerMainNavItem";
import Fullname from "@components/dashboard/user/LayoutContainerMainProfileFullname";
import Email from "@components/dashboard/user/LayoutContainerMainProfileEmail";
import Avatar from "@components/dashboard/user/LayoutContainerMainProfileAvatar";

export const metadata = {
  title: "schcool | profil",
};

export default async function ProfileLayout({ params: { user_id }, children }) {
  const user = await getUser();

  if (isNaN(user_id) || !(await getUserById(user_id))) redirect("/");

  const profileUser = await getUserById(user_id);

  return (
    <Container>
      <Header>
        {user.id == user_id ? "twój profil użytkownika" : "profil użytkownika"}
      </Header>
      <Main>
        <Profile>
          <Avatar user_id={user_id} />
          <Fullname>
            {profileUser.firstname.toLowerCase()}{" "}
            {profileUser.lastname.toLowerCase()}
          </Fullname>
          <Email>{profileUser.email}</Email>
        </Profile>
        <Nav>
          <Item href={`/uzytkownik/${user_id}/posty`}>posty</Item>
          <Item href={`/uzytkownik/${user_id}/odpowiedzi`}>odpowiedzi</Item>
          <Item href={`/uzytkownik/${user_id}/polubione`}>polubione</Item>
          {user.id == user_id && (
            <>
              <Item href={`/uzytkownik/${user_id}/negatywne`}>negatywne</Item>
              <Item href={`/uzytkownik/${user_id}/zapisane`}>zapisane</Item>
            </>
          )}
        </Nav>
        {children}
      </Main>
    </Container>
  );
}
