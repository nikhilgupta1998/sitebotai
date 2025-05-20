"use client";

// import { IMessagesType } from "@/modals/IMessage";
import { createContext } from "react";

// Define the type of your context value
export interface MessagesContextType {
  messages: any; // Replace `any` with a proper type if you know it
  setMessages: React.Dispatch<React.SetStateAction<any>>;
}

export const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);
