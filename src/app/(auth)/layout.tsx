import "@app/utils/globals.css";

import { redirect } from "next/navigation";
import { loginCheck } from "@app/api/login";

import NavItem from "@components/NavItem";
import Container from "@components/styled/auth/Container";
import LeftBar from "@components/styled/auth/LeftBar";
import LeftBarTitle from "@components/styled/auth/LeftBarTitle";
import Nav from "@components/styled/auth/Nav";
import RightBar from "@components/styled/auth/RightBar";
import RightBarTitle from "@components/styled/auth/RightBarTitle";
import RulesItem from "@components/auth/RulesItem";
import CenterBar from "@components/styled/auth/CenterBar";

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
