import { Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import React from "react"
import { DashboardStock } from "../components/DashboardStock"
import { Header } from "../components/Header"
import { StockInput } from "../components/StockInput"

const Dashboard: NextPage = () => {
    function handleSubmit(stock: string) {
        console.log(stock);
    }

    return (
        <Flex w={"80%"} margin="0 auto" direction="column">
            <Header />

            <StockInput mt='2rem' handleSubmit={(stock) => handleSubmit(stock)}/>

            <Flex wrap="wrap" gap={6} mt="2rem" justifyContent="start">
                <DashboardStock title={"GOOGL"}/>
                <DashboardStock title={"GOOGL"}/>
                <DashboardStock title={"GOOGL"}/>
            </Flex>
        </Flex>
    )
}

export default Dashboard