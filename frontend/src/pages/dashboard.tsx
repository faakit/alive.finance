import { Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import { DashboardStock } from "../components/DashboardStock"
import { Header } from "../components/Header"
import { StockInput } from "../components/StockInput"

const Dashboard: NextPage = () => {
    return (
        <Flex w={"80%"} margin="0 auto" direction="column">
            <Header />

            <StockInput mt='2rem' onSubmit={() => alert("Enviado")}/>

            <Flex wrap="wrap" gap={6} mt="2rem" justifyContent="start">
                <DashboardStock title={"GOOGL"}/>
                <DashboardStock title={"GOOGL"}/>
                <DashboardStock title={"GOOGL"}/>
            </Flex>
        </Flex>
    )
}

export default Dashboard