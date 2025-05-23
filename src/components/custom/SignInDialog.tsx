"use client";
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import uuid4 from "uuid4";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface Props {
  opened: boolean;
  close: () => void;
}

const SignInDialog: React.FC<Props> = ({ opened, close }) => {
  const userContext = useContext(UserDetailContext);
  const CreateUser = useMutation(api.user.CreateUser);
  const convex = useConvex();

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
        email: userInfo?.data?.email as string, // Now TypeScript knows this is safe
      });
      close();
      userContext?.setUserDetail(result);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Dialog open={opened} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <div className="flex flex-col justify-center items-center gap-3">
              <h2 className="font-bold text-2xl text-center text-white">
                {Lookup.SIGNIN_HEADING}
              </h2>
              <p className="mt-2  text-center">{Lookup.SIGNIN_SUBHEADING}</p>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-400 mt-3"
                onClick={() => googleLogin()}
              >
                Signin In With Google
              </Button>
              <p>{Lookup.SIGNIn_AGREEMENT_TEXT}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
