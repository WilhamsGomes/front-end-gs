import { Input, InputGroup } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

type AssetSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function AssetSearchInput({
  value,
  onChange,
  placeholder = "Buscar por nome ou número de série...",
}: AssetSearchInputProps) {
  return (
    <InputGroup startElement={<FiSearch color="blackAlpha.500" />}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        borderRadius="12px"
        color={"blackAlpha.800"}
        bg={"blackAlpha.100"}
        border={"none"}
      />
    </InputGroup>
  );
}
