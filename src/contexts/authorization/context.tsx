import { createContext } from "react";
import { IUserProfile } from "./interface";

type Authorization = {
  email: string;
  setEmail: (email: string) => void;
  loadProfile: () => Promise<void>;
  login: (email: string) => Promise<void>;
  profile: IUserProfile | null;
  isAuthenticated: boolean;
  checkAuthenticated: boolean;
};

export const AuthorizationContext = createContext<Authorization | undefined>(
  undefined
);
