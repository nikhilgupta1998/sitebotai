import { createContext } from "react";

interface Props {
  userDetail: any;
  setUserDetail: React.Dispatch<any>;
}

export const UserDetailContext = createContext<Props | undefined>(undefined);
