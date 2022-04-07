import { Box, Flex } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { useSimulation } from '../../services/hooks/useSimulation';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const options: ApexOptions = {
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
    const { stocks } = useSimulation();

    const xaxis: ApexXAxis = {
        type: 'category',
        categories: []
    }
    
    const series: ApexAxisChartSeries = [
        {
            name: 'Aporte',
            data: [],
        }, {
            name: 'Perda',
            data: []
        }, {
            name: 'Ganho',
            data: []
        }];

    stocks.map((stock) => {
        const paid = Number((Number(stock.priceAtDate) * Number(stock.purchasedAmount)).toFixed(2));
        const returned = Number(stock.capitalGains.toFixed(2));
        series[0].data.push(paid as any);
        if (returned > 0) {
            series[2].data.push(returned as any);
            series[1].data.push(0 as any);
        } else {
            series[2].data.push(0 as any);
            series[1].data.push(returned as any);
        }
        xaxis.categories.push(stock.name);
    })

    const chartOptions: ApexOptions = {
        ...options,
        xaxis,
        series
    }


    return (
        <Flex bg='gray.300' borderRadius='4' justifyContent="center">
            <Chart options={chartOptions} series={series} xaxis={xaxis} type='bar' width={400} />
        </Flex>
    )
}