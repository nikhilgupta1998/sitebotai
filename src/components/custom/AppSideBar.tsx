"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { MessageCircleCodeIcon } from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";
import SideBarFooterMenu from "./SideBarFooterMenu";

const AppSideBar = () => {
  return (
    <div>
      {" "}
      <Sidebar>
        <SidebarHeader className="p-5">
          <Button onClick={() => window.open("/", "_self")} className="mt-5">
            <MessageCircleCodeIcon /> Start New Chat
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <WorkspaceHistory />
          </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
          <SideBarFooterMenu />
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export default AppSideBar;
