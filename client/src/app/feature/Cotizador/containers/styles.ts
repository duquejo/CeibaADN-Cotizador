import styled from 'styled-components';

export const DivContainer = styled.div`
  margin: 40px auto;
  display: flex;
  width: 100%;
  max-width: 800px;
  flex-wrap: nowrap;
  flex-direction: column;
  @media (max-width: 768px) {
    max-width: 100%;
  }  
`;
