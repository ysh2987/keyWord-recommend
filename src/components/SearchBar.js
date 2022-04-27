import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { changeKeyword } from '../store/reducers/keywordSlice';
import SearchList from './SearchList';

function SearchBar() {
  const dispatch = useDispatch();
  const { keyword } = useSelector((store) => store.keyword);

  const [value, setValue] = useState('');
  const [timer, setTimer] = useState(0);

  const listRef = useRef();
  const inputRef = useRef();

  const onKeyDownSearch = (e) => {
    if (e.key === 'ArrowDown') {
      listRef.current && listRef.current[0].focus();
    }
  };

  const debounce = (e) => {
    setValue(e.target.value);

    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      dispatch(changeKeyword(e.target.value.trim()));
    }, 800);
    setTimer(newTimer);
  };

  return (
    <>
      <StyledSearchContainer>
        <div className="input-wrap">
          <AiOutlineSearch size={20} />
          <input
            type="text"
            placeholder="질환명을 입력해 주세요."
            value={value}
            onChange={(e) => debounce(e)}
            onKeyDown={onKeyDownSearch}
            ref={inputRef}
          />
        </div>
        <button type="button">검색</button>
      </StyledSearchContainer>
      {keyword && (
        <StyledList>
          <SearchList
            listRef={listRef}
            setValue={setValue}
            inputRef={inputRef}
          />
        </StyledList>
      )}
    </>
  );
}

export default SearchBar;

const StyledSearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;

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

const StyledList = styled.div`
  background-color: #fff;
  border-radius: 10px;
  margin-top: 20px;
  padding: 15px 0;
  ul:focus {
    color: red;
  }
  .suggest {
    color: #c2c2c2;
    padding: 0 24px;
    font-weight: bold;
  }

  .loading {
    padding: 0 24px;
  }

  li {
    display: flex;
    align-items: center;
    line-height: 40px;
    cursor: pointer;
    padding: 0 24px;
    svg {
      margin-right: 10px;
    }
    &:hover {
      background-color: #c0c0c0;
    }
    &:focus {
      outline: none;
      background-color: #c0c0c0;
    }
  }
`;
