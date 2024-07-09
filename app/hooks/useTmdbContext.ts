import { useContext } from "react";
import { TmdbContext } from "../contexts/TmdbProvider";

export default function useTmdbContext() {
  const context = useContext(TmdbContext);
  if (!context) {
    throw new Error("useTmdnContext must be used within a TmdbProvider");
  }
  return context;
}
