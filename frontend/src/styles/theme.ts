import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    fonts: {
        headings: 'Josefin Sans',
        body: 'Josefin Sans'
    },
    styles: {
        global: {
            body: {
                bg: 'gray.700'
            }
        }
    }
})