import styled from 'styled-components';

export const TextArea = styled.textarea`
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 8px;
    margin-top: 10px;    
    padding: 8px 4px;
    display: block;
    width: 100%;
    font-family: inherit;
    &[disabled] {
        opacity: 0.3;
    }
`;
