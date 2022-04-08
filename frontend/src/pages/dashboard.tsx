import React from "react"
import { NextPage } from "next"

import { Flex } from "@chakra-ui/react"

import { DashboardStock } from "../components/DashboardStock"
import { Header } from "../components/Header"
import { StockInput } from "../components/StockInput"
import { useDashboardStocks } from "../services/hooks/useDashboardStocks"

export default function Dashboard() {
    const { getStock, stocks, deleteStock } = useDashboardStocks();

    async function handleSubmit(stock: string) {
        await getStock(stock);
    }

    function handleDeleteStock(stock: string){
        deleteStock(stock);
    }

    return (
        <Flex w={"80%"} margin="0 auto" direction="column">
            <Header />

            <StockInput mt='2rem' handleSubmit={(stock) => handleSubmit(stock)} />

            <Flex wrap="wrap" gap={6} mt="2rem" justifyContent="start">
                {stocks.map((stock) => (
                    <DashboardStock 
                    key={stock.name} 
                    name={stock.name} 
                    lastPrice={stock.lastPrice} 
                    pricedAt={stock.pricedAt} 
                    deleteStock={(name) => handleDeleteStock(name)}
                    />
                ))}
            </Flex>
        </Flex>
    )
}