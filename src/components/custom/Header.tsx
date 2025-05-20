import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import { usePathname } from "next/navigation";
import { Download, Rocket } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { ActionContext } from "@/context/ActionContext";

const Header = () => {
  const userContext = useContext(UserDetailContext);
  const actionContext = useContext(ActionContext);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const onActionBtn = (actn: string) => {
    actionContext?.setAction({
      actionType: actn,
      timeStamp: Date.now(),
    });
  };

  return (
    <div className="p-4 flex justify-between items-center">
      <Image src={"/logo.png"} alt="logo" width={40} height={40} />
      {!userContext?.userDetail ? (
        <div className="flex gap-5">
          <Button variant={"ghost"}>Sign In</Button>
          <Button
            style={{
              backgroundColor: Colors.BLUE,
            }}
          >
            Get Started
          </Button>
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          {pathname.includes("/workspace/") && (
            <>
              <Button variant="ghost" onClick={() => onActionBtn("export")}>
                <Download /> Export
              </Button>
              <Button
                onClick={() => onActionBtn("deploy")}
                className="text-white"
                style={{
                  backgroundColor: Colors.BLUE,
                }}
              >
                <Rocket /> Deploy
              </Button>
            </>
          )}
          {userContext?.userDetail && (
            <Image
              onClick={toggleSidebar}
              src={userContext?.userDetail?.picture}
              alt="userImage"
              width={40}
              height={40}
              className="rounded-full cursor-pointer object-cover"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
