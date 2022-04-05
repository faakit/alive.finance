import { Flex, Grid, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { NextPage } from "next"
import { RiAddFill } from "react-icons/ri"
import { DashboardStock } from "../components/DashboardStock"
import { Header } from "../components/Header"

const Dashboard: NextPage = () => {
    return (
        <Flex w={"80%"} margin="0 auto" direction="column">
            <Header />

            <InputGroup
                mt="2rem"
                bg="gray.300"
                borderRadius="md"
            >
                <InputLeftElement
                    pointerEvents='none'
                    h="3rem"
                >
                    <Icon as={RiAddFill} fontSize="1.5rem" />
                </InputLeftElement>
                <Input placeholder='Adicionar ação' h="3rem" fontSize="1.5rem" />
            </InputGroup>

            <Flex wrap="wrap" gap={6} mt="2rem" justifyContent="start">
                <DashboardStock title={"GOOGL"}/>
                <DashboardStock title={"GOOGL"}/>
                <DashboardStock title={"GOOGL"}/>
            </Flex>
        </Flex>
    )
}

export default Dashboard