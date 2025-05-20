"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessagesContext } from "@/context/MessagesContext";
// import { IMessagesType } from "@/modals/IMessage";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { api } from "../../convex/_generated/api";
import { useConvex } from "convex/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/custom/AppSideBar";
import { ActionContext } from "@/context/ActionContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface Props {
  children: React.ReactNode;
}

const Provider: React.FC<Props> = ({ children }) => {
  const [messages, setMessages] = useState<any>(null);
  const [userDetail, setUserDetail] = useState<any>(null);
  const [action, setAction] = useState();

  const router = useRouter();
  const convex = useConvex();

  useEffect(() => {
    IsAuthenticated();
  }, []);
  const IsAuthenticated = async () => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (!userData) {
        router.push("/");
        return;
      }

      const user = JSON.parse(userData);
      if (!user?.email) {
        router.push("/");
        return;
      }

      // Fetch user from the database
      const result = await convex.query(api.user.GetUser, {
        email: user.email as string, // Now TypeScript knows this is safe
      });

      setUserDetail(result);
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY || ""}
    >
      <PayPalScriptProvider
        options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_Id || "" }}
      >
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <ActionContext.Provider value={{ action, setAction }}>
              <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <SidebarProvider defaultOpen={false}>
                  <AppSideBar />
                  <main className="w-full">
                    <Header />
                    {children}
                  </main>
                </SidebarProvider>
              </NextThemesProvider>
            </ActionContext.Provider>
          </MessagesContext.Provider>
        </UserDetailContext.Provider>
      </PayPalScriptProvider>
    </GoogleOAuthProvider>
  );
};

export default Provider;
