import React, { useState } from 'react'
import styled from 'styled-components'
import BottomNavigation from 'components/navigation/bottom-navigation'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from 'pages/home'
import AccountPage from 'pages/account'
import { Mode, ThemeContext } from 'hooks/theme-context'
import Colors from 'constants/colors'

const Outer = styled.div`
  background-color: ${(props) => props.theme === 'dark' ? 
          Colors.background.darker : 
          Colors.background.light};
`

const Main = styled.div`
  border-left: 0;
  border-right: 0;

  background-color: ${(props) => props.theme === 'dark' ? 
          Colors.background.dark : 
          Colors.background.light};
  
  @media (min-width: 770px) {
    margin-left: auto;
    margin-right: auto;
    max-width: 414px;
    
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    border-right: 1px solid rgba(0, 0, 0, 0.15);
  }
  
  position: relative;
  min-height: 100vh;
`;


function App() {
  const [mode, setMode] = useState<Mode>('dark');

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <Outer theme={mode}>
        <Main className={'App'} theme={mode}>
          <BrowserRouter>
            <Switch>
              <Route exact path={'/'} component={HomePage} />
              <Route exact path={'/account'} component={AccountPage} />
            </Switch>
            <BottomNavigation />
          </BrowserRouter>
        </Main>
      </Outer>
    </ThemeContext.Provider>
  );
}

export default App;
