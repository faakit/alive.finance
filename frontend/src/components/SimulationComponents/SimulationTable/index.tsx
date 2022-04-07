import { Flex, Icon, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";
import { useSimulation } from "../../../services/hooks/useSimulation";
import { AddStockModal } from "../AddStockModal";
import { TableRow } from "./TableRow";

export function SimulationTable() {
    const { stocks } = useSimulation();

    return (
        <>
            <Flex
                mt='8'
                pb='2'
                borderBottom="2px solid white"
                justifyContent="space-between"
                alignItems="center"
            >
                <Flex alignItems="flex-end">
                    <Icon as={FaWallet} fontSize="xl" color="white" mr="3" />
                    <Text color="white" fontSize="xl" lineHeight="1rem">Carteira</Text>
                </Flex>
                <AddStockModal />
            </Flex>
            <TableContainer>
                <Table
                    variant="unstyled"
                    style={{ borderCollapse: 'separate', borderSpacing: '0 0.4rem' }}
                >
                    <Thead>
                        <Tr>
                            <Th color="white">Nome</Th>
                            <Th color="white">Qtd.</Th>
                            <Th isNumeric color="white">Aporte</Th>
                            <Th color="white">Data da compra</Th>
                            <Th isNumeric color="white">Retorno</Th>
                            <Th color="white">Total</Th>
                            <Th color="white"></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {stocks.map((stock) => (
                            <TableRow
                                key={stock.name}
                                stock={stock}
                            />
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}