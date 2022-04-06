import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { api } from "../../services/api";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface HistoricModalProps {
  name: string;
}

interface ResponseProps {
  prices: {
    opening: string,
    low: string,
    high: string,
    closing: string,
    pricedAt: string
  }[]
}

const options: ApexOptions = {
  chart: {
    type: 'candlestick',
    height: 350
  },
  title: {
    text: 'Gráfico de velas',
    align: 'left'
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis: {
    tooltip: {
      enabled: true
    },
  }
}

export function HistoricModal({ name }: HistoricModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [series, setSeries] = useState<ApexAxisChartSeries>();
  const toast = useToast();

  function formatData(data: string) {
    const dataArray = data.split('-');
    return `${dataArray[1]}-${dataArray[2]}-${dataArray[0]}`
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setIsSubmiting(true);
    const msToDate = new Date(toDate).getTime();
    const msFromDate = new Date(fromDate).getTime();

    if (msFromDate > msToDate || msFromDate > new Date().getTime() || !fromDate || !toDate) {
      toast({
        title: 'Ocorreu um erro.',
        description: 'Incoerência de datas',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      setIsSubmiting(false);
      return;
    }

    try {
      const { data }: { data: ResponseProps } = await api.get(`/stocks/${name.toLowerCase()}/history`, {
        params: {
          from: formatData(fromDate),
          to: formatData(toDate)
        }
      });

      const dataSeries: ApexAxisChartSeries = [{
        data: data.prices.reverse().map((date) => ({
          x: date.pricedAt,
          y: [date.opening, date.high, date.low, date.closing]
        }))}]


      setSeries(dataSeries);
    }
    catch (error) {
      console.log(error);
      toast({
        title: 'Ocorreu um erro.',
        description: 'Ops, ocorreu algum erro',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    setIsSubmiting(false);
  }

  return (
    <>
      <Button onClick={onOpen} variant="link" color="gray.700">Histórico</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={!series}>
        <ModalOverlay backdropFilter="blur(3px)" />
        <ModalContent>
          <ModalHeader>Historico: {name}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Box as="form" mb="4" onSubmit={handleSubmit} >
              <Flex direction="column">
                <Text>De</Text>
                <Input type="date" onChange={(ev) => setFromDate(ev.target.value)} />
              </Flex>
              <Flex direction="column">
                <Text>Até</Text>
                <Input type="date" onChange={(ev) => setToDate(ev.target.value)} />
              </Flex>
              <Button 
              type="submit" 
              w="100%" 
              colorScheme="blue" 
              disabled={isSubmiting}>
                {isSubmiting ? <Spinner /> : "Ir"}
              </Button>
            </Box>
            {!!series && <Chart options={options} series={series} type="candlestick" />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}