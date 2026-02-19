import { getStatusUI } from "@/app/hooks/useStatusAssets";
import type { AssetsResponse } from "@/app/services/assets/assets";
import {
  Badge,
  HStack,
  IconButton,
  TableScrollArea,
  Table,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

type AssetsTableProps = {
  rows: AssetsResponse[];
  onEdit?: () => void;
  onDelete?: () => void;
};

export function AssetsTable({ rows, onEdit, onDelete }: AssetsTableProps) {
  return (
    <TableScrollArea borderRadius="12px">
      <Table.Root variant="line" size="md">
        <Table.Header>
          <Table.Row bg="white">
            <Table.ColumnHeader color="blackAlpha.600">Nome</Table.ColumnHeader>
            <Table.ColumnHeader color="blackAlpha.600">
              Categoria
            </Table.ColumnHeader>
            <Table.ColumnHeader color="blackAlpha.600">
              Nº de Série
            </Table.ColumnHeader>
            <Table.ColumnHeader color="blackAlpha.600">
              Data Aquisição
            </Table.ColumnHeader>
            <Table.ColumnHeader color="blackAlpha.600">
              Status
            </Table.ColumnHeader>
            <Table.ColumnHeader color="blackAlpha.600" textAlign="right">
              Ações
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows?.map((a) => {
            const ui = getStatusUI(a.status);
            return (
              <Table.Row key={a.id} bg="white">
                <Table.Cell fontWeight="600" color="blackAlpha.900">
                  {a.name}
                </Table.Cell>

                <Table.Cell color="blackAlpha.900">{a.category}</Table.Cell>

                <Table.Cell color="blackAlpha.700">{a.serialNumber}</Table.Cell>

                <Table.Cell color="blackAlpha.900">
                  {a.acquisitionDate.toString()}
                </Table.Cell>

                <Table.Cell>
                  <Badge
                    bg={ui.bg}
                    color={ui.color}
                    borderRadius="999px"
                    px="3"
                    py="1"
                    fontWeight="600"
                  >
                    {ui.label}
                  </Badge>
                </Table.Cell>

                <Table.Cell>
                  <HStack justify="flex-end">
                    <IconButton
                      aria-label="Editar"
                      variant="ghost"
                      borderRadius="10px"
                      onClick={() => onEdit}
                    >
                      <FiEdit2 />
                    </IconButton>

                    <IconButton
                      aria-label="Remover"
                      variant="ghost"
                      color="red.500"
                      borderRadius="10px"
                      onClick={() => onDelete}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </TableScrollArea>
  );
}
