import { Flex, FormControl, Icon, Input, InputGroup, InputGroupProps, InputLeftElement } from "@chakra-ui/react";
import { FormEventHandler } from "react";
import { RiAddFill } from "react-icons/ri";

interface StockInputProps extends InputGroupProps { 
    onSubmit: FormEventHandler;
}

export function StockInput({ onSubmit, ...rest }: StockInputProps) {
    return (
        <Flex 
        as="form"
        onSubmit={onSubmit}
        flex="1"
        >
            <FormControl>
                <InputGroup
                    bg="gray.300"
                    borderRadius="md"
                    {...rest}
                >
                    <InputLeftElement
                        pointerEvents='none'
                        h="3rem"
                    >
                        <Icon as={RiAddFill} fontSize="1.5rem" />
                    </InputLeftElement>
                    <Input placeholder='Adicionar ação' h="3rem" fontSize="1.5rem" />
                </InputGroup>
            </FormControl>
        </Flex>

    )
}