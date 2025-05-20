"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";
import axios from "axios";
import { MessagesContext } from "@/context/MessagesContext";
import Prompt from "@/data/Prompt";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";
import { Loader2Icon } from "lucide-react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { countToken } from "./ChatView";
import SandPackPreviewClient from "./SandPackPreviewClient";

const CodeView = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const handleTabs = (tab: string) => {
    setActiveTab(tab);
  };
  const [loading, setLoading] = useState(false);
  const context = useContext(MessagesContext);
  const userContext = useContext(UserDetailContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const UpdateToken = useMutation(api.user.UpdateToken);

  const convex = useConvex();

  useEffect(() => {
    if (id) {
      GetFiles();
    }
  }, [id]);

  const GetFiles = async () => {
    setLoading(true);
    try {
      const result = await convex.query(api.workspace.GetWorkspace, {
        workspaceId: id as Id<"workspace">,
      });
      const mergedFile = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
      setFiles(mergedFile);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (context?.messages?.length > 0) {
      const role = context?.messages[context.messages.length - 1].role;
      if (role === "user") {
        GenerateCode();
      }
    }
  }, [context?.messages]);

  const GenerateCode = async () => {
    setLoading(true);
    try {
      const PROMPT =
        JSON.stringify(context?.messages) + " " + Prompt.CODE_GEN_PROMPT;
      const response = await axios.post("/api/gen-ai-code", {
        prompt: PROMPT,
      });

      const aiResp = JSON.parse(response?.data?.result);
      const mergedFile = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
      setFiles(mergedFile);
      await UpdateFiles({
        workspaceId: id as Id<"workspace">,
        files: aiResp?.files,
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
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const renderTabs = () => {
    switch (activeTab) {
      case "code":
        return (
          <>
            <SandpackFileExplorer style={{ height: "80vh" }} />
            <SandpackCodeEditor style={{ height: "80vh" }} />
          </>
        );

      default:
        return (
          <>
            <SandPackPreviewClient />
          </>
        );
    }
  };

  return (
    <div className="relative">
      {" "}
      <div className="bg-[#181818] w-full p-2 border">
        <div className="flex items-center justify-center flex-wrap shrink-0 bg-black p-1 w-fit gap-2 rounded-full">
          <h2
            onClick={() => handleTabs("code")}
            className={`text-sm p-1 px-2 cursor-pointer ${activeTab === "code" && "text-blue-500 bg-blue-500/20 rounded-full"}`}
          >
            Code
          </h2>
          <h2
            onClick={() => handleTabs("preview")}
            className={`text-sm p-1 px-2 cursor-pointer ${activeTab === "preview" && "text-blue-500 bg-blue-500/20 rounded-full"}`}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider
        files={files}
        template="react"
        theme={"dark"}
        customSetup={{
          dependencies: { ...Lookup.DEPENDANCY },
        }}
        options={{
          externalResources: [
            "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
          ],
        }}
      >
        <SandpackLayout>{renderTabs()}</SandpackLayout>
      </SandpackProvider>
      {loading && (
        <div className="p-10 gap-2 bg-gray-900 opacity-80 absolute top-0 rounded-lg w-full h-full flex items-center justify-center">
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white">Generating your files...</h2>
        </div>
      )}
    </div>
  );
};

export default CodeView;
