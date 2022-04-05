import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

interface ComparisonModalProps {
    title: string;
}

export function ComparisonModal({ title }: ComparisonModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen} variant="link" color="gray.700">Comparar</Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay backdropFilter="blur(3px)"/>
                <ModalContent>
                    <ModalHeader>Comparando: {title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}