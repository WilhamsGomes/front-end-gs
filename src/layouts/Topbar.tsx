import {
  Box,
  HStack,
  Text,
  Menu,
  Heading,
  Portal,
  AvatarRoot,
} from "@chakra-ui/react";

type TopbarProps = {
  title: string;
  subtitle?: string;
};

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <HStack
      h="64px"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justify="space-between"
      alignItems="center"
      position="sticky"
      top="0"
      zIndex={10}
      padding={8}
    >
      <Box>
        <Heading size="lg" color="blackAlpha.900">
          {title}
        </Heading>

        {subtitle && <Text color="blackAlpha.600">{subtitle}</Text>}
      </Box>

      <Menu.Root>
        <Menu.Trigger asChild>
          <HStack cursor="pointer">
            <Text fontWeight="600" color="blackAlpha.900">
              Admin
            </Text>
            <AvatarRoot size="sm" />
          </HStack>
        </Menu.Trigger>

        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="profile" cursor={"pointer"}>Perfil</Menu.Item>
              <Menu.Item value="logout" cursor={"pointer"}>Sair</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </HStack>
  );
}
