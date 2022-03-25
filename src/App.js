import React from 'react';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import Title from './components/Title';

function App() {
  return (
    <StyledWrap>
      <StyledContainer>
        <Title />
        <SearchBar />
      </StyledContainer>
    </StyledWrap>
  );
}

export default App;

const StyledWrap = styled.main`
  height: auto;
  min-height: 100vh;
  background-color: #cae9ff;
  padding-top: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 660px;
`;
