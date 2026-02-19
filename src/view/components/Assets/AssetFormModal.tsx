import {
  Button,
  Dialog,
  Field,
  Input,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { assetSchema, type AssetFormValues } from "@/app/utils/assetSchema";
import type { AssetRow } from "@/app/types/asset";

type Mode = "create" | "edit";

type Option = { label: string; value: string };

type AssetFormModalProps = {
  open: boolean;
  mode: Mode;
  initialData?: AssetRow | null; 
  categories: Option[];
  statuses: Option[];
  onClose: () => void;

  onSubmit: (values: AssetFormValues) => Promise<void> | void;
};

export function AssetFormModal({
  open,
  mode,
  initialData,
  categories,
  statuses,
  onClose,
  onSubmit,
}: AssetFormModalProps) {
  const title = useMemo(
    () => (mode === "create" ? "Adicionar ativo" : "Editar ativo"),
    [mode]
  );

  const submitLabel = useMemo(
    () => (mode === "create" ? "Criar" : "Salvar"),
    [mode]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AssetFormValues>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: "",
      category: "",
      serialNumber: "",
      acquisitionDate: "",
      status: "ATIVO",
    },
  });

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      reset({
        name: initialData.name,
        category: initialData.category,
        serialNumber: initialData.serialNumber,
        acquisitionDate: initialData.acquisitionDate,
        status: initialData.status,
      });
      return;
    }

    reset({
      name: "",
      category: "",
      serialNumber: "",
      acquisitionDate: "",
      status: "ATIVO",
    });
  }, [open, mode, initialData, reset]);

  const internalSubmit = handleSubmit(async (values) => {
    await onSubmit(values);
    onClose();
  });

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content borderRadius="16px">
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <VStack align="stretch" gap="4">
              <Field.Root invalid={!!errors.name}>
                <Field.Label>Nome</Field.Label>
                <Input placeholder="Ex: Dell Latitude 5540" {...register("name")} />
                <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.category}>
                <Field.Label>Categoria</Field.Label>
                <select
                  {...register("category")}
                  style={{
                    height: "40px",
                    borderRadius: "10px",
                    padding: "0 12px",
                    border: "1px solid #E2E8F0",
                    outline: "none",
                    width: "100%",
                  }}
                >
                  <option value="">Selecione</option>
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <Field.ErrorText>{errors.category?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.serialNumber}>
                <Field.Label>Nº de Série</Field.Label>
                <Input placeholder="Ex: DL-2024-001" {...register("serialNumber")} />
                <Field.ErrorText>{errors.serialNumber?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.acquisitionDate}>
                <Field.Label>Data de aquisição</Field.Label>
                <Input placeholder="DD/MM/AAAA" {...register("acquisitionDate")} />
                <Field.ErrorText>{errors.acquisitionDate?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.status}>
                <Field.Label>Status</Field.Label>
                <select
                  {...register("status")}
                  style={{
                    height: "40px",
                    borderRadius: "10px",
                    padding: "0 12px",
                    border: "1px solid #E2E8F0",
                    outline: "none",
                    width: "100%",
                  }}
                >
                  {statuses.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <Field.ErrorText>{errors.status?.message}</Field.ErrorText>
              </Field.Root>

              <Text fontSize="sm" color="blackAlpha.600">
                * Validação pronta e submit preparado para API (async).
              </Text>
            </VStack>
          </Dialog.Body>

          <Dialog.Footer>
            <HStack justify="flex-end" w="100%">
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
              <Button colorPalette="blue" onClick={internalSubmit} loading={isSubmitting}>
                {submitLabel}
              </Button>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
