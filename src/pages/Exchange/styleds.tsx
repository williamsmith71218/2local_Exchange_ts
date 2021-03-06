import { Button, CardBody, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'

export const Layout = styled.div`
  text-align: left;
  width: 100%;
  margin: 5px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 10px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin: 15px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 20px;
  }
`

export const LayoutTokenDescription = styled.div`
  display: flex;
`

export const Description = styled(Text)`
  font: normal normal 1000 28px/30px Swis721 BT;
  display: flex;
`

export const DetailDescription = styled(Text)`
  font: normal normal bold 16px/16px Swis721 BT;
  display: flex;
  margin-top: 10px;
`

export const Percent = styled(Text)`
  margin-top: -5px;
  margin-left: 5px;
  font: Swis721 BT;
`

export const ContractAddress = styled(Text)`
  font: normal normal bold 16px/30px Swis721 BT;
  letter-spacing: 0.18px;
  opacity: 0.36;
  margin-right: 30px;
  margin-top: 10px;
`

export const PriceArea = styled.div`
  margin-top: 5px;
  margin-left: 10px;
  display: flex;
  font-size: 20px;
`

export const IconWrapper = styled.div<{ size?: number }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? `${size}px` : '32px')};
    width: ${({ size }) => (size ? `${size}px` : '32px')};
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: flex-end;
  }
`

export const TickArea = styled.div`
  display: flex;
  width: 1200px;
  margin-left: 50px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 400px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 550px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 800px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 1200px;
  }
`

export const Tick = styled(Text)`
  font: normal normal bold 12px/6px Swis721 BT;
  font-weight: 600;
  width: 20%;
  margin-left: 15px;
  opacity: .7;
`