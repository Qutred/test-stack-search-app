import styled from '@emotion/styled';

const EmptySearchWrapper = styled.div`
  max-width: 450px;
  margin: 0 auto;
  text-align: center;
  p:first-of-type {
    margin-bottom: 5px;
  }
`;
const EmptySearchResults = ({ searchQuery }) => {
  return (
    <EmptySearchWrapper>
      <p>
        We couldn't find anything for <strong>&#34;{searchQuery}&#34;</strong>
      </p>
      <p>
        <em>Try different or less specific keywords.</em>
      </p>
    </EmptySearchWrapper>
  );
};

export default EmptySearchResults;
