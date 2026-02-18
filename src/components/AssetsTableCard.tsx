// src/pages/Assets/AssetsTableCard.tsx
import { Button, Card, HStack, Icon, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { AssetSearchInput } from "./AssetSearchInput";
import { useState } from "react";
import AssetSelect from "./AssetSelect";
import { categoryCollection } from "@/utils/categoryCollection";
import { AssetsTable, type AssetRow } from "./AssetsTable";

const CATEGORY_OPTIONS = [
  { label: "Computador", value: "Computador" },
  { label: "Monitor", value: "Monitor" },
  { label: "Periférico", value: "Periférico" },
  { label: "Rede", value: "Rede" },
  { label: "Impressora", value: "Impressora" },
];

const STATUS_OPTIONS = [
  { label: "Ativo", value: "ATIVO" },
  { label: "Manutenção", value: "MANUTENCAO" },
  { label: "Inativo", value: "INATIVO" },
];

const MOCK: AssetRow[] = [
  {
    id: "1",
    name: "Dell Latitude 5540",
    category: "Computador",
    serialNumber: "DL-2024-001",
    acquisitionDate: "14/01/2024",
    status: "ATIVO",
  },
  {
    id: "2",
    name: 'Monitor LG 27"',
    category: "Monitor",
    serialNumber: "LG-2024-002",
    acquisitionDate: "19/02/2024",
    status: "ATIVO",
  },
  {
    id: "3",
    name: "Teclado Logitech MX Keys",
    category: "Periférico",
    serialNumber: "LG-2023-015",
    acquisitionDate: "09/06/2023",
    status: "ATIVO",
  },
  {
    id: "4",
    name: "Switch Cisco 24p",
    category: "Rede",
    serialNumber: "CS-2023-008",
    acquisitionDate: "04/03/2023",
    status: "MANUTENCAO",
  },
  {
    id: "5",
    name: "HP LaserJet Pro",
    category: "Impressora",
    serialNumber: "HP-2022-042",
    acquisitionDate: "21/11/2022",
    status: "INATIVO",
  },
];

export function AssetsTableCard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string[]>([]);

  return (
    <Card.Root
      bg="white"
      borderRadius="16px"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <Card.Body>
        <HStack justify="space-between" align="center" mb="4">
          <Text fontSize="lg" fontWeight="700" color="blackAlpha.900">
            Ativos
          </Text>

          <Button colorPalette="blue" borderRadius="12px">
            <Icon as={FiPlus} />
            Adicionar ativo
          </Button>
        </HStack>

        <HStack
          mb="4"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <AssetSearchInput value={search} onChange={setSearch} />
          <AssetSelect
            collection={categoryCollection}
            value={category}
            onChange={setCategory}
            placeholder="Todas categorias"
          />
          <AssetSelect
            collection={categoryCollection}
            value={category}
            onChange={setCategory}
            placeholder="Todas categorias"
          />
        </HStack>

        <AssetsTable
          rows={MOCK}
          onEdit={(id) => console.log("edit", id)}
          onDelete={(id) => console.log("delete", id)}
        />
      </Card.Body>
    </Card.Root>
  );
}
