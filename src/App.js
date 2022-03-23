import React from 'react';
import styled from 'styled-components';
import Search from './components/Search';
import Title from './components/Title';

function App() {
  return (
    <StyledWrap>
      <Title />
      <Search />
    </StyledWrap>
  );
}

export default App;

const StyledWrap = styled.main`
  height: auto;
  min-height: 100vh;
  background-color: #cae9ff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
