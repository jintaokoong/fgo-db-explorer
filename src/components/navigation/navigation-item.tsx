import styled from 'styled-components'
import { HTMLAttributes, ReactNode, useCallback, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Colors from 'constants/colors'

interface NavItemProp extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

const SNavigationItem = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props: NavItemProp) => props.active ? Colors.primary : 'gray'};
  cursor: pointer;
`

const Label = styled.div`
  font-size: 0.7rem;
`

interface Props {
  label: string;
  icon: ReactNode;
  route?: string;
}

const NavigationItem = (props: Props) => {
  const { route } = props
  const history = useHistory()
  const location = useLocation()

  const onClick = useCallback(() => {
    history.replace(route ?? '/')
  }, [history, route])

  const active = useMemo(() => {
    const path = location.pathname.split('/')[1]
    return path === route?.replace('/', '') ?? ''
  }, [location.pathname, route])

  return <SNavigationItem active={active} onClick={onClick}>
    <div>{props.icon}</div>
    <Label>{props.label}</Label>
  </SNavigationItem>
}

export default NavigationItem
