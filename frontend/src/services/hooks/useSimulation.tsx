import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../api";

interface Stock {
    name: string;
    lastPrice: number;
    priceAtDate: string;
    purchasedAmount: number,
    purchasedAt: string,
    capitalGains: number
}

interface GeneralData {
    investment: number;
    capitalGains: number;
    total: number;
}

interface SimulationProviderProps {
    children: ReactNode;
}

interface SimulationContextData {
    generalData: GeneralData;
    stocks: Stock[];
    getStock: (
        stock: string,
        purchasedAt: string,
        purchasedAmount: string
    ) => Promise<void>;
    deleteStock: (stock: string) => void;
}

const SimulationContext = createContext<SimulationContextData>({} as SimulationContextData);

export function SimulationProvider({ children }: SimulationProviderProps) {
    const toast = useToast();
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [generalData, setGeneralData] = useState<GeneralData>({
        investment: 0,
        capitalGains: 0,
        total: 0
    });

    useEffect(() => {
        const localData = localStorage.getItem('@alive.finances:simulation');
        if (!!localData) {
            setStocks(JSON.parse(localData));
        }
    }, [])

    useEffect(() => {
        const data = stocks.reduce<GeneralData>((data, stock) => {
            const invested = Number(stock.priceAtDate) * stock.purchasedAmount;
            const gains = stock.capitalGains;
            return {
                investment: Number((data.investment + invested).toFixed(2)),
                capitalGains: Number((data.capitalGains + gains).toFixed(2)),
                total: Number((data.total + gains + invested).toFixed(2)),
            }
        }, { investment: 0, capitalGains: 0, total: 0 });

        setGeneralData(data);
    }, [stocks])

    async function getStock(
        stock: string,
        purchasedAt: string,
        purchasedAmount: string
    ) {
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

            const { data }: { data: Stock } = await api.get(`/stocks/${stock.toLowerCase()}/gains`,
                {
                    params: {
                        purchasedAt,
                        purchasedAmount
                    }
                });

            const parsedData: Stock = {
                name: data.name,
                lastPrice: data.lastPrice,
                priceAtDate: data.priceAtDate,
                purchasedAmount: data.purchasedAmount,
                purchasedAt: new Date(data.purchasedAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                }),
                capitalGains: data.capitalGains
            }

            setStocks([...stocks, parsedData]);
            localStorage.setItem("@alive.finances:simulation", JSON.stringify([...stocks, parsedData]));
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
        localStorage.setItem("@alive.finances:simulation", JSON.stringify(newStocks));
    }

    return (
        <SimulationContext.Provider value={{ stocks, getStock, deleteStock, generalData }}>
            {children}
        </SimulationContext.Provider>
    )
}

export function useSimulation() {
    const context = useContext(SimulationContext);

    return context;
}