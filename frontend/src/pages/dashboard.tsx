import { Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import { Header } from "../components/Header"

const Dashboard: NextPage = () => {
    return (
        <Flex w={"80%"} margin="0 auto">
            <Header />
        </Flex>
    )
}

export default Dashboard