import * as PropTypes from 'prop-types';
import * as React from 'react';
import { NavItem } from '../NavItem';
import { NavListUl } from './styles';

interface NavListProps {
  items: { label: string; url: string }[];
}

export const NavList: React.FC<NavListProps> = ({ items }) => {
  return (
    <NavListUl>
      {items.map(({ label, url }) => (
        <li key={label}>
          <NavItem label={label} to={url} />
        </li>
      ))}
    </NavListUl>
  );
};

NavList.propTypes = {
  items: PropTypes.array.isRequired,
};
