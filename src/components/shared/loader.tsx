import styled from 'styled-components'
import { useContext } from 'react'
import { ThemeContext } from 'contexts/theme-context'

const SLoader = styled.div`
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #555; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 0.9s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
const SLoaderContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: ${props => props.theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'};
`

interface Props {
  active: boolean;
}

const Loader = (props: Props) => {
  const { mode } = useContext(ThemeContext);

  return props.active ?
    <SLoaderContainer theme={mode}>
      <SLoader />
    </SLoaderContainer> : null;
}

export default Loader;
