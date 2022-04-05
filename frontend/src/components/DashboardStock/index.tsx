import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { RiCloseFill } from "react-icons/ri";
import { ComparisonModal } from "./ComparisonModal";
import { HistoricModal } from "./HistoricModal";

interface DashboardStockProps {
    name: string;
    lastPrice: number;
    pricedAt: string;
    deleteStock: (name: string) => void;
}

export function DashboardStock({ name, lastPrice, pricedAt, deleteStock }: DashboardStockProps) {
    return (
        <Box
            minW="250px"
            maxW="400px"
            bg="blue.400"
            p="4"
            borderRadius="xl"
            flex="1"
            transition="all 0.2s"
            _hover={{
                transform: 'scale(1.05)'
            }}
        >
            <Flex justifyContent="space-between">
                <Text
                    color="white"
                    fontSize="xl"
                    fontWeight="bold"
                >
                    {name}
                </Text>
                <Icon as={RiCloseFill} fontSize="xl" onClick={() => deleteStock(name)}/>
            </Flex>

            <Text color="white" fontSize="md">
                Ultimo preço: $ {lastPrice}
            </Text>

            <Text color="white" fontSize="md">
                Precificação do dia: {pricedAt}
            </Text>

            <Flex justifyContent="space-between" mt="2">
                <ComparisonModal title={name} />
                <HistoricModal title={name} />
            </Flex>
        </Box>
    )
}