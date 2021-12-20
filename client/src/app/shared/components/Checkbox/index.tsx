import styled from 'styled-components';

export const CheckBox = styled.input.attrs({
    type: 'checkbox' })`
    position: relative;
    top: 2px;
    display: inline-block;
    font-family: inherit;
    margin-top: 10px;
    &[disabled] {
        opacity: 0.3;
    }
`;
