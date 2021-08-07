import React from 'react';
import styled from 'styled-components'

const Main = styled.div`
  border-left: 0;
  border-right: 0;
  
  @media (min-width: 770px) {
    margin-left: auto;
    margin-right: auto;
    max-width: 414px;
    
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    border-right: 1px solid rgba(0, 0, 0, 0.15);
  }

  min-height: 100vh;
`;

function App() {
  return (
    <Main className={'App'}>

    </Main>
  );
}

export default App;
