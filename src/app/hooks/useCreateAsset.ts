import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assetsService } from "../services/assets";

export function useCreateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assetsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
}
