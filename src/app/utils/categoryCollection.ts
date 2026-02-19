import { createListCollection } from "@chakra-ui/react";

export const categoryCollection = createListCollection({
  items: [
    { label: "Computador", value: "Computador" },
    { label: "Monitor", value: "Monitor" },
    { label: "Periférico", value: "Periférico" },
    { label: "Rede", value: "Rede" },
    { label: "Impressora", value: "Impressora" },
  ],
});
