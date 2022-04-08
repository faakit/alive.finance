import { renderHook, act } from '@testing-library/react-hooks';
import AxiosMock from 'axios-mock-adapter';

import { api } from '../../services/api';
import { DashboardStocksProvider, useDashboardStocks } from '../../services/hooks/useDashboardStocks';

const apiMock = new AxiosMock(api);

const mockedSetItemLocalStorage = jest.spyOn(Storage.prototype, 'setItem');
const initialStoragedData = [{
    name: "GOOGL",
    lastPrice: 2717.77,
    pricedAt: "06 de abril de 2022"
}]

describe('useDashboardStocks Hook', () => {
    beforeEach(() => {
        apiMock.reset();

        jest.spyOn(Storage.prototype, 'getItem')
            .mockReturnValueOnce(JSON.stringify(initialStoragedData));
    });

    it('Should be able to start with localStorage stocks', () => {
        const { result } = renderHook(useDashboardStocks, {
            wrapper: DashboardStocksProvider,
        });

        expect(result.current.stocks).toEqual(
            expect.arrayContaining([
                {
                    name: "GOOGL",
                    lastPrice: 2717.77,
                    pricedAt: "06 de abril de 2022"
                }]
            )
        )
    });

    it('Should be able to add a new stock', async () => {
        const stock = "aapl";

        apiMock.onGet(`/stock/${stock.toLowerCase()}/quote`).reply(200, {
            name: "AAPL",
            lastPrice: 172.14,
            pricedAt: "2022-04-07"
        });

        const { result, waitForNextUpdate } = renderHook(useDashboardStocks, {
            wrapper: DashboardStocksProvider
        });

        act(() => {
            result.current.getStock(stock)
        });

        await waitForNextUpdate({ timeout: 200 });

        expect(result.current.stocks).toEqual(
            expect.arrayContaining([{
                name: "GOOGL",
                lastPrice: 2717.77,
                pricedAt: "06 de abril de 2022"
            },
            {
                name: "AAPL",
                lastPrice: 172.14,
                pricedAt: "06 de abril de 2022"
            }
            ])
        );
        expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
            '@alive.finances:dashboard',
            JSON.stringify(result.current.stocks)
        )
    })

    it('Should be able to delete an existing stock', () => {
        const { result } = renderHook(useDashboardStocks, {
            wrapper: DashboardStocksProvider
        });

        act(() => {
            result.current.deleteStock('googl')
        });

        expect(result.current.stocks).toEqual(
            expect.arrayContaining([])
        )
    })
})