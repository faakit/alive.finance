import { Alert, AlertDescription, AlertIcon, Box } from "@chakra-ui/react";

interface ErrorMessageProps {
    error: string;
}

export function ErrorMessage({error}: ErrorMessageProps) {
    return (
        <Box my={4}>
            <Alert status="error" borderRadius={4} bgColor="red.200">
                <AlertIcon />
                <AlertDescription color="white">{error}</AlertDescription>
            </Alert>
        </Box>
    )
}