import { Fragment, useContext, useMemo } from 'react'
import styled from 'styled-components'
import Layout from 'constants/layout'
import useServants from 'hooks/use-servants'
import Loader from 'components/shared/loader'
import Header from 'components/header'
import ServantCard from 'components/cards/servant-card'
import Colors from 'constants/colors'
import { ThemeContext } from 'contexts/theme-context'

const Body = styled.main`
  position: absolute;
  top: ${`calc(${Layout.header.height} + 1px)`};
  height: ${Layout.body.height};
  width: 100%;
  overflow-y: auto;
`

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
  
  :focus {
    outline: none !important;
    border: 2px solid ${Colors.primary};
  }
`

const HomePage = () => {
  const { data, isLoading } = useServants();
  const { mode } = useContext(ThemeContext);
  const servants = useMemo(() => data ?? [], [data]);

  return <Fragment>
    <Header title={'Home'} />
    <Loader active={isLoading} />
    <Body>
      <SearchContainer>
        <SearchBar theme={mode} />
      </SearchContainer>
      {
        servants.map((s) => (
          <ServantCard servant={s} key={s.id} />
        ))
      }
    </Body>
  </Fragment>
}

export default HomePage;
