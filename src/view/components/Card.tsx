import { Card, HStack, Box, Text, Icon } from "@chakra-ui/react";
import type { IconType } from "react-icons";

type CardDashProps = {
  label: string;
  value: number | string;
  icon: IconType;
  iconColor?: string;
};

export default function CardDash({
  label,
  value,
  icon,
  iconColor = "blackAlpha.800",
}: CardDashProps) {
  return (
    <Card.Root
      bg="white"
      borderColor="gray.200"
      borderWidth="1px"
      borderRadius="16px"
    >
      <Card.Body>
        <HStack justify="space-between" align="center">
          <Box>
            <Text color="blackAlpha.600" fontSize="sm">
              {label}
            </Text>

            <Text
              color="blackAlpha.900"
              fontSize="40px"
              fontWeight="bold"
              lineHeight="1"
            >
              {value}
            </Text>
          </Box>

          <Box
            bg="blackAlpha.100"
            borderRadius="14px"
            p="3"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={icon} boxSize="22px" color={iconColor} />
          </Box>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
