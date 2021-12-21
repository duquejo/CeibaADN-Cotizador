import styled from 'styled-components';

export const CheckBoxLabel = styled.label`
    margin-bottom: 8px;
    font-family: inherit;
    display: inline-block;
    font-size: 15px;
    margin-right: 8px;
    &[disabled] {
        opacity: 0.3;
    }
    &:first-child{
        margin-left: 0;
    }
`;
