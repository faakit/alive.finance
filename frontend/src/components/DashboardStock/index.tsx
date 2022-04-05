import { Box, Flex, Text } from "@chakra-ui/react";
import { ComparisonModal } from "./ComparisonModal";
import { HistoricModal } from "./HistoricModal";

interface DashboardStockProps {
    title: string;
}

export function DashboardStock({ title }: DashboardStockProps) {
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