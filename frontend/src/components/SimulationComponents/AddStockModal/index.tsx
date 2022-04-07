import { Button,  Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AddStockForm } from "./AddStockForm";

export function AddStockModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    

    return (
        <>
            <Button h="7" onClick={onOpen}>
                + Adicionar Ativo
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay backdropFilter="blur(3px)" />
                <ModalContent>
                    <ModalHeader>Adicionar Ativo</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <AddStockForm onSent={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}