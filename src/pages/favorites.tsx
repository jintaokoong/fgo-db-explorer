import { Body } from 'components/shared/body';
import { Fragment, useEffect, useMemo, useState } from 'react';
import BottomNavigation from 'components/navigation/bottom-navigation';
import Header from 'components/header';
import useServants from 'hooks/use-servants';
import Loader from 'components/shared/loader';
import FavoriteServantDto from 'interfaces/dtos/favorite-servant-dto';
import ServantCard from 'components/cards/servant-card';

const FavoritesPage = () => {
  const [fav, setFav] = useState<number[]>([]);
  const { data, isLoading } = useServants();
  const servants = useMemo(() => {
    return data ? data.filter((s) => fav.includes(s.id)) : [];
  }, [data, fav]);

  useEffect(() => {
    const s = localStorage.getItem('favorites');
    const f: FavoriteServantDto[] = s ? JSON.parse(s) : [];
    const favorites = f.map((s) => s.id);
    setFav(favorites);
  }, []);

  return (
    <Fragment>
      <Loader active={isLoading} />
      <Header title={'Favorites'} />
      <Body hasHeader hasFooter>
        {servants.map((s) => (
          <ServantCard key={s.id} servant={s} />
        ))}
      </Body>
      <BottomNavigation />
    </Fragment>
  );
};

export default FavoritesPage;
