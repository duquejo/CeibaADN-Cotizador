import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

export const Link = styled(RouterLink)`
  text-decoration: none;
  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
`;
