export type AssetStatus = "ATIVO" | "MANUTENCAO" | "INATIVO";

export function getStatusUI(status: AssetStatus) {
  switch (status) {
    case "ATIVO":
      return { label: "Ativo", bg: "blue.600", color: "white" };
    case "MANUTENCAO":
      return {
        label: "Manutenção",
        bg: "blackAlpha.100",
        color: "blackAlpha.800",
      };
    case "INATIVO":
      return { label: "Inativo", bg: "red.500", color: "white" };
    default:
      return { label: status, bg: "gray.200", color: "gray.800" };
  }
}
