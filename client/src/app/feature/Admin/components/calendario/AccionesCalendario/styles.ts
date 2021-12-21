import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  @media (max-width: 768px) {
    display: block;
    overflow-x: scroll;
  }
`;

export const EmojiDetails = styled.td`
  text-align: center;
  cursor: pointer;
`;
