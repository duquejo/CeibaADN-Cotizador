import * as PropTypes from 'prop-types';
import * as React from 'react';
import { BrandDiv, LogoImg, LogoSpan } from './styles';
import { Link } from 'app/shared/components/Link';

interface NavBrandProps {
  imgSrc?: string;
  text: string;
}

export const NavBrand: React.FC<NavBrandProps> = ({ imgSrc, text }) => (
  <BrandDiv>
    <Link to="/" replace={true}>
      {imgSrc ? (
        <LogoImg src={imgSrc} alt={text}></LogoImg>
      ) : (
        <LogoSpan>{text}</LogoSpan>
      )}
    </Link>
  </BrandDiv>
);

NavBrand.propTypes = {
  imgSrc: PropTypes.string,
  text: PropTypes.string.isRequired,
};
