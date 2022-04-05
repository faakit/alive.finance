import { Flex, FormControl, Icon, Input, InputGroup, InputGroupProps, InputLeftElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { RiAddFill } from "react-icons/ri";

interface StockInputProps extends InputGroupProps { 
    handleSubmit: (stock: string) => void;
}

export function StockInput({ handleSubmit, ...rest }: StockInputProps) {
    const [stock, setStock] = useState('');

    function submitHandler(ev: React.FormEvent){
        ev.preventDefault();

        handleSubmit(stock);
    }

    return (
        <Flex 
        as="form"
        onSubmit={(ev) => submitHandler(ev)}
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
                    <Input 
                    id="stock" 
                    placeholder='Adicionar ação' 
                    h="3rem" 
                    fontSize="1.5rem" 
                    onChange={(ev) => setStock(ev.target.value)}
                    />
                </InputGroup>
            </FormControl>
        </Flex>

    )
}