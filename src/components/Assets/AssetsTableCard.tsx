import { Button, Card, HStack, Icon, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useMemo, useState } from "react";

import { AssetSearchInput } from "./AssetSearchInput";
import AssetSelect from "./AssetSelect";
import { categoryCollection } from "@/utils/categoryCollection";
import { AssetsTable } from "./AssetsTable";

import type { AssetRow } from "@/types/asset";
import type { AssetFormValues } from "@/utils/assetSchema";
import { AssetFormModal } from "./AssetFormModal";
import { mockAssets } from "@/utils/mockAssets";

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

export function AssetsTableCard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [rows, setRows] = useState<AssetRow[]>(mockAssets);

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editing, setEditing] = useState<AssetRow | null>(null);

  const filteredRows = useMemo(() => {
    const s = search.trim().toLowerCase();

    return rows.filter((r) => {
      const matchSearch =
        !s ||
        r.name.toLowerCase().includes(s) ||
        r.serialNumber.toLowerCase().includes(s);

      const matchCategory = category.length === 0 || category.includes(r.category);
      const matchStatus = status.length === 0 || status.includes(r.status);

      return matchSearch && matchCategory && matchStatus;
    });
  }, [rows, search, category, status]);

  const openCreate = () => {
    setMode("create");
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (id: string) => {
    const asset = rows.find((r) => r.id === id);
    if (!asset) return;
    setMode("edit");
    setEditing(asset);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSubmitModal = async (values: AssetFormValues) => {

    if (mode === "create") {
      const newAsset: AssetRow = {
        id: crypto.randomUUID(),
        ...values,
        status: values.status, 
      };

      setRows((prev) => [newAsset, ...prev]);
      return;
    }

    if (!editing) return;

    setRows((prev) =>
      prev.map((r) => (r.id === editing.id ? { ...r, ...values } : r))
    );
  };

  return (
    <Card.Root bg="white" borderRadius="16px" borderWidth="1px" borderColor="gray.200">
      <Card.Body>
        <HStack justify="space-between" align="center" mb="4">
          <Text fontSize="lg" fontWeight="700" color="blackAlpha.900">
            Ativos
          </Text>

          <Button colorPalette="blue" borderRadius="12px" onClick={openCreate}>
            <Icon as={FiPlus} />
            Adicionar ativo
          </Button>
        </HStack>

        <HStack mb="4" align="center" justify="center">
          <AssetSearchInput value={search} onChange={setSearch} />

          <AssetSelect
            collection={categoryCollection}
            value={category}
            onChange={setCategory}
            placeholder="Todas categorias"
          />

          {/* aqui seria o status collection (ex: statusCollection) */}
          <AssetSelect
            collection={categoryCollection}
            value={status}
            onChange={setStatus}
            placeholder="Todos status"
          />
        </HStack>

        <AssetsTable
          rows={filteredRows}
          onEdit={openEdit}
          onDelete={handleDelete}
        />

        <AssetFormModal
          open={modalOpen}
          mode={mode}
          initialData={editing}
          categories={CATEGORY_OPTIONS}
          statuses={STATUS_OPTIONS}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmitModal}
        />
      </Card.Body>
    </Card.Root>
  );
}
