export type AssetStatus = "ACTIVE" | "MANUTENCAO" | "INACTIVE";

export function getStatusUI(status: string) {
  switch (status) {
    case "ACTIVE":
      return { label: "ACTIVE", bg: "blue.600", color: "white" };
    case "MANUTENCAO":
      return {
        label: "Manutenção",
        bg: "blackAlpha.100",
        color: "blackAlpha.800",
      };
    case "INACTIVE":
      return { label: "INACTIVE", bg: "red.500", color: "white" };
    default:
      return { label: status, bg: "gray.200", color: "gray.800" };
  }
}
