import { Box, Flex } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const options: ApexOptions = {
    series: [{
        name: 'Aporte',
        data: [44, 55, 41, 67, 22],
    }, {
        name: 'Perda',
        data: [13, 23, 20, 8, 13]
    }, {
        name: 'Ganho',
        data: [11, 17, 15, 15, 21]
    }],
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 280
            },
            legend: {
                position: 'bottom'
            }
        }
    }],
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
            show: true
        },
        zoom: {
            enabled: true
        }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 10
        },
    },
    xaxis: {
        type: 'category',
        categories: ['AAPL', 'GOOGL', 'AA', 'AE', 'WW'],
    },
    legend: {
        show: false
    },
    fill: {
        opacity: 1,
        colors: ['#4299e1', '#E53E3E', '#68D391']
    }
}

interface ColumnChartProps {
    width: number;
}

export function ColumnChart() {
    return (
        <Flex bg='gray.300' borderRadius='4' justifyContent="center">
            <Chart options={options} series={options.series} xaxis={options.xaxis} type='bar' width={400}/>
        </Flex>
    )
}