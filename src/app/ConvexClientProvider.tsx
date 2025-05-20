"use client";
import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

interface Props {
  children: React.ReactNode;
}
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const ConvexClientProvider: React.FC<Props> = ({ children }) => {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};

export default ConvexClientProvider;
