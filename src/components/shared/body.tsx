import styled from 'styled-components'
import Layout from 'constants/layout'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLElement>{
  hasHeader?: boolean;
  hasFooter?: boolean;
}

export const Body = styled.main`
  position: absolute;
  top: ${`calc(${Layout.header.height} + 1px)`};
  height: ${(props: Props) => `calc(100vh - ${props.hasHeader ? '51px' : '0px'} - ${props.hasFooter ? '51px' : '0px'})`};
  width: 100%;
  overflow-y: auto;
`
