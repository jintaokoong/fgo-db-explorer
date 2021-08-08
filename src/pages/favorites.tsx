import { Body } from 'components/shared/body';
import { Fragment } from 'react';
import BottomNavigation from 'components/navigation/bottom-navigation';
import Header from 'components/header';

const FavoritesPage = () => {
  return (
    <Fragment>
      <Header title={'Favorites'} />
      <Body hasHeader hasFooter>
        Favorites
      </Body>
      <BottomNavigation />
    </Fragment>
  );
};

export default FavoritesPage;
