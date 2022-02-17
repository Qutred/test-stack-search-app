import React from 'react';
import styled from '@emotion/styled';
import CustomBadge from '../CustomBadge/CustomBadge';
import SmallLinkTitle from '../SmallLinkTitle/SmallLinkTitle';
import Stack from '@mui/material/Stack';
import Tag from '../Tags/Tag';
import { Avatar } from '@mui/material';
import UserName from '../UserName/UserName';

const QuestionContainer = styled.div`
  padding: 15px;
  border-bottom: 1px solid var(--color-orange);
  display: flex;
  align-items: center;
`;

const QuestionLeftStyled = styled.div`
  display: flex;
  flex-grow: 1;
`;

const InfoContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  gap: 10px;
`;

const QuestionRightStyled = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 65px;
  text-align: center;
  color: var(--color-black);
  transition: color 250ms;
  &:hover {
    color: var(--color-orange);
  }
`;

const QuestionItem = props => {
  const { title, answerCount, tags, authorImg, authorName, authorLink, link } =
    props;
  return (
    <QuestionContainer>
      <QuestionLeftStyled>
        <CustomBadge text1={answerCount} text2={'Answer'} />
        <InfoContainerStyled>
          <SmallLinkTitle href={link}>{title}</SmallLinkTitle>
          <Stack direction="row" spacing={1}>
            {tags.map(tag => {
              return <Tag key={tag}>{tag}</Tag>;
            })}
          </Stack>
        </InfoContainerStyled>
      </QuestionLeftStyled>
      <QuestionRightStyled href={authorLink}>
        <Avatar src={authorImg} alt={authorName} />
        <UserName> {authorName}</UserName>
      </QuestionRightStyled>
    </QuestionContainer>
  );
};

export default QuestionItem;
