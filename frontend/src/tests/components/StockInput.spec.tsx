import { render } from '@testing-library/react'
import { StockInput } from '../../components/StockInput'

describe('StockInput Component', () => {
    it('Should have the input with "adicionar ação" placeholder.', () => {
        async function handleSubmit(stock: any){
            return;
        }
        const { getByPlaceholderText } = render(
            <StockInput handleSubmit={handleSubmit}/>
        )

        expect(getByPlaceholderText('Adicionar ação')).toBeInTheDocument();
    })
})