import { redirect } from "next/navigation";
import getUser from "@app/api/getUser";
import getUserById from "@app/api/getUserById";
import Container from "@components/ui/dashboard/user/Container";
import Header from "@components/ui/dashboard/user/Header";
import Main from "@components/ui/dashboard/user/Main";
import Profile from "@components/ui/dashboard/user/Profile";
import ProfileAvatar from "@components/ui/dashboard/user/ProfileAvatar";
import ProfileFullname from "@components/ui/dashboard/user/ProfileFullname";
import ProfileEmail from "@components/ui/dashboard/user/ProfileEmail";
import Nav from "@components/ui/dashboard/user/Nav";
import NavItem from "@components/ui/dashboard/user/NavItem";
import Back from "@components/Back";

export const metadata = {
  title: "schcool | profil",
};

export default async function ProfileLayout({
  params: { user_id },
  children,
}: {
  params: { user_id: number };
  children: JSX.Element;
}) {
  const user = await getUser();

  if (isNaN(user_id) || !(await getUserById(user_id))) redirect("/");

  const profileUser = await getUserById(user_id);

  return (
    <Container>
      <Header>
        <Back />
        {user.id == user_id ? "twój profil użytkownika" : "profil użytkownika"}
      </Header>
      <Main>
        <Profile>
          <ProfileAvatar user_id={user_id} />
          <ProfileFullname>
            {profileUser.firstname.toLowerCase()}{" "}
            {profileUser.lastname.toLowerCase()}
          </ProfileFullname>
          <ProfileEmail>{profileUser.email}</ProfileEmail>
        </Profile>
        <Nav>
          <NavItem href={`/uzytkownik/${user_id}/posty`}>posty</NavItem>
          <NavItem href={`/uzytkownik/${user_id}/odpowiedzi`}>
            odpowiedzi
          </NavItem>
          <NavItem href={`/uzytkownik/${user_id}/polubione`}>polubione</NavItem>
          {user.id == user_id && (
            <>
              <NavItem href={`/uzytkownik/${user_id}/negatywne`}>
                negatywne
              </NavItem>
              <NavItem href={`/uzytkownik/${user_id}/zapisane`}>
                zapisane
              </NavItem>
            </>
          )}
        </Nav>
        {children}
      </Main>
    </Container>
  );
}
