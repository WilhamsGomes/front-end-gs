import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assetsService } from "../services/assets";

export function useDeleteAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assetsService.deleteAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
}
