import { Button, Card, HStack, Icon, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useMemo } from "react";

import { AssetSearchInput } from "./AssetSearchInput";
import AssetSelect from "./AssetSelect";
import { categoryCollection } from "@/app/utils/categoryCollection";
import { AssetsTable } from "./AssetsTable";

import type { AssetRow } from "@/app/types/asset";
import type { AssetFormValues } from "@/app/utils/assetSchema";
import { AssetFormModal } from "./AssetFormModal";
import { useAssetsQuery } from "@/app/hooks/useAssetsQuery";
import { useAssetsContext } from "@/app/context/useSettingsContext";
import { useCreateAsset } from "@/app/hooks/useCreateAsset";
import { useEditAsset } from "@/app/hooks/useEditAsset";
import { useDeleteAsset } from "@/app/hooks/useDeleteAsset";
import { statusCollection } from "@/app/utils/statusCollection";

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
  const { data = [], isLoading } = useAssetsQuery();

  const {
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    modalOpen,
    setModalOpen,
    mode,
    editing,
    setMode,
    setEditing,
  } = useAssetsContext();

  const createMutation = useCreateAsset();
  const editMutation = useEditAsset();
  const deleteMutation = useDeleteAsset();

  const filteredRows = useMemo(() => {
    const s = search?.trim().toLowerCase();

    return data.filter((r) => {
      const matchSearch =
        !s ||
        r.name.toLowerCase().includes(s) ||
        r.serialNumber?.toLowerCase().includes(s);

      const matchCategory =
        categoryFilter.length === 0 || categoryFilter.includes(r.category);

      const matchStatus =
        statusFilter.length === 0 || statusFilter.includes(r.status);

      return matchSearch && matchCategory && matchStatus;
    });

  }, [data, search, categoryFilter, statusFilter]);

  const openCreate = () => {
    setMode("create");
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (asset: AssetRow) => {
    setMode("edit");
    setEditing(asset);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  const handleSubmit = async (values: AssetFormValues) => {
    if (mode === "create") {
      await createMutation.mutateAsync(values);
    } else if (editing) {
      await editMutation.mutateAsync({
        id: editing.id,
        ...values,
      });
    }

    setModalOpen(false);
  };

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

          <Button colorPalette="blue" borderRadius="12px" onClick={openCreate}>
            <Icon as={FiPlus} />
            Adicionar ativo
          </Button>
        </HStack>

        <HStack mb="4" align="center" justify="center">
          <AssetSearchInput value={search} onChange={setSearch} />

          <AssetSelect
            collection={categoryCollection}
            value={categoryFilter}
            onChange={setCategoryFilter}
            placeholder="Todas categorias"
          />

          <AssetSelect
            collection={statusCollection}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Todos status"
          />
        </HStack>

        {isLoading ? (
          <Text>Carregando ativos...</Text>
        ) : (
          <AssetsTable
            rows={data}
            onEdit={() => openEdit}
            onDelete={() => handleDelete}
          />
        )}

        <AssetFormModal
          open={modalOpen}
          mode={mode}
          initialData={editing}
          categories={CATEGORY_OPTIONS}
          statuses={STATUS_OPTIONS}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </Card.Body>
    </Card.Root>
  );
}
