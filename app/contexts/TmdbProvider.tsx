"use client";

import React, { useEffect } from "react";
import { getSession } from "../lib/services";

export const TmdbContext = React.createContext({
  loginStatus: false,
  isLoading: true,
  dispatch: (action: { type: string; payload: object | null }) => {},
});

export const TmdbProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const reloadSession = async () => {
    const session = await getSession();
    setLoginStatus(session.isLoggedIn);
    setIsLoading(false);
  };
  const dispatch = (action: { type: string; payload: object | null }) => {
    switch (action.type) {
      case "LOGIN":
        setLoginStatus(true);
        break;
      case "LOGOUT":
        setLoginStatus(false);
        break;
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };

  useEffect(() => {
    reloadSession();
  }, []);

  return (
    <TmdbContext.Provider value={{ loginStatus, isLoading, dispatch }}>
      {children}
    </TmdbContext.Provider>
  );
};
