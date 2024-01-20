import "@app/utils/globals.css";

import { redirect } from "next/navigation";
import { loginCheck } from "@app/api/login";
import getUser from "@app/api/getUser";

import { Suspense } from "react";
import NavItem from "@components/NavItem";
import EventsItem from "@components/dashboard/EventsItem";
import ProfileItemLg from "@components/dashboard/ProfileItemLg";
import ProfileItem from "@components/dashboard/ProfileItem";
import Layout from "@components/styled/dashboard/Layout";
import Container from "@components/styled/dashboard/Container";
import CenterBar from "@components/styled/dashboard/CenterBar";
import LeftBar from "@components/styled/dashboard/LeftBar";
import LeftBarTitle from "@components/styled/dashboard/LeftBarTitle";
import RightBar from "@components/styled/dashboard/RightBar";
import RightBarTitle from "@components/styled/dashboard/RightBarTitle";
import Nav from "@components/styled/dashboard/Nav";

export const metadata = {
  title: "schcool",
};

export default async function RootDashboardLayout({ children }) {
  if (!(await loginCheck())) redirect("/logowanie");

  const user = await getUser();

  return (
    <html>
      <head></head>
      <body>
        <Suspense fallback={<></>}>
          <Container>
            <Layout>
              <LeftBar>
                <LeftBarTitle>schcool</LeftBarTitle>
                <Nav>
                  <NavItem
                    value="główna"
                    icon={"home"}
                    fillIcon={true}
                    page="/"
                    href="/"
                  />
                </Nav>
                <ProfileItem user={user} />
                <ProfileItemLg user={user} />
              </LeftBar>
              <div></div>
              <RightBar>
                <RightBarTitle>główna</RightBarTitle>
                <EventsItem />
              </RightBar>
            </Layout>
            <CenterBar>{children}</CenterBar>
          </Container>
        </Suspense>
      </body>
    </html>
  );
}
