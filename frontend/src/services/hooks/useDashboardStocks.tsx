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
}

const DashboardStocksContext = createContext<DashboardStocksContextData>({} as DashboardStocksContextData);

export function DashboardStocksProvider({ children }: DashboardStocksProviderProps) {
    const [stocks, setStocks] = useState<Stock[]>([]);

    useEffect(() => {
        const localData = localStorage.getItem('@alive.finances');
        if(!!localData) {
            setStocks(JSON.parse(localData));
        }
    }, [])

    async function getStock(stock: string) {
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
    }

    return (
        <DashboardStocksContext.Provider value={{ stocks, getStock }}>
            {children}
        </DashboardStocksContext.Provider>
    )
}

export function useDashboardStocks() {
    const context = useContext(DashboardStocksContext);

    return context;
}