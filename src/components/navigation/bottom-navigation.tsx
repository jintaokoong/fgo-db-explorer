import styled from 'styled-components'
import NavigationItem from 'components/navigation/navigation-item'
import { IoHome, IoPerson, IoInformation } from 'react-icons/io5';

const SBottomNavigation = styled.footer`
  display: flex;
  flex-direction: row;
  
  position: absolute;
  height: 50px;
  width: 100%;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  z-index: 100;
`

const BottomNavigation = () => {
  return <SBottomNavigation>
    <NavigationItem label={'About'} icon={<IoInformation size={'1.1rem'} />} />
    <NavigationItem active label={'Home'} icon={<IoHome size={'1.1rem'} />} />
    <NavigationItem label={'Account'} icon={<IoPerson size={'1.1rem'} />} />
  </SBottomNavigation>
}

export default BottomNavigation;
