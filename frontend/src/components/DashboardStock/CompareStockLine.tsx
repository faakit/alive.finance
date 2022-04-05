import { Icon, Td, Tr } from "@chakra-ui/react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'

interface CompareStockLineProps {
    baseStockPrice: number;
    comparedStock: {
        name: string;
        price: number;
    }
}

export function CompareStockLine({ baseStockPrice, comparedStock }: CompareStockLineProps) {
    const priceDifference: number = baseStockPrice - comparedStock.price;

    if (priceDifference < 0) {
        return (
            <Tr bg="red.300">
                <Td>{comparedStock.name}</Td>
                <Td>$ {comparedStock.price}</Td>
                <Td isNumeric><Icon as={MdKeyboardArrowDown} />$ {-priceDifference}</Td>
            </Tr>
        )
    }

    return (
        <Tr bg="green.300">
            <Td>{comparedStock.name}</Td>
            <Td>$ {comparedStock.price}</Td>
            <Td isNumeric><Icon as={MdKeyboardArrowUp} />$ {priceDifference}</Td>
        </Tr>
    )
}