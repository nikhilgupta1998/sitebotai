"use client";

import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link } from "lucide-react";
import React, { useContext, useState } from "react";
import SignInDialog from "./SignInDialog";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Hero = () => {
  const [userInput, setUserInput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const context = useContext(MessagesContext);
  const userContext = useContext(UserDetailContext);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  if (!context) {
    throw new Error("MessagesContext must be used within a MessagesProvider");
  }
  const { messages, setMessages } = context;
  const onGenerate = async (input: string) => {
    if (userContext?.userDetail?.token < 10) {
      toast("You dont have enough token!");
      return;
    }
    if (!userContext?.userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    const msg = {
      role: "user",
      content: input,
    };
    setMessages(msg);
    const workspaceId = await CreateWorkspace({
      user: userContext?.userDetail?._id,
      message: [msg],
    });
    window.open(`/workspace/${workspaceId}`, "_self");
    console.log(workspaceId);
  };
  return (
    <div className="flex flex-col px-6 lg:px-0 items-center lg:mt-36 mt-20 pb-12 gap-2">
      <h2 className="font-bold text-4xl text-center">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium text-center">
        {Lookup.HERO_DESC}
      </p>

      <div
        className="p-5 border rounded-xl max-w-2xl w-full"
        style={{ backgroundColor: Colors.BACKGROUND }}
      >
        <div className="flex gap-2">
          <textarea
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            className="outline-none bg-transparent w-full max-h-56 h-32"
            placeholder={Lookup.INPUT_PLACEHOLDER}
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer"
            />
          )}
        </div>
        <div>
          <Link className="h-5 w-5" />
        </div>
      </div>
      <div className="flex mt-8 flex-wrap max-w-2xl gap-3 items-center justify-center">
        {Lookup.SUGGSTIONS.map((suggestion, index) => (
          <h2
            onClick={() => onGenerate(suggestion)}
            className="p-1 px-2 rounded-full text-sm text-gray-400 hover:text-white cursor-pointer"
            key={index}
          >
            {suggestion}
          </h2>
        ))}
      </div>
      <SignInDialog opened={openDialog} close={() => setOpenDialog(false)} />
    </div>
  );
};

export default Hero;
