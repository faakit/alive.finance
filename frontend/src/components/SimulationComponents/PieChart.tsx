import { Flex } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const options: ApexOptions = {
    chart: {
        width: 500,
        type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
    }]
}

const series = [44, 55, 13, 43, 22];

export function PieChart() {
    return (
        <Flex bg='gray.300' borderRadius='4' justifyContent='center'>
            <Chart options={options} series={series} type='pie' width={400} />
        </Flex>
    )
}