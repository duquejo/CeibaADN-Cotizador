import styled from 'styled-components';

export const Small = styled.small`
  font-size: 13px;
  display: block;

  &.inline{
    display: inline;
    margin-left: 10px;
    &:before{
      content: '✅'
    }
  }

  &.underlined{
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
