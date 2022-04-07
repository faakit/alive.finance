import { Icon, Td, Tr } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useSimulation } from "../../../services/hooks/useSimulation";

interface TableRowProps {
    stock: {
        name: string;
        lastPrice: number;
        priceAtDate: string;
        purchasedAmount: number,
        purchasedAt: string,
        capitalGains: number
    }
}

export function TableRow({ stock }: TableRowProps) {
    const { deleteStock } = useSimulation();

    return (
        <Tr bg={stock.capitalGains >= 0 ? "green.300" : "red.300"}>
            <Td borderLeftRadius="xl">{stock.name.toUpperCase()}</Td>
            <Td>{stock.purchasedAmount}</Td>
            <Td>
                $ {(Number(stock.priceAtDate) * Number(stock.purchasedAmount)).toFixed(2)}
            </Td>
            <Td>{stock.purchasedAt}</Td>
            <Td>$ {stock.capitalGains.toFixed(2)}</Td>
            <Td>$ {(Number(stock.lastPrice) * Number(stock.purchasedAmount)).toFixed(2)}</Td>
            <Td borderRightRadius="xl">
                <Icon
                    as={FaTrash}
                    _hover={{ cursor: 'pointer' }}
                    onClick={() => deleteStock(stock.name)}
                />
            </Td>
        </Tr>
    )
}