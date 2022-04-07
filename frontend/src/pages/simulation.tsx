import type { NextPage } from 'next'
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { WalletInfoCard } from '../components/SimulationComponents/WalletInfoCard';
import { ColumnChart } from '../components/SimulationComponents/ColumnChart';
import { PieChart } from '../components/SimulationComponents/PieChart';


const Home: NextPage = () => {
  const isWide = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <Flex w={"80%"} margin="0 auto" direction="column">
            <Header />
            
            <Flex justifyContent="space-between" gap={["6", "8","16"]} pt="12" direction={['column', 'row']}>
                <WalletInfoCard title="Aporte" value={3000}/>
                <WalletInfoCard title="aporte" value={3000}/>
                <WalletInfoCard title="aporte" value={3000} color="green"/>
            </Flex>

            <Flex mt='8' justifyContent="space-evenly" direction={['column','column','row']}>
                <ColumnChart />
                <PieChart />
            </Flex>
    </Flex>
  )
}

export default Home
