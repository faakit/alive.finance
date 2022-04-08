import { renderHook, act } from '@testing-library/react-hooks';
import AxiosMock from 'axios-mock-adapter';

import { api } from '../../services/api';
import { SimulationProvider, useSimulation } from '../../services/hooks/useSimulation';

const apiMock = new AxiosMock(api);

const mockedSetItemLocalStorage = jest.spyOn(Storage.prototype, 'setItem');
const initialStoragedData = [
    {
        name: "googl",
        lastPrice: 2730.96,
        priceAtDate: 2832.14,
        purchasedAmount: 5,
        purchasedAt: "19 de dezembro de 2021",
        capitalGains: -505.89999999999964
    }
]

describe('useSimulation Hook', () => {
    beforeEach(() => {
        apiMock.reset();

        jest.spyOn(Storage.prototype, 'getItem')
            .mockReturnValueOnce(JSON.stringify(initialStoragedData));
    });

    it('Should be able to start with localStorage stocks', () => {
        const { result } = renderHook(useSimulation, {
            wrapper: SimulationProvider,
        });

        expect(result.current.stocks).toEqual(
            expect.arrayContaining([
                {
                    name: "googl",
                    lastPrice: 2730.96,
                    priceAtDate: 2832.14,
                    purchasedAmount: 5,
                    purchasedAt: "19 de dezembro de 2021",
                    capitalGains: -505.89999999999964
                }
            ])
        )
    });

    it('Should be able to add a new stock', async () => {
        const stock = "aa";
        const purchasedAt = "2022-01-03";
        const purchasedAmount = '100'

        apiMock.onGet(`/stocks/${stock.toLowerCase()}/gains`,
            {
                params: {
                    purchasedAt,
                    purchasedAmount
                }
            }).reply(200, {
                name: "aapl",
                lastPrice: 174.31,
                priceAtDate: 182.01,
                purchasedAmount: 100,
                purchasedAt: "2022-01-03",
                capitalGains: -770
            });

        const { result, waitForNextUpdate } = renderHook(useSimulation, {
            wrapper: SimulationProvider
        });

        act(() => {
            result.current.getStock(stock, purchasedAt, purchasedAmount)
        });

        await waitForNextUpdate({ timeout: 200 });

        expect(result.current.stocks).toEqual(
            expect.arrayContaining([
                {
                    name: "googl",
                    lastPrice: 2730.96,
                    priceAtDate: 2832.14,
                    purchasedAmount: 5,
                    purchasedAt: "19 de dezembro de 2021",
                    capitalGains: -505.89999999999964
                },
                {
                    name: "aapl",
                    lastPrice: 174.31,
                    priceAtDate: 182.01,
                    purchasedAmount: 100,
                    purchasedAt: "02 de janeiro de 2022",
                    capitalGains: -770
                }
            ])
        );
        expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
            '@alive.finances:simulation',
            JSON.stringify(result.current.stocks)
        )
    })

    it('Should not be able to add a stock who does not exists', async () => {
        const stock = "aazzzz";
        const purchasedAt = "2022-01-03";
        const purchasedAmount = '100'

        apiMock.onGet(`/stocks/${stock.toLowerCase()}/gains`,
            {
                params: {
                    purchasedAt,
                    purchasedAmount
                }
            }).reply(404);

        const { result, waitFor } = renderHook(useSimulation, {
            wrapper: SimulationProvider
        });

        act(() => {
            result.current.getStock(stock, purchasedAt, purchasedAmount)
        });

        expect(result.current.stocks).toEqual(
            expect.arrayContaining([
                {
                    name: "googl",
                    lastPrice: 2730.96,
                    priceAtDate: 2832.14,
                    purchasedAmount: 5,
                    purchasedAt: "19 de dezembro de 2021",
                    capitalGains: -505.89999999999964
                }])
        )
    });

    it('Should be able to retrieve general data', () => {
        const { result } = renderHook(useSimulation, {
            wrapper: SimulationProvider
        })

        expect(result.current.generalData).toEqual(
            {
                investment: 14160.7,
                capitalGains: -505.9,
                total: 13654.8
            })
    });

    it('Should be able to delete an existing stock', () => {
        const { result } = renderHook(useSimulation, {
            wrapper: SimulationProvider
        });

        act(() => {
            result.current.deleteStock('googl')
        });

        expect(result.current.generalData).toEqual(
            {
                investment: 0,
                capitalGains: 0,
                total: 0
            }
        )
    })
})