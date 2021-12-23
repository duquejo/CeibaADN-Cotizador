import styled from 'styled-components';

export const DivContainer = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    margin-top: 20px;
  }  
`;

export const DivRow = styled.div`
  flex: 0 0 100%;
  width: 100%;
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  &:nth-child(2){
    border-left: 1px solid #ccc;
  }
  @media (min-width: 768px) {
    width: 50%;
    flex: 0 0 50%;
  }
  @media (max-width: 768px) {
    padding-right: 0px;
    padding-left: 0px;
  }  
`;
