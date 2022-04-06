import { Box, Divider, Text, TypographyProps } from '@chakra-ui/react';

interface WalletInfoCardProps {
    title: string;
    value: number;
    fontWeight?: TypographyProps["fontWeight"];
    color?: 'green' | 'red' | 'gray';
}

export function WalletInfoCard({
    title,
    value,
    fontWeight = 'thin',
    color = 'gray'
}: WalletInfoCardProps) {
    const colors: {[key: string]:string} = {
        'gray': 'gray.300',
        'red': 'red.300',
        'green': 'green.300'
    }

    return (
        <Box bg={colors[color]} borderRadius="md" flex={1}>
            <Text
                fontSize="3xl"
                fontWeight="thin"
                pl='8'
                pt='4'
            >
                Aporte
            </Text>
            <Divider color="white" />
            <Text fontSize="xl" pl='8' py='4'>
                $ 5000,00
            </Text>
        </Box>
    )
}