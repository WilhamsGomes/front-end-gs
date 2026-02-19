import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { usePageMeta } from "@/app/hooks/usePageMeta";

export function AppLayout() {
  const { pathname } = useLocation();
  const meta = usePageMeta(pathname);

  return (
    <Flex minH="100vh" bg="gray.50">
      <Sidebar />

      <Box flex="1">
        <Topbar title={meta.title} subtitle={meta.subtitle} />

        <Box px={{ base: 4, md: 8 }} py={{ base: 4, md: 6 }}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}
