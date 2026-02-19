import { useQuery } from "@tanstack/react-query";
import { assetsService } from "../services/assets";

export function useAssetsQuery() {
  return useQuery({
    queryKey: ["assets-find-all"],
    queryFn: async () => {
      const data = await assetsService.findAll();
      return data ?? [];
    },
  });
}
