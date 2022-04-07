import type { NextPage } from 'next'
import { Flex } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { WalletInfoCard } from '../components/SimulationComponents/WalletInfoCard';
import { ColumnChart } from '../components/SimulationComponents/ColumnChart';
import { PieChart } from '../components/SimulationComponents/PieChart';
import { SimulationTable } from '../components/SimulationComponents/SimulationTable';
import { useSimulation } from '../services/hooks/useSimulation';


const Home: NextPage = () => {
  const { generalData } = useSimulation();

  return (
    <Flex w={"80%"} margin="0 auto" direction="column">
      <Header />


      <Flex
        justifyContent="space-between"
        gap={["6", "8", "16"]}
        pt="12"
        direction={['column', 'row']}
      >
        <WalletInfoCard title="Aporte" value={generalData.investment} />
        <WalletInfoCard
          title="Retorno"
          value={generalData.capitalGains}
          color={generalData.capitalGains >= 0 ? 'green' : 'red'}
        />
        <WalletInfoCard
          title="Total"
          value={generalData.total}
          color={generalData.capitalGains >= 0 ? 'green' : 'red'}
        />
      </Flex>

     {generalData.investment > 0 && <>
        <Flex
          mt='8'
          justifyContent="center"
          gap="4"
          direction={['column', 'column', 'row']}
        >
          <ColumnChart />
          <PieChart />
        </Flex>
      </>}


      <SimulationTable />
    </Flex>
  )
}

export default Home
