import useServant from 'hooks/use-servant'
import Header from 'components/header'
import { Body } from 'components/shared/body'
import useIDParam from 'hooks/use-id-param'
import styled from 'styled-components'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Item } from '@atlasacademy/api-connector'
import { EntityLevelUpMaterialProgression } from '@atlasacademy/api-connector/dist/Schema/Entity'
import Colors from 'constants/colors'
import { ThemeContext } from 'contexts/theme-context'

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
const Image = styled.img`
  border-radius: 5px;
`

const InfoContainer = styled.div`
  margin: 15px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Input = styled.input`
  width: 20%;
  padding: 10px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  background-color: ${(props) => props.theme === 'dark' ?
  Colors.background.dark : Colors.background.light
};

  color: ${(props) => props.theme === 'dark' ?
  Colors.foreground.dark : Colors.foreground.light
};
  font-size: 1.05rem;
  caret-color: ${Colors.primary};
  :focus {
    outline: none !important;
    border: 2px solid ${Colors.primary};
  }
`

const INITIAL_SKILL_STATE = {
  first: '1',
  second: '1',
  third: '1',
}

const cleanInput = (input: string) => {
  const parsed = input.length === 0 ? 1 : parseInt(input);
  return parsed >= 10 ? 9 : parsed;
}

const getItems = (current: number, elupm: EntityLevelUpMaterialProgression) => {
  const frequired = Array(10 - current).fill(0).map((_, idx) => elupm[current+idx]);
  const items = frequired.flatMap((i) => i.items);
  const ri = items.reduce<{item: Item.Item, amount: number}[]>((n, a) => {
    const idx = n.findIndex(i => i.item.id === a.item.id);
    if (idx >= 0) {
      const e = n[idx];
      const ni = {
        amount: e.amount + a.amount,
        item: a.item,
      };
      return [...n.filter((_, inner) => inner !== idx), ni];
    } else {
      return [...n, a];
    }
  }, []);
  return ri;
}

export const ServantDetailsPage = () => {
  const id = useIDParam();
  const { mode } = useContext(ThemeContext);
  const [state, setState] = useState(INITIAL_SKILL_STATE);
  const { data } = useServant(id);

  const setSkill = useCallback((skill: 'first' | 'second' | 'third', value: string) => {
    setState((s) => ({
      ...s,
      [skill]: value,
    }))
  }, [setState])

  useEffect(() => {
    if (data) {
      const f = cleanInput(state.first);
      const first = getItems(f, data.skillMaterials);
      const s = cleanInput(state.second);
      const second = getItems(s, data.skillMaterials);
      const t = cleanInput(state.third);
      const third = getItems(t, data.skillMaterials);
      const total = [...first, ...second, ...third].reduce<{item: Item.Item, amount: number}[]>((n, a) => {
        const idx = n.findIndex(i => i.item.id === a.item.id);
        if (idx >= 0) {
          const e = n[idx];
          const ni = {
            amount: e.amount + a.amount,
            item: a.item,
          };
          return [...n.filter((_, inner) => inner !== idx), ni];
        } else {
          return [...n, a];
        }
      }, []);
      console.log(total);
    }
  }, [state, data])

  return <div>
    <Header title={data?.name ?? ''} allowReturn />
    <Body hasHeader>
      <InfoContainer>
        <InputContainer>
          <Input theme={mode} type={'number'} min={1} max={9} value={state.first} onChange={(e) => setSkill('first', e.target.value)} />
          <Input theme={mode} type={'number'} min={1} max={9} value={state.second} onChange={(e) => setSkill('second', e.target.value)} />
          <Input theme={mode} type={'number'} min={1} max={9} value={state.third} onChange={(e) => setSkill('third', e.target.value)} />
        </InputContainer>
      </InfoContainer>
    </Body>
  </div>
}
