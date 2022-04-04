import { Logo } from '../components/Logo';

import type { NextPage } from 'next'
import { Flex } from '@chakra-ui/react';
import { LoginForm } from '../components/LoginForm';

const Home: NextPage = () => {
  return (
    <Flex align="center" justify="center" h="100vh" direction="column">
      <Logo />

      <LoginForm />
    </Flex>
  )
}

export default Home
