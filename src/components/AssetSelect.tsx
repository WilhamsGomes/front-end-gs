import { Portal, Select } from "@chakra-ui/react";
import type { ListCollection } from "@chakra-ui/react";

type AssetSelectProps = {
  collection: ListCollection<any>;
  value: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  width?: string;
};

export default function AssetSelect({
  collection,
  value,
  onChange,
  placeholder,
  width = "220px",
}: AssetSelectProps) {
  return (
    <Select.Root
      collection={collection}
      value={value}
      onValueChange={(e) => onChange(e.value)}
      size="sm"
      width={width}
      variant="ghost"
    >
      <Select.Control bg="blackAlpha.100" borderRadius="12px">
        <Select.Trigger bg="blackAlpha.100">
          <Select.ValueText placeholder={placeholder} color={"blackAlpha.800"}/>
        </Select.Trigger>

        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Portal>
        <Select.Positioner >
          <Select.Content  bg="blackAlpha.100">
            {collection.items.map((item) => (
              <Select.Item item={item} key={item.value} color={"blackAlpha.800"}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
