import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from 'app/shared/components/Link';
import { NavItemDiv } from './styles';

interface NavItemProps {
  label: string;
  to: string;
}

export const NavItem: React.FC<NavItemProps> = ({ label, to }) => (
  <NavItemDiv>
    <Link to={to} replace={true}>
      {label}
    </Link>
  </NavItemDiv>
);

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
