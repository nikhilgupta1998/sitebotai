"use client";

import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { MessagesContext } from "@/context/MessagesContext";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import axios from "axios";
import Prompt from "@/data/Prompt";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

export const countToken = (inputText: string) => {
  return inputText
    ?.trim()
    ?.split(/\s+/)
    ?.filter((word) => word).length;
};
const ChatView = () => {
  const { id } = useParams();

  const convex = useConvex();
  const context = useContext(MessagesContext);
  const userContext = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const UpdateToken = useMutation(api.user.UpdateToken);

  useEffect(() => {
    if (id) {
      GetWorkspaceData();
    }
  }, [id]);

  const GetWorkspaceData = async () => {
    try {
      const result = await convex.query(api.workspace.GetWorkspace, {
        workspaceId: id! as Id<"workspace">,
      });

      context?.setMessages(result?.message);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const onGenerate = async (input: string) => {
    if (userContext?.userDetail?.token < 10) {
      toast("You dont have enough token!");
      return;
    }
    context?.setMessages((prev: any) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput("");
  };

  useEffect(() => {
    if (context?.messages?.length > 0) {
      const role = context?.messages[context.messages.length - 1].role;
      if (role === "user") {
        GetAIResponse();
      }
    }
  }, [context?.messages]);

  const GetAIResponse = async () => {
    setLoading(true);
    try {
      const PROMPT = JSON.stringify(context?.messages) + Prompt.CHAT_PROMPT;
      const response = await axios.post("/api/ai-chat", {
        prompt: PROMPT,
      });
      const aiResp = {
        role: "ai",
        content: response?.data?.result,
      };
      context?.setMessages((prev: any) => [...prev, aiResp]);

      await UpdateMessages({
        messages: [...context?.messages, aiResp],
        workspaceId: id as Id<"workspace">,
      });

      const token =
        Number(userContext?.userDetail?.token) -
        Number(countToken(JSON.stringify(aiResp)));
      // Update Token to Database
      userContext?.setUserDetail((prev: any) => ({ ...prev, token: token }));
      await UpdateToken({
        userId: userContext?.userDetail?._id,
        token: token,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {context?.messages?.map((message: any, index: number) => (
          <div
            key={index}
            className="p-3 rounded-lg mb-2 flex gap-2 items-start leading-7"
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
          >
            {message?.role === "user" && (
              <Image
                src={userContext?.userDetail?.picture}
                alt="userImage"
                width={35}
                height={35}
                className="rounded-full"
              />
            )}
            <div className="flex flex-col">
              <ReactMarkdown>{message?.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-start"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Generating response...</h2>
          </div>
        )}
      </div>
      {/* Input Section */}

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
    </div>
  );
};

export default ChatView;
