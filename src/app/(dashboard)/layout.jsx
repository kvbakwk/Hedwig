import "@app/utils/globals.css";

import { redirect } from "next/navigation";
import { loginCheck } from "@app/api/login";
import getUser from "@app/api/getUser";

import { Suspense } from "react";
import NavItem from "@components/NavItem";
import EventsItem from "@components/EventsItem";
import ProfileItemLg from "@components/ProfileItemLg";
import ProfileItem from "@components/ProfileItem";
import Container from "@components/DashboardRootLayoutContainer";
import LeftBar from "@components/DashboardRootLayoutLeftBar";
import LeftBarTitle from "@components/DashboardRootLayoutLeftBarTitle";
import Nav from "@components/DashboardRootLayoutLeftBarNav";
import RightBar from "@components/DashboardRootLayoutRightBar";
import Children from "@components/DashboardRootLayoutChildren";
import RightBarTitle from "@components/DashboardRootLayoutRightBarTitle";

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
          </Container>
          <Children>{children}</Children>
        </Suspense>
      </body>
    </html>
  );
}
