import { getStatusUI, type AssetStatus } from "@/hooks/useStatusAssets";
import {
  Badge,
  HStack,
  IconButton,
  TableScrollArea,
  Table,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export type AssetRow = {
  id: string;
  name: string;
  category: string;
  serialNumber: string;
  acquisitionDate: string;
  status: AssetStatus;
};

type AssetsTableProps = {
  rows: AssetRow[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function AssetsTable({ rows, onEdit, onDelete }: AssetsTableProps) {

  return (
    <TableScrollArea borderRadius="12px">
      <Table.Root variant="line" size="md">
        <Table.Header>
          <Table.Row bg="blackAlpha.100">
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
          {rows.map((a) => {
            const ui = getStatusUI(a.status);
            return (
              <Table.Row key={a.id} bg="blackAlpha.100">
                <Table.Cell fontWeight="600" color="blackAlpha.900">
                  {a.name}
                </Table.Cell>

                <Table.Cell color="blackAlpha.900">{a.category}</Table.Cell>

                <Table.Cell color="blackAlpha.700">{a.serialNumber}</Table.Cell>

                <Table.Cell color="blackAlpha.900">{a.acquisitionDate}</Table.Cell>

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
                      onClick={() => onEdit?.(a.id)}
                    >
                      <FiEdit2 />
                    </IconButton>

                    <IconButton
                      aria-label="Remover"
                      variant="ghost"
                      color="red.500"
                      borderRadius="10px"
                      onClick={() => onDelete?.(a.id)}
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
