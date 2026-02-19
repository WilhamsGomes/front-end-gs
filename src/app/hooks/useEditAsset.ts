import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assetsService } from "../services/assets";

export function useEditAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assetsService.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
}
