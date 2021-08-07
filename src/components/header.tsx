import styled from 'styled-components'
import { IoMdReturnLeft, IoMoon, IoSunny } from 'react-icons/all'
import { useCallback, useContext } from 'react'
import { ThemeContext } from 'contexts/theme-context'
import Layout from 'constants/layout'
import { useHistory } from 'react-router-dom'
import Visible from 'components/shared/visible'

const SHeader = styled.header`
  top: 0;
  left: 0;
  width: 100%;
  position: absolute;
  z-index: 100;
`

const SHeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: ${Layout.header.height};
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
`

const Title = styled.div`
  font-weight: bold;
  //font-size: 1.2rem;
`

const Button = styled.div`
  display: flex;
  cursor: pointer;
`

interface Props {
  title: string
  allowReturn?: boolean;
}

const Header = (props: Props) => {
  const history = useHistory();
  const { mode, setMode } = useContext(ThemeContext)

  const onToggle = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }, [mode, setMode])

  return <SHeader>
    <SHeaderContent>
      <Visible condition={props.allowReturn}>
        <Button onClick={() => history.goBack()}>
          <IoMdReturnLeft size={'1.4rem'} />
        </Button>
      </Visible>
      <Title>{props.title}</Title>
      <Button onClick={onToggle}>
        {mode === 'dark' ? <IoSunny size={'1.4rem'}/> : <IoMoon size={'1.4rem'} />}
      </Button>
    </SHeaderContent>
  </SHeader>
}

export default Header
