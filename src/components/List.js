import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPostsQuery } from '../service/api';
import { changeKeyword } from '../store/reducers/keywordSlice';

function List({ listRef, inputRef, setValue }) {
  const dispatch = useDispatch();
  const { keyword } = useSelector((store) => store.keyword);
  const { data, isError, isLoading } = useGetPostsQuery(keyword);

  const onChageKeyword = (word) => {
    setValue(word);
    dispatch(changeKeyword(word));
  };

  const onChangeTab = (e, index, name) => {
    const first = listRef.current[0];
    const last = listRef.current[listRef.current.length - 1];
    const next = listRef.current[index + 1];
    const prev = listRef.current[index - 1];

    if (e.key === 'ArrowDown') {
      if (next) next.focus();
      else first.focus();
    }

    if (e.key === 'ArrowUp') {
      if (prev) prev.focus();
      else last ? last.focus() : listRef.current[data.length - 1].focus();
    }

    if (e.key === 'Enter') {
      onChageKeyword(name);
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    listRef.current = [];
  }, [keyword]);

  if (isLoading) {
    return (
      <StyledList>
        <p className="suggest">해당 검색어로 검색중입니다.</p>
      </StyledList>
    );
  }
  if (isError) {
    return (
      <StyledList>
        <p className="suggest">잠시후 다시 시도해주세요</p>
      </StyledList>
    );
  }
  if (!data?.length) {
    return (
      <StyledList>
        <p className="suggest">검색 내용이 없습니다.</p>
      </StyledList>
    );
  }
  return (
    <StyledList>
      <p className="suggest">추천 검색어</p>
      <ul>
        {data.slice(0, 7).map((list, index) => {
          return (
            <li
              key={list.id}
              ref={(e) => {
                listRef.current[index] = e;
              }}
              tabIndex={0}
              onKeyDown={(e) => onChangeTab(e, index, list.name)}
              onClick={() => {
                onChageKeyword(list.name);
              }}
            >
              <AiOutlineSearch size={20} />
              {list.name}
            </li>
          );
        })}
      </ul>
    </StyledList>
  );
}
List.propTypes = {
  setValue: PropTypes.func.isRequired,
  listRef: PropTypes.any.isRequired,
  inputRef: PropTypes.any.isRequired,
};

export default List;

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
