import useServant from 'hooks/use-servant';
import Header from 'components/header';
import { Body } from 'components/shared/body';
import useIDParam from 'hooks/use-id-param';
import styled from 'styled-components';
import {
  ChangeEvent,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Colors from 'constants/colors';
import { ThemeContext } from 'contexts/theme-context';
import Skeleton from 'react-loading-skeleton';
import ItemAmountDto from 'interfaces/dtos/item-amount-dto';
import MaterialsSection from 'components/sections/materials-section';
import SkillInput from 'components/forms/skill-input';
import { IoStar, IoSync, IoTrash } from 'react-icons/io5';
import useRequiredMaterials from 'hooks/use-required-materials';
import FavoriteServantDto from 'interfaces/dtos/favorite-servant-dto';
import Visible from 'components/shared/visible';

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Image = styled.img`
  border-radius: 5px;
`;

const InfoContainer = styled.div`
  margin: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.button`
  display: inline-flex;
  justify-content: center;

  width: 100%;
  padding: 9px;
  border: 2px solid rgba(0, 0, 0, 0);
  border-radius: 5px;
  background-color: ${Colors.primary};
  color: #ffffff;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: bold;
  :hover {
    background-color: ${Colors.primaryHover};
  }
  :active {
    background-color: ${Colors.primary};
  }
`;

const RemoveButton = styled(Button)`
  margin-top: 10px;
  background-color: ${Colors.danger};
  :hover {
    background-color: ${Colors.dangerHover};
  }
  :active {
    background-color: ${Colors.danger};
  }
`;

const INITIAL_SKILL_STATE = {
  first: '1',
  second: '1',
  third: '1',
};

export const ServantDetailsPage = () => {
  const id = useIDParam();
  const { mode } = useContext(ThemeContext);
  const [state, setState] = useState(INITIAL_SKILL_STATE);
  const [isFavorite, setIsFavorite] = useState(false);
  const { data } = useServant(id);

  const materials: ItemAmountDto[] = useRequiredMaterials(
    state,
    data?.skillMaterials
  );

  const setSkill = useCallback(
    (skill: 'first' | 'second' | 'third') =>
      (e: ChangeEvent<HTMLInputElement>) => {
        setState((s) => ({
          ...s,
          [skill]: e.target.value,
        }));
      },
    [setState]
  );

  useEffect(() => {
    const s = localStorage.getItem('favorites');
    const fav: FavoriteServantDto[] = s ? JSON.parse(s) : [];
    const idx = fav.findIndex((s) => s.id === data?.id);
    if (idx >= 0) {
      setIsFavorite(true);
      const s = fav[idx];
      setState({
        first: s.skills.first.toString(),
        second: s.skills.second.toString(),
        third: s.skills.third.toString(),
      });
    }
  }, [data]);

  const saveOnClick = useCallback(() => {
    if (!data) {
      return;
    }
    const s = localStorage.getItem('favorites');
    const currentFavorites: FavoriteServantDto[] = s ? JSON.parse(s) : [];
    const favorites = currentFavorites
      .filter((v) => v.id !== data.id)
      .sort((a, b) => (a.id < b.id ? -1 : 1));
    const payload = {
      id: data.id,
      skills: {
        ...state,
      },
    };
    localStorage.setItem('favorites', JSON.stringify([...favorites, payload]));
    setIsFavorite(true);
  }, [data, state]);

  const removeOnClick = useCallback(() => {
    if (!data) {
      return;
    }

    const s = localStorage.getItem('favorites');
    const current: FavoriteServantDto[] = s ? JSON.parse(s) : [];
    const favorites = current.filter((s) => s.id !== data.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(false);
  }, [data]);

  return (
    <div>
      <Header title={data?.name ?? ''} allowReturn />
      <Body hasHeader>
        <ImageContainer>
          {!data?.extraAssets.charaGraph?.ascension![3] ? (
            <Skeleton
              style={{ width: 'calc(25vh / 1.4140625)', height: '25vh' }}
            />
          ) : (
            <Image
              style={{ height: '25vh' }}
              src={data.extraAssets.charaGraph.ascension![3]}
            />
          )}
        </ImageContainer>
        <InfoContainer>
          <InputContainer>
            <SkillInput value={state.first} onChange={setSkill('first')} />
            <SkillInput value={state.second} onChange={setSkill('second')} />
            <SkillInput value={state.third} onChange={setSkill('third')} />
          </InputContainer>
        </InfoContainer>
        <InfoContainer>
          <MaterialsSection materials={materials} />
        </InfoContainer>
        <InfoContainer>
          <Button theme={mode} onClick={saveOnClick}>
            {isFavorite ? (
              <Fragment>
                <IoSync fontSize={'1rem'} style={{ marginRight: 5 }} /> Update
                Favorite
              </Fragment>
            ) : (
              <Fragment>
                <IoStar fontSize={'1rem'} style={{ marginRight: 5 }} /> Save to
                Favorites
              </Fragment>
            )}
          </Button>
          <Visible condition={isFavorite}>
            <RemoveButton onClick={removeOnClick}>
              <IoTrash fontSize={'1rem'} style={{ marginRight: 5 }} />
              Remove from Favorites
            </RemoveButton>
          </Visible>
        </InfoContainer>
      </Body>
    </div>
  );
};
