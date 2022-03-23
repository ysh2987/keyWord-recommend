import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import List from './List';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [selected, setSelected] = useState(-1);
  const keyUp = (e) => {
    if (e.key === 'ArrowDown') {
      setSelected(selected + 1);
    }
    if (e.key === 'ArrowUp') {
      setSelected(selected > 0 ? selected - 1 : selected);
    }
  };

  return (
    <StyledSearch>
      <StyledSearchContainer>
        <div className="input-wrap">
          <AiOutlineSearch size={20} />
          <input
            type="text"
            placeholder="질환명을 입력해 주세요."
            list="languages"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={keyUp}
          />
        </div>
        <button type="button">검색</button>
      </StyledSearchContainer>
      {searchValue && <List selected={selected} setSelected={setSelected} />}
    </StyledSearch>
  );
}

export default Search;

const StyledSearch = styled.div`
  width: 100%;
  max-width: 660px;
  margin-top: 25px;
`;

const StyledSearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .input-wrap {
    background-color: #fff;
    padding: 20px 24px;
    border-top-left-radius: 42px;
    border-bottom-left-radius: 42px;
    flex-grow: 1;
    display: flex;
    align-items: center;

    input {
      font-size: 1.2rem;
      flex: 1;
      margin-left: 10px;
      outline: none;
    }
  }
  button {
    background-color: #007be9;
    color: #ffffff;
    padding: 20px 24px;
    border-top-right-radius: 42px;
    border-bottom-right-radius: 42px;
  }
`;
