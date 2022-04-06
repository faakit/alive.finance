import type { NextPage } from 'next'
import { Flex } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { WalletInfoCard } from '../components/WalletInfoCard';

const Home: NextPage = () => {
  return (
    <Flex w={"80%"} margin="0 auto" direction="column">
            <Header />
            
            <Flex justifyContent="space-between" gap="16" pt="12">
                <WalletInfoCard title="Aporte" value={3000}/>
                <WalletInfoCard title="aporte" value={3000}/>
                <WalletInfoCard title="aporte" value={3000} color="green"/>
            </Flex>
    </Flex>
  )
}

export default Home
