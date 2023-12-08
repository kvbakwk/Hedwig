import "@app/utils/globals.css";

import { redirect } from "next/navigation";
import { loginCheck } from "@app/api/login";
import getUser from "@app/api/getUser";

import { Suspense } from "react";
import NavItem from "@components/NavItem";
import EventsItem from "@components/EventsItem";
import ProfileItemLg from "@components/ProfileItemLg";
import ProfileItem from "@components/ProfileItem";
import Container from "@components/dashboard/LayoutContainer";
import LeftBar from "@components/dashboard/LayoutContainerLeftBar";
import LeftBarTitle from "@components/dashboard/LayoutContainerLeftBarTitle";
import Nav from "@components/dashboard/LayoutContainerLeftBarNav";
import RightBar from "@components/dashboard/LayoutContainerRightBar";
import Children from "@components/dashboard/LayoutChildren";
import RightBarTitle from "@components/dashboard/LayoutContainerRightBarTitle";

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
