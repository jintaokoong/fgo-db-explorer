import styled from 'styled-components';
import NavigationItem from 'components/navigation/navigation-item';
import { IoPeople, IoStar } from 'react-icons/io5';
import Routes from 'constants/routes';
import Colors from 'constants/colors';
import { useContext } from 'react';
import { ThemeContext } from 'contexts/theme-context';

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

  background-color: ${(props) =>
    props.theme === 'dark'
      ? Colors.background.darker
      : Colors.background.light};
`;

const BottomNavigation = () => {
  const { mode } = useContext(ThemeContext);
  return (
    <SBottomNavigation theme={mode}>
      <NavigationItem
        label={'Servants'}
        route={Routes.servants}
        icon={<IoPeople size={'1.1rem'} />}
      />
      <NavigationItem
        label={'Favorites'}
        route={Routes.favorites}
        icon={<IoStar size={'1.1rem'} />}
      />
    </SBottomNavigation>
  );
};

export default BottomNavigation;
