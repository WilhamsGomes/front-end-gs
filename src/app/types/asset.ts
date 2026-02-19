export type AssetStatus = "ATIVO" | "MANUTENCAO" | "INATIVO";

export type AssetRow = {
  id: string;
  name: string;
  category: string;
  serialNumber: string;
  acquisitionDate: string;
  status: AssetStatus;
};
