import { Flex, FormControl, Icon, Input, InputGroup, InputRightElement, FormLabel, Spinner, Button } from "@chakra-ui/react";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useSimulation } from "../../../services/hooks/useSimulation";

interface AddStockFormProps {
    onSent: () => void;
}

export function AddStockForm({ onSent }: AddStockFormProps) {
    const { getStock } = useSimulation();
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [stockName, setStockName] = useState('');
    const [stockDate, setStockDate] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');

    async function submitHandler(ev: React.FormEvent) {
        ev.preventDefault();
        setIsSubmiting(true);

        await getStock(stockName, stockDate, stockQuantity);

        setIsSubmiting(false);
        onSent();
    }

    return (
        <Flex
            as="form"
            onSubmit={(ev) => submitHandler(ev)}
            flex="1"
        >
            <FormControl>
                <>
                    <FormLabel htmlFor="stockName">
                        Código da ação
                    </FormLabel>
                    <InputGroup
                        bg="gray.300"
                        borderRadius="md"
                    >
                        <InputRightElement
                            pointerEvents='none'
                            h="3rem"
                        >
                            {isSubmiting ? <Spinner /> : <Icon as={RiSearchLine} fontSize="1.5rem" />}
                        </InputRightElement>
                        <Input
                            id="stockName"
                            h="3rem"
                            fontSize="1.5rem"
                            value={stockName}
                            onChange={(ev) => setStockName(ev.target.value)}
                            isDisabled={isSubmiting}
                            isRequired
                        />
                    </InputGroup>
                </>

                <>
                    <FormLabel htmlFor="stockDate" mt={4}>
                        Data da aquisição
                    </FormLabel>
                    <Input
                        name="stockDate"
                        id="stockDate"
                        type="date"
                        h="3rem"
                        fontSize="1.5rem"
                        bg="gray.300"
                        borderRadius="md"
                        value={stockDate}
                        onChange={(ev) => setStockDate(ev.target.value)}
                        isDisabled={isSubmiting}
                        isRequired
                    />
                </>

                <>
                    <FormLabel htmlFor="stockQuantity" mt={4}>
                        Quantia comprada
                    </FormLabel>
                    <Input
                        id="stockQuantity"
                        type="number"
                        h="3rem"
                        fontSize="1.5rem"
                        bg="gray.300"
                        borderRadius="md"
                        value={stockQuantity}
                        onChange={(ev) => setStockQuantity(ev.target.value)}
                        isDisabled={isSubmiting}
                        isRequired
                    />
                </>

                <Button 
                type="submit" 
                w="100%" 
                mt='4' 
                colorScheme="blue"
                isDisabled={isSubmiting}
                >
                    {isSubmiting ? <Spinner /> : "Enviar"}
                </Button>
            </FormControl>
        </Flex>
    )
}