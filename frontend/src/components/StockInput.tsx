import { Flex, FormControl, Icon, Input, InputGroup, InputGroupProps, InputLeftElement, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { RiAddFill } from "react-icons/ri";

interface StockInputProps extends InputGroupProps { 
    handleSubmit: (stock: string) => Promise<void>;
}

export function StockInput({ handleSubmit, ...rest }: StockInputProps) {
    const [stock, setStock] = useState('');
    const [isSubmiting, setIsSubmiting] = useState(false);

    async function submitHandler(ev: React.FormEvent){
        ev.preventDefault();
        setIsSubmiting(true);

        await handleSubmit(stock);

        setIsSubmiting(false);
        setStock('');
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
                        {isSubmiting ? <Spinner /> : <Icon as={RiAddFill} fontSize="1.5rem" />}
                    </InputLeftElement>
                    <Input 
                    id="stock" 
                    placeholder='Adicionar ação' 
                    h="3rem" 
                    fontSize="1.5rem" 
                    value={stock}
                    onChange={(ev) => setStock(ev.target.value)}
                    isDisabled={isSubmiting}
                    />
                </InputGroup>
            </FormControl>
        </Flex>
    )
}