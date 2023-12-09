import "@app/utils/globals.css";

import { redirect } from "next/navigation";
import { loginCheck } from "@app/api/login";
import getUser from "@app/api/getUser";

import { Suspense } from "react";
import NavItem from "@components/NavItem";
import EventsItem from "@components/EventsItem";
import ProfileItemLg from "@components/ProfileItemLg";
import ProfileItem from "@components/ProfileItem";
import Layout from "@components/ui/dashboard/Layout";
import Container from "@components/ui/dashboard/Container";
import CenterBar from "@components/ui/dashboard/CenterBar";
import LeftBar from "@components/ui/dashboard/LeftBar";
import LeftBarTitle from "@components/ui/dashboard/LeftBarTitle";
import RightBar from "@components/ui/dashboard/RightBar";
import RightBarTitle from "@components/ui/dashboard/RightBarTitle";
import Nav from "@components/ui/dashboard/Nav";

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
