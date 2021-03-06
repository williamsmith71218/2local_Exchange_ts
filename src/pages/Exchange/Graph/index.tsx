import React, { useCallback, useContext, useEffect, useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Button, CardBody, Text } from '@pancakeswap-libs/uikit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { SwapRow } from 'components/Row'
import { ChartArea, Price } from './styleds'
import useInterval from '../../../hooks/useInterval'
import { L2L, CAKE, UNI, BTCB, ETH } from '../../../constants'
import { DetailDescription, Percent, PriceArea, ContractAddress, Tick, TickArea } from '../styleds'

interface GraphProps {
  coin: string
  token: string
}

interface PriceDataProps {
  date: string | undefined
  price_2lc: string | undefined
  price_eth: string | undefined
  price_cake: string | undefined
  price_uni: string | undefined
  price_btcb: string | undefined
}

function Graph({ coin, token } : GraphProps) {

  const [during, setDuring] = useState(0)
  const [priceData, setPriceData] = useState<PriceDataProps[]>([])
  const [price, setPrice] = useState(0)
  const [percent, setPercent] = useState(0)
  const [increase, setIncrease] = useState(true)
  const [infoColor, setInfoColor] = useState('#56e19f')
  const [currentTokenAddress, setCurrentTokenAddress] = useState('0x11f6ecc9e2658627e0876212f1078b9f84d3196e')
  const [chartKey, setChartKey] = useState('price_2lc')
  const [priceChange, setPriceChange] = useState(true)
  const [domain, setDomain] = useState([0.00019, 0.00024])
  const [volumn, setVolumn] = useState(0)
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    if (width > 400) {
      setScreenWidth(380)
    }
    if (width > 600) {
      setScreenWidth(520)
    }
    if (width > 800) {
      setScreenWidth(780)
    }
    if (width > 1200) {
      setScreenWidth(1120)
    }
  }, [setScreenWidth])

  useEffect(() => {
    let tokenAddress = ''

    fetch('https://exchangeapi.2local.io/exchange/priceData')
      .then((response) => response.json())
      .then((responseData) => {
        setPriceData(responseData)
      })

    switch(token) {
      case '2LC':
         tokenAddress = L2L.address
         setChartKey('price_2lc')
         setDomain([0.00019, 0.00024])
         break
      case 'ETH':
        tokenAddress =  ETH.address
        const data: PriceDataProps = priceData[priceData.length - 1]
        setChartKey('price_eth')
        setDomain([3900, 4700])
        break
      case 'CAKE':
        tokenAddress =  CAKE.address
        setChartKey('price_cake')
        setDomain([12, 17])
        break
      case 'UNI':
        tokenAddress =  UNI.address
        setChartKey('price_uni')
        setDomain([18, 23])
        break
      case 'BTCB':
        tokenAddress =  BTCB.address
        setChartKey('price_btcb')
        setDomain([55000, 61000])
        break
    }
    setCurrentTokenAddress(tokenAddress)
  }, [ token, priceData ])

  useEffect(() => {
      let tokenString = token
      if (token === 'BTCB') tokenString = 'BTC'
      const percentUrl = 'https://www.bitrue.com/api/v1/ticker/24hr?symbol='.concat(tokenString).concat('USDT')
      fetch(percentUrl)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          const data24h = responseData[0]
          if (data24h) {
            const volumn24h = Number(data24h.volume)
            setVolumn(volumn24h)
            setPrice(data24h.lastPrice)
            setPercent(Math.abs(data24h.priceChange))
            if (data24h.priceChange > 0) {
              setIncrease(true)
              setInfoColor('#56e19f')
            } else {
              setIncrease(false)
              setInfoColor('#e15656')
            }
            setPriceChange(false)
          }
        }
      })
  }, [ token, priceChange ])

  const updatePriceChangeCallback = useCallback(() => {
    if (!priceChange) {
      setPriceChange(true)
    }
  }, [ priceChange, setPriceChange ])

  useInterval(updatePriceChangeCallback, 60000)

  const EpochToDate = (date: string) => {
    const time = date.toString()
    const tick = ' '.concat(time.substring(0, 10)).concat('     ')
    return tick
  }

  const GetDate = (index: number) => {
    const date = new Date()
    date.setDate(date.getDate() - index)
    return date.toString().substring(4, 10)
  }

  const DataFormater = (data: string) => {
    return data
  }

  return (
    <ChartArea>
      <SwapRow justify="space-between">
        <DetailDescription>
          <Text fontSize="18px">1 {token} : {price} USD, &nbsp;</Text>
          {/* <Text fontSize="18px">V24h: ${volumn.toLocaleString(undefined, { maximumFractionDigits: 0 })} &nbsp;</Text> */}
          <PriceArea>
            <FontAwesomeIcon icon={increase ? faArrowUp : faArrowDown} color={infoColor} />
            <Percent fontSize="18px" color={infoColor}>
              {percent}%
            </Percent>
          </PriceArea>
        </DetailDescription>
        <ContractAddress>{currentTokenAddress}</ContractAddress>
      </SwapRow>
      <Price>Price (USD)</Price>
      <AreaChart width={screenWidth} height={200} data={priceData}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#43A3DE" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#43A3DE" stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis fontSize="12px" tickFormatter={DataFormater} axisLine={false} tickLine={false} domain={domain} />
        <Area type="monotone" dataKey={chartKey} stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart> 
      <TickArea>
        <Tick>{GetDate(6)}</Tick>
        <Tick>{GetDate(5)}</Tick>
        <Tick>{GetDate(4)}</Tick>
        <Tick>{GetDate(3)}</Tick>
        <Tick>{GetDate(2)}</Tick>
        <Tick>{GetDate(1)}</Tick>
        <Tick>{GetDate(0)}</Tick>
      </TickArea>
    </ChartArea>
  )
}

export default Graph
