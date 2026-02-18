import { createListCollection } from "@chakra-ui/react";

export const statusCollection = createListCollection({
  items: [
    { label: "Ativo", value: "ATIVO" },
    { label: "Manutenção", value: "MANUTENCAO" },
    { label: "Inativo", value: "INATIVO" },
  ],
});
