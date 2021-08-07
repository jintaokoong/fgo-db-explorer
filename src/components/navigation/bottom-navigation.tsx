import styled from 'styled-components'
import NavigationItem from 'components/navigation/navigation-item'
import { IoHome, IoPerson, } from 'react-icons/io5';
import Routes from 'constants/routes'
import Colors from 'constants/colors'
import { useContext } from 'react'
import { ThemeContext } from 'contexts/theme-context'

const SBottomNavigation = styled.footer`
  display: flex;
  flex-direction: row;
  
  position: absolute;
  height: 50px;
  width: 100%;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  z-index: 100;
  
  background-color: ${props => props.theme === 'dark' ? Colors.background.dark : Colors.background.light};
`

const BottomNavigation = () => {
  const { mode } = useContext(ThemeContext);
  return <SBottomNavigation theme={mode}>
    <NavigationItem label={'Home'} route={Routes.home} icon={<IoHome size={'1.1rem'} />} />
    <NavigationItem label={'Account'} route={Routes.account} icon={<IoPerson size={'1.1rem'} />} />
  </SBottomNavigation>
}

export default BottomNavigation;
