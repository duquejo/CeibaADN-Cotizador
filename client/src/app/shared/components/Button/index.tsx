import styled from 'styled-components';

export const Button = styled.button`
  background: #009e99;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  height: 32px;
  display: block;
  border: none;
  padding: 15px 20px;
  cursor: pointer;
  line-height: 5px;
  margin: 15px auto 0;
  text-align: center;
  transition: background-color 0.2s ease-in;
  &:hover{
    background: #00c9c2;
  }
  &[disabled] {
    opacity: 0.3;
  }
  @media (max-width: 768px){
    margin-bottom: 20px;
    margin-top: 5px;
    width: 100%;
  }
`;
