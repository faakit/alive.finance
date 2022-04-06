import { Logo } from "../Logo";

import { Collapse, Flex, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";

import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineStock, AiOutlineClose } from 'react-icons/ai'
import { FaWallet } from 'react-icons/fa'
import { MenuItemLink } from "./MenuItemLink";

export function Header() {
    return (
        <Flex
            justifyContent="space-between"
            w="100%"
            alignItems="center"
            pt="2"
        >
            <Logo />

            <Flex alignItems="center">
                <Text fontSize="xl" color="gray.300">
                    Bem vindo, André.
                </Text>
                <Menu autoSelect={false}>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                as={IconButton}
                                aria-label='Opções'
                                icon={isOpen ? <Icon as={AiOutlineClose} color="white" />
                                             : <Icon as={GiHamburgerMenu} color="white" />}
                                variant="ghost"
                                _hover={{
                                    background: 'transparent'
                                }}
                                _active={{
                                    background: 'transparent'
                                }}
                                _focus={{
                                    outline: 'none',
                                    background: 'transparent'
                                }}
                            />
                            <Collapse in={isOpen} animateOpacity>
                                <MenuList bg="gray.500" border="none">
                                    <MenuItemLink
                                        icon={AiOutlineStock}
                                        href='/dashboard'
                                        title="Ver ações"
                                    />
                                    <MenuItemLink
                                        icon={FaWallet}
                                        href='/simulation'
                                        title="Simulador"
                                    />
                                </MenuList>
                            </Collapse>
                        </>
                    )}
                </Menu>
            </Flex>
        </Flex>
    )
}