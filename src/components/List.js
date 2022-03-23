import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import mock from '../mock';

function List({ selected, setSelected }) {
  const mouseOver = (index) => {
    setSelected(index);
  };
  return (
    <StyledList>
      <p className="suggest">추천 검색어</p>
      <ul>
        {mock.map((el, idx) => {
          return (
            <li
              key={el.id}
              className={selected === idx ? 'selected' : null}
              onMouseOver={() => mouseOver(idx)}
              onFocus={() => mouseOver(idx)}
            >
              <AiOutlineSearch size={20} />
              {el.name}
            </li>
          );
        })}
      </ul>
    </StyledList>
  );
}
List.propTypes = {
  selected: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default List;

const StyledList = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 20px;
  padding: 15px 0;
  .suggest {
    color: #c2c2c2;
    padding: 0 24px;
    font-weight: bold;
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
    &.selected {
      background-color: #c0c0c0;
    }
  }
`;
