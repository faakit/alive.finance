import { Box, Flex, Text } from "@chakra-ui/react";
import { ComparisonModal } from "./ComparisonModal";
import { HistoricModal } from "./HistoricModal";

interface DashboardStockProps {
    title: string;
}

export function DashboardStock({ title }: DashboardStockProps) {
    return (
        <Box minW="200px" maxW="250px" bg="blue.400" p="4" borderRadius="xl" flex="1">
            <Text
                color="white"
                fontSize="xl"
                fontWeight="bold"
            >
                {title}
            </Text>

            <Text color="white" fontSize="md">
                Ultimo preço: $2700.00
            </Text>

            <Flex justifyContent="space-between" mt="2">
                <ComparisonModal title={title} />
                <HistoricModal title={title} />
            </Flex>
        </Box>
    )
}