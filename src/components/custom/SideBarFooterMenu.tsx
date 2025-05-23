"use client";
import {
  HelpCircle,
  LogOut,
  LucideProps,
  Settings,
  Wallet,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { googleLogout } from "@react-oauth/google";

interface IOptionType {
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  path?: string;
  onClick?: () => void;
}

function SideBarFooterMenu() {
  const router = useRouter();
  const options = [
    {
      name: "Settings",
      icon: Settings,
    },
    {
      name: "Help Center",
      icon: HelpCircle,
    },
    {
      name: "My Subscription",
      icon: Wallet,
      path: "/pricing",
    },
    {
      name: "Sign Out",
      icon: LogOut,
      onClick: () => {
        googleLogout();
        localStorage.removeItem("user");
        window.open("/", "_self");
      },
    },
  ];
  const onOptionClock = (option: IOptionType) => {
    if (option?.path) {
      window.open(option?.path, "_self");
      return;
    }
    option?.onClick?.();
  };

  return (
    <div className="p-2 mb-10">
      {options.map((option, index) => (
        <Button
          onClick={() => onOptionClock(option)}
          key={index}
          variant="ghost"
          className="w-full flex justify-start my-3"
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooterMenu;
