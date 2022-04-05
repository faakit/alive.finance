import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { StockInput } from "../StockInput";
import { CompareStockLine } from "./CompareStockLine";

interface ComparisonModalProps {
    title: string;
}

export function ComparisonModal({ title }: ComparisonModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen} variant="link" color="gray.700">Comparar</Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay backdropFilter="blur(3px)" />
                <ModalContent>
                    <ModalHeader>Comparando: {title}</ModalHeader>
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
                                    <CompareStockLine baseStockPrice={2700} comparedStock={{ price: 2800, title: 'AAPL' }} />
                                    <CompareStockLine baseStockPrice={2700} comparedStock={{ price: 50.5, title: 'NVDC' }} />
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ModalBody>

                    <ModalFooter>
                        <StockInput handleSubmit={() => alert('enviado')} w="100%"/>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}