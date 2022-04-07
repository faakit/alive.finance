import { Flex } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { useSimulation } from '../../services/hooks/useSimulation';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

export function PieChart() {
    const { stocks } = useSimulation();
    
    const labels: string[] = [];
    const series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined = [];

    stocks.map((stock) => {
        const totalPrice = (stock.lastPrice * stock.purchasedAmount).toFixed(2);
        labels.push(stock.name.toUpperCase());
        series.push(Number(totalPrice) as any);
    })
    
    const options: ApexOptions = {
        chart: {
            width: 500,
            type: 'pie',
        },
        labels: labels,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 300
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        series: series
    }

    return (
        <Flex bg='gray.300' borderRadius='4' justifyContent='center'>
            <Chart options={options} series={series} type='pie' width={400} />
        </Flex>
    )
}