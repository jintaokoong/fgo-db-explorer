import { Fragment, useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import useServants from 'hooks/use-servants'
import Loader from 'components/shared/loader'
import Header from 'components/header'
import ServantCard from 'components/cards/servant-card'
import Colors from 'constants/colors'
import { ThemeContext } from 'contexts/theme-context'
import BottomNavigation from 'components/navigation/bottom-navigation'
import { OffsetBody } from 'components/shared/offset-body'

const SearchContainer = styled.div`
  display: flex;
`
const SearchBar = styled.input`
  flex: 1;
  margin: 10px 10px 5px 10px;
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

const ServantsPage = () => {
  const { data, isLoading } = useServants();
  const { mode } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const servants = useMemo(() => {
    if (!data) {
      return [];
    }

    return query.length === 0 ? data : data.filter(
      (s) => s.name.includes(query))
  }, [data, query]);

  return <Fragment>
    <Header title={'Servants'} />
    <Loader active={isLoading} />
    <OffsetBody hasHeader hasFooter>
      <SearchContainer>
        <SearchBar theme={mode}
                   value={query}
                   onChange={(e) => setQuery(e.target.value)} />
      </SearchContainer>
      {
        servants.map((s) => (
          <ServantCard servant={s} key={s.id} />
        ))
      }
    </OffsetBody>
    <BottomNavigation />
  </Fragment>
}

export default ServantsPage;
