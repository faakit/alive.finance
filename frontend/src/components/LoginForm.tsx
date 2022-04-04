import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri';

import { Button, Flex, Stack, Input, InputGroup, InputRightElement, Icon, FormControl } from '@chakra-ui/react';

import { FormEventHandler, useState } from 'react';
import Router from 'next/router';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn: FormEventHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log(email, password);
        Router.push('/dashboard');
    }

    return (
        <Flex
            as="form"
            w="100%"
            maxW={360}
            bg="gray.300"
            p="8"
            borderRadius={8}
            flexDir="column"
            onSubmit={handleSignIn}
        >
            <Stack spacing="4">
                <FormControl isRequired>
                    <Input
                        variant="flushed"
                        placeholder='E-mail'
                        color="black"
                        type="email"
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                </FormControl>
                <InputGroup>
                    <Input
                        variant="flushed"
                        type={show ? 'text' : 'password'}
                        placeholder='Senha'
                        onChange={(ev) => setPassword(ev.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                            {show ?
                                <Icon as={RiEyeFill} />
                                : <Icon as={RiEyeCloseFill} />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Stack>

            <Button
                type="submit"
                mt="6"
                colorScheme="blue"
                size="lg"
                isLoading={isLoading}
            >
                ENTRAR
            </Button>
        </Flex>
    )
}