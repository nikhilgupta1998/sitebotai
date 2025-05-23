import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, Download, MenuIcon, Rocket } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { ActionContext } from "@/context/ActionContext";
import { useConvex, useMutation } from "convex/react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { api } from "../../../convex/_generated/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import uuid4 from "uuid4";

const Header = () => {
  const router = useRouter();
  const userContext = useContext(UserDetailContext);
  const actionContext = useContext(ActionContext);
  const { open, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const onActionBtn = (actn: string) => {
    actionContext?.setAction({
      actionType: actn,
      timeStamp: Date.now(),
    });
  };
  const convex = useConvex();

  const CreateUser = useMutation(api.user.CreateUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      const user = userInfo.data;
      await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: uuid4(),
      });
      if (typeof window !== undefined) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      // Fetch user from the database
      const result = await convex.query(api.user.GetUser, {
        email: user.email as string, // Now TypeScript knows this is safe
      });
      close();
      userContext?.setUserDetail(result);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className="p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {userContext?.userDetail && (
          <Button onClick={toggleSidebar} variant={"outline"} size={"icon"}>
            {open ? <ChevronLeft /> : <MenuIcon />}
          </Button>
        )}
        <div
          onClick={() => window.open("/", "_self")}
          className="flex items-center gap-4 cursor-pointer"
        >
          <Image src={"/logo.png"} alt="logo" width={40} height={40} />
          <h1 className="font-bold text-xl">Sitebot.ai</h1>
        </div>
      </div>

      {!userContext?.userDetail ? (
        <div className="flex gap-5">
          <Button variant={"ghost"} onClick={() => googleLogin()}>
            Sign In
          </Button>
          <Button
            onClick={() => googleLogin()}
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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={userContext?.userDetail?.picture}
                  alt="userImage"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer object-cover"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => window.open("/pricing", "_self")}
                >
                  Subscription
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    googleLogout();
                    localStorage.removeItem("user");
                    window.open("/", "_self");
                  }}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
