import useServant from 'hooks/use-servant';
import Header from 'components/header';
import { Body } from 'components/shared/body';
import useIDParam from 'hooks/use-id-param';
import styled from 'styled-components';
import { ChangeEvent, useCallback, useContext, useMemo, useState } from 'react';
import { EntityLevelUpMaterialProgression } from '@atlasacademy/api-connector/dist/Schema/Entity';
import Colors from 'constants/colors';
import { ThemeContext } from 'contexts/theme-context';
import ArrayUtils from 'utils/array-utils';
import Skeleton from 'react-loading-skeleton';
import _ from 'lodash';
import ItemAmountDto from 'interfaces/dtos/item-amount-dto';

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Image = styled.img`
  border-radius: 5px;
`;

const MatImage = styled.img`
  margin-right: 5px;
  vertical-align: middle;
`;

const InfoContainer = styled.div`
  margin: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 20%;
  padding: 10px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  background-color: ${(props) =>
    props.theme === 'dark' ? Colors.background.dark : Colors.background.light};
  color: ${(props) =>
    props.theme === 'dark' ? Colors.foreground.dark : Colors.foreground.light};
  font-size: 1.05rem;
  caret-color: ${Colors.primary};

  :focus {
    outline: none !important;
    border: 2px solid ${Colors.primary};
  }
`;

const Button = styled.button`
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

const INITIAL_SKILL_STATE = {
  first: '1',
  second: '1',
  third: '1',
};

const cleanInput = (input: string) => {
  const parsed = input.length === 0 ? 1 : parseInt(input);
  return parsed >= 10 ? 9 : parsed;
};

const getItems = (
  current: number,
  material: EntityLevelUpMaterialProgression
) => {
  const preprocessedItems = Array(10 - current)
    .fill(0)
    .map((_, idx) => material[current + idx]);
  const items = preprocessedItems.flatMap((i) => i.items);
  return ArrayUtils.SumMaterials(items);
};

export const ServantDetailsPage = () => {
  const id = useIDParam();
  const { mode } = useContext(ThemeContext);
  const [state, setState] = useState(INITIAL_SKILL_STATE);
  const { data } = useServant(id);

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

  const materials: ItemAmountDto[] = useMemo(() => {
    if (!data) {
      return [];
    }

    const f = cleanInput(state.first);
    const first = getItems(f, data.skillMaterials);
    const s = cleanInput(state.second);
    const second = getItems(s, data.skillMaterials);
    const t = cleanInput(state.third);
    const third = getItems(t, data.skillMaterials);
    const total = ArrayUtils.SumMaterials([...first, ...second, ...third]);
    console.log(total);
    return total;
  }, [state, data]);

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
            <Input
              theme={mode}
              type={'number'}
              min={1}
              max={9}
              value={state.first}
              onChange={setSkill('first')}
            />
            <Input
              theme={mode}
              type={'number'}
              min={1}
              max={9}
              value={state.second}
              onChange={setSkill('second')}
            />
            <Input
              theme={mode}
              type={'number'}
              min={1}
              max={9}
              value={state.third}
              onChange={setSkill('third')}
            />
          </InputContainer>
        </InfoContainer>
        <InfoContainer>
          <table style={{ width: '100%' }}>
            {_.chunk<ItemAmountDto>(materials, 4).map((g, idx) => (
              <tr key={idx}>
                {g.map((m) => (
                  <td key={m.item.id}>
                    <MatImage
                      title={m.item.name}
                      alt={m.item.name}
                      height={30}
                      src={m.item.icon}
                    />
                    x {m.amount}
                  </td>
                ))}
              </tr>
            ))}
          </table>
        </InfoContainer>
        <InfoContainer>
          <Button theme={mode}>Save to Favourites</Button>
        </InfoContainer>
      </Body>
    </div>
  );
};
