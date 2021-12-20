import styled from 'styled-components';

export const Small = styled.small`
  font-size: 12px;
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
`;
