"use client";
import { ActionContext } from "@/context/ActionContext";
import {
  SandpackPreview,
  SandpackPreviewRef,
  useSandpack,
} from "@codesandbox/sandpack-react";
import React, { useContext, useEffect, useRef } from "react";

function SandpackPreviewClient() {
  const previewRef = useRef<SandpackPreviewRef | any>(null);
  const { sandpack } = useSandpack();
  const actionContext = useContext(ActionContext);

  useEffect(() => {
    GetSandpackCleint();
  }, [sandpack && actionContext?.action]);
  const GetSandpackCleint = async () => {
    const client = previewRef?.current?.getClient?.();
    if (client) {
      console.log(client);
      const result = await client.getCodeSandboxURL?.();
      if (actionContext?.action?.actionType == "deploy") {
        window.open("https://" + result?.sandboxId + ".csb.app/");
      } else if (actionContext?.action?.actionType == "export") {
        window?.open(result?.editorUrl);
      }
    }
  };

  return (
    <SandpackPreview
      ref={previewRef}
      showNavigator={true}
      style={{ height: "80vh" }}
    />
  );
}

export default SandpackPreviewClient;
