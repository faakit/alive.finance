import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../api";

interface Stock {
    name: string;
    lastPrice: number;
    pricedAt: string;
}

interface DashboardStocksProviderProps {
    children: ReactNode;
}

interface DashboardStocksContextData {
    stocks: Stock[];
    getStock: (stock: string) => Promise<void>;
    deleteStock: (stock: string) => void;
}

const DashboardStocksContext = createContext<DashboardStocksContextData>({} as DashboardStocksContextData);

export function DashboardStocksProvider({ children }: DashboardStocksProviderProps) {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const toast = useToast();

    useEffect(() => {
        const localData = localStorage.getItem('@alive.finances');
        if (!!localData) {
            setStocks(JSON.parse(localData));
        }
    }, [])

    async function getStock(stock: string) {
        try {
            const alreadyExists = stocks.find((x) =>
                x.name.toLowerCase() === stock.toLowerCase()
            );

            if (!!alreadyExists) {
                toast({
                    title: 'Ocorreu um erro.',
                    description: 'Esse investimento já está listado!',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                return;
            }

            const { data }: { data: Stock } = await api.get(`/stock/${stock.toLowerCase()}/quote`);

            const parsedData = {
                name: data.name,
                lastPrice: data.lastPrice,
                pricedAt: new Date(data.pricedAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })
            }

            setStocks([...stocks, parsedData]);
            localStorage.setItem("@alive.finances", JSON.stringify([...stocks, parsedData]));
        } catch (error: AxiosError | any) {
            toast({
                title: 'Ocorreu um erro.',
                description: 'Tente com outro nome ou tente novamente mais tarde!',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    function deleteStock(stock: string) {
        const newStocks = stocks.filter(item => item.name !== stock);
        setStocks(newStocks);
        localStorage.setItem("@alive.finances", JSON.stringify(newStocks));
    }

    return (
        <DashboardStocksContext.Provider value={{ stocks, getStock, deleteStock }}>
            {children}
        </DashboardStocksContext.Provider>
    )
}

export function useDashboardStocks() {
    const context = useContext(DashboardStocksContext);

    return context;
}