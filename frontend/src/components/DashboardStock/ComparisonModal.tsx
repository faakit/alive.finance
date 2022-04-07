import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { api } from "../../services/api";
import { StockInput } from "../StockInput";
import { CompareStockLine } from "./CompareStockLine";

interface ComparisonModalProps {
    name: string;
    price: number;
}

export function ComparisonModal({ name, price }: ComparisonModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    const [stocks, setStocks] = useState<ComparisonModalProps[]>([]);

    async function getStock(stock: string) {
        try {
            const alreadyExists = stocks.find((x) =>
                x.name.toLowerCase() === stock.toLowerCase()
            );
            
            if (!!alreadyExists || stock.toLowerCase() === name.toLowerCase()) {
                toast({
                    title: 'Ocorreu um erro.',
                    description: 'Esse investimento já está listado!',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })

                return;
            }

            const { data } = await api.get(`/stock/${stock.toLowerCase()}/quote`);

            const stockResponse: ComparisonModalProps = {
                name: data.name,
                price: data.lastPrice
            }

            setStocks([...stocks, stockResponse])
        }  catch(error) {
            toast({
                title: 'Ocorreu um erro.',
                description: 'Tente novamente mais tarde ou tente outra ação.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return (
        <>
            <Button onClick={onOpen} variant="link" color="gray.700">Comparar</Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay backdropFilter="blur(3px)" />
                <ModalContent>
                    <ModalHeader>Comparando: {name}</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <TableContainer>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Ação</Th>
                                        <Th>Preço</Th>
                                        <Th isNumeric>Diferença</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {stocks.map(stock => (
                                        <CompareStockLine key={stock.name} baseStockPrice={price} comparedStock={stock} />
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ModalBody>

                    <ModalFooter>
                        <StockInput handleSubmit={(stock) => getStock(stock)} w="100%"/>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}