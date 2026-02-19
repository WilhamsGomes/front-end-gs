import { useContext } from "react";
import { AssetsContext } from "./AssetsContext";

export function useAssetsContext() {
  return useContext(AssetsContext);
}
