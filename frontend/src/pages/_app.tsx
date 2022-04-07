import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../styles/theme';

import { DashboardStocksProvider } from '../services/hooks/useDashboardStocks';
import { SimulationProvider } from '../services/hooks/useSimulation';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DashboardStocksProvider>
        <SimulationProvider>
          <Component {...pageProps} />
        </SimulationProvider>
      </DashboardStocksProvider>
    </ChakraProvider>
  )
}

export default MyApp
