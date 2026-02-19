import {
  Box,
  Separator,
  HStack,
  IconButton,
  Text,
  VStack,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import { FiGrid, FiMonitor, FiSettings } from "react-icons/fi";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import type { IconType } from "react-icons";

type NavItem = {
  label: string;
  to: string;
  icon: IconType;
};

const itemsNav: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: FiGrid },
  { label: "Ativos", to: "/assets", icon: FiMonitor },
  { label: "Configurações", to: "/settings", icon: FiSettings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      w={collapsed ? "84px" : "260px"}
      transition="width 0.2s ease"
      bg="gray.900"
      color="white"
      h="100vh"
      position="sticky"
      top="0"
      borderRightWidth="1px"
      borderRightColor="whiteAlpha.200"
    >
      <VStack align="stretch" h="full">
        <HStack px="4" py="4">
          <Box
            w="36px"
            h="36px"
            bg="blue.500"
            borderRadius="12px"
            display="grid"
            placeItems="center"
            fontWeight="bold"
          >
            A
          </Box>

          {!collapsed && (
            <Text fontWeight="700" fontSize="lg">
              AssetHub
            </Text>
          )}
        </HStack>

        <Separator borderColor="whiteAlpha.200" />

        <VStack align="stretch" px="3" py="3">
          {itemsNav.map((item, index) => (
            <Box
              display={"flex"}
              alignItems={"center"}
              _hover={{ bg: "whiteAlpha.100" }}
              _active={{ bg: "whiteAlpha.200" }}
              cursor={"pointer"}
              h="44px"
              p={4}
              borderRadius="12px"
              key={index}
            >
              <Icon as={item.icon} boxSize={18} color="whiteAlpha.800" />
              <Text
                key={item.to}
                justifyContent={collapsed ? "center" : "flex-start"}
                color="whiteAlpha.800"
                px={collapsed ? "0" : "12px"}
              >
                {!collapsed && item.label}
              </Text>
            </Box>
          ))}
        </VStack>

        <Spacer />

        <Box px="3" pb="4">
          <Separator borderColor="whiteAlpha.200" mb="3" />
          <HStack justify={"center"}>
            <IconButton
              aria-label="Recolher menu"
              onClick={() => setCollapsed((v) => !v)}
              variant="ghost"
              color="whiteAlpha.800"
              _hover={{ bg: "whiteAlpha.100" }}
            >
              {collapsed ? <FaArrowRight /> : <FaArrowLeft />}
            </IconButton>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}
