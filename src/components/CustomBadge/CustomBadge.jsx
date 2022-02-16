import React from 'react';
import styled from '@emotion/styled';

const CustomBadgeStyled = styled.div`
  padding: 10px;
  background: var(--color-orange);
  border-radius: 12px;
  color: var(--color-white);
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 60px;
  min-height: 60px;
  font-size: var(--fs-12);
`;

const CustomBadge = ({ text1, text2 }) => {
  return (
    <CustomBadgeStyled>
      <span>{text1}</span>
      <span>{text2}</span>
    </CustomBadgeStyled>
  );
};

export default CustomBadge;
