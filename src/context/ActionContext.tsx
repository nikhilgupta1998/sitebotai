import { createContext } from "react";

interface Props {
  action: any;
  setAction: React.Dispatch<React.SetStateAction<any>>;
}

export const ActionContext = createContext<Props | undefined>(undefined);
