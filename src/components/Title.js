import React from 'react';
import styled from 'styled-components';

function Title() {
  return (
    <StyledTitle>
      국내 모든 임상시험 검색하고
      <br />
      온라인으로 참여하기
    </StyledTitle>
  );
}

export default React.memo(Title);

const StyledTitle = styled.p`
  font-size: 2rem;
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.1rem;
  line-height: 1.6;
`;
