import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const BrandDiv = styled.div`
  margin: 5px;
`;

BrandDiv.displayName = 'BrandDiv';

export const LogoImg = styled.img`
  max-height: 50px;
  max-width: 150px;
`;

LogoImg.displayName = 'LogoImg';

export const LogoSpan = styled.span`
  color: green;
  font-size: calc(18px + 2vmin);
`;

LogoSpan.displayName = 'LogoSpan';

export const BrandLink = styled(Link)`
  text-decoration: none;
`;

BrandLink.displayName = 'BrandLink';

export default {};
