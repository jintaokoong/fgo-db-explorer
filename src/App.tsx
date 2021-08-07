import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import BottomNavigation from 'components/navigation/bottom-navigation'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ServantsPage from 'pages/servants'
import AccountPage from 'pages/account'
import { Mode, ThemeContext } from 'contexts/theme-context'
import Colors from 'constants/colors'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ServantDetailsPage } from 'pages/servant'
import Routes from 'constants/routes'

const Outer = styled.div`
  font-family: "Noto Sans",serif ;
  background-color: ${(props) => props.theme === 'dark' ? 
          Colors.background.darkest : 
          Colors.background.light};
  color: ${(props) => props.theme === 'dark' ? Colors.foreground.dark : Colors.foreground.light}
`

const Main = styled.div`
  border-left: 0;
  border-right: 0;

  background-color: ${(props) => props.theme === 'dark' ? 
          Colors.background.darker : 
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

const client = new QueryClient();

function App() {
  const [mode, setMode] = useState<Mode>('dark');

  useEffect(() => {
    const m = localStorage.getItem('theme');
    if (m && ['dark', 'light'].includes(m)) {
      setMode(m as Mode);
    }
  }, [])

  const setTheme = useCallback((mode: Mode) => {
    setMode(mode);
    localStorage.setItem('theme', mode);
  }, [setMode]);

  return (
    <QueryClientProvider client={client}>
      <ThemeContext.Provider value={{ mode, setMode: setTheme }}>
        <Outer theme={mode}>
          <Main className={'App'} theme={mode}>
            <BrowserRouter>
              <Switch>
                <Route exact path={Routes.servants} component={ServantsPage} />
                <Route exact path={`${Routes.servant}/:id`} component={ServantDetailsPage} />
                <Route exact path={Routes.account} component={AccountPage} />
              </Switch>
            </BrowserRouter>
          </Main>
        </Outer>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
