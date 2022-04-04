import { Text } from "@chakra-ui/react"

export function Logo() {
    return (
        <Text fontWeight="semibold" fontSize="2rem" color="gray.300">
            Alive
            <Text as="span" color="red.700">.</Text>
            FINANCE
            <Text as="span" color="blue.400">$</Text>
        </Text>
    )
}