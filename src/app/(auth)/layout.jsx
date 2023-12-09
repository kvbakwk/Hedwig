import "@app/utils/globals.css";

import { redirect } from "next/navigation";
import { loginCheck } from "@app/api/login";

import NavItem from "@components/NavItem";
import Container from "@components/ui/auth/Container";
import LeftBar from "@components/ui/auth/LeftBar";
import LeftBarTitle from "@components/ui/auth/LeftBarTitle";
import Nav from "@components/ui/auth/Nav";
import RightBar from "@components/ui/auth/RightBar";
import RightBarTitle from "@components/ui/auth/RightBarTitle";
import RulesItem from "@components/ui/auth/RulesItem";
import CenterBar from "@components/ui/auth/CenterBar";

export const metadata = {
  title: "schcool",
};

export default async function RootAuthLayout({ children }) {
  if (await loginCheck()) redirect("/");

  return (
    <html>
      <head></head>
      <body>
        <Container>
          <LeftBar>
            <LeftBarTitle>schcool</LeftBarTitle>
            <Nav>
              <NavItem
                value="logowanie"
                icon={"account_circle"}
                fillIcon={true}
                page="/logowanie"
                href="/logowanie"
              />
              <NavItem
                value="rejestracja"
                icon={"person_add"}
                page="/rejestracja"
                href="/rejestracja"
                fillIcon={true}
              />
            </Nav>
          </LeftBar>
          <CenterBar>{children}</CenterBar>
          <RightBar>
            <RightBarTitle>schcool</RightBarTitle>
            <RulesItem />
          </RightBar>
        </Container>
      </body>
    </html>
  );
}
