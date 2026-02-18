import { createListCollection } from "@chakra-ui/react";

export const categoryCollection = createListCollection({
  items: [
    { label: "Computador", value: "computador" },
    { label: "Monitor", value: "monitor" },
    { label: "Periférico", value: "periferico" },
  ],
});
