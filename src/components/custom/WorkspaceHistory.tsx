import { UserDetailContext } from "@/context/UserDetailContext";
import { useConvex } from "convex/react";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { useSidebar } from "../ui/sidebar";

const WorkspaceHistory = () => {
  const userContext = useContext(UserDetailContext);
  const convex = useConvex();
  const [workspaceList, setWorkspaceList] = useState<any>([]);
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    if (userContext?.userDetail) {
      GetAllWorkspace();
    }
  }, [userContext?.userDetail]);

  const GetAllWorkspace = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userContext?.userDetail?._id,
    });
    setWorkspaceList(result);
  };

  return (
    <div>
      <h2 className="font-medium text-lg">Your Chats</h2>
      <div>
        {workspaceList?.map((workspace: any, index: number) => (
          <Link href={`/workspace/${workspace?._id}`} key={index}>
            <h2
              onClick={toggleSidebar}
              className="text-sm text-gray-400 mt-2 font-light hover:text-white cursor-pointer"
            >
              {workspace?.message?.[0]?.content}
            </h2>
          </Link>
        ))}{" "}
      </div>
    </div>
  );
};

export default WorkspaceHistory;
