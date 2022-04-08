import {render} from '@testing-library/react'
import Dashboard from '../../pages/dashboard';

import { useDashboardStocks } from '../../services/hooks/useDashboardStocks'
jest.mock('../../services/hooks/useDashboardStocks');

const mockedUseDashboardStocksHook = useDashboardStocks as jest.Mock;

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/dashboard'
            }
        }
    }
})

describe('Dashboard Page', () => {
    beforeEach(() => {
        mockedUseDashboardStocksHook.mockReturnValue({
            stocks: [
                {
                    name: "GOOGL",
                    lastPrice: 2717.77,
                    pricedAt: "06 de abril de 2022"
                },
                {
                    name: "AAPL",
                    lastPrice: 172.14,
                    pricedAt: "06 de abril de 2022"
                }
            ]
        })
    })

    it('Should be able to render the stocks', () => {
        const { getByText } = render(<Dashboard />)

        expect(getByText("AAPL")).toBeInTheDocument();
        expect(getByText("GOOGL")).toBeInTheDocument();
        expect(getByText("Ultimo preço: $ 2717.77")).toBeInTheDocument();
    })
})