import styled from 'styled-components'
import { HTMLAttributes, ReactNode } from 'react'

interface NavItemProp extends HTMLAttributes<HTMLDivElement>{
  active?: boolean;
}

const SNavigationItem = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props: NavItemProp) => props.active ? '#C02EEB' : 'gray'};
`

const Label = styled.div`
  font-size: 0.7rem;
  font-family: "Droid Sans", serif;
`

interface Props {
  label: string;
  icon: ReactNode;
  active?: boolean;
}

const NavigationItem = (props: Props) => {
  return <SNavigationItem active={props.active}>
    <div>{props.icon}</div>
    <Label>{props.label}</Label>
  </SNavigationItem>
}

export default NavigationItem;
