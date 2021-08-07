import { Fragment, useMemo } from 'react'
import styled from 'styled-components'
import Layout from 'constants/layout'
import useServants from 'hooks/use-servants'
import Loader from 'components/shared/loader'
import Header from 'components/header'

const Body = styled.main`
  position: absolute;
  top: ${`calc(${Layout.header.height} + 1px)`};
  height: ${Layout.body.height};
  width: 100%;
  overflow-y: auto;
`

const HomePage = () => {
  const { data, isLoading } = useServants();
  const servants = useMemo(() => data ?? [], [data]);

  return <Fragment>
    <Header title={'Home'} />
    <Loader active={isLoading} />
    <Body>
      {
        servants.map((s) => (
          <div key={s.id} style={{ padding: '5px 10px' }}>
            {s.name}
          </div>
        ))
      }
    </Body>
  </Fragment>
}

export default HomePage;
