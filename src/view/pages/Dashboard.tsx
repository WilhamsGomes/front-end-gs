import { AssetsTableCard } from "../components/Assets/AssetsTableCard";
import CardDash from "../components/Card";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { FaBan, FaBox, FaCheckCircle, FaTools } from "react-icons/fa";

export default function Dashboard() {
  return (
    <Box gap={4} display={"flex"} flexDirection={"column"}>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="10px">
        <CardDash
          label="Total de ativos"
          value={12}
          icon={FaBox}
          iconColor="blue.600"
        />
        <CardDash
          label="Ativos"
          value={9}
          icon={FaCheckCircle}
          iconColor="green.600"
        />
        <CardDash
          label="Em manutenção"
          value={2}
          icon={FaTools}
          iconColor="orange.600"
        />
        <CardDash label="Inativos" value={1} icon={FaBan} iconColor="red.600" />
      </SimpleGrid> 
      <AssetsTableCard /> 
    </Box>
  );
}
