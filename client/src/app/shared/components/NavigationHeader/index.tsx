import * as React from 'react';
import { HeaderNav } from './styles';
import LogoCeiba from 'assets/img/logoCeibaSoftware.png';
import { NavBrand } from './NavBrand';
import { NavList } from './NavList';

export const NavigationHeader: React.FC = () => {
  const routes = [
    { label: 'Home', url: '/home' },
    { label: 'Administrador', url: '/administrador' },
    { label: 'Cotizador', url: '/cotizador' }
  ];
  return (
    <HeaderNav>
      <NavBrand imgSrc={LogoCeiba} text="Ceiba Software"></NavBrand>
      <NavList items={routes} />
    </HeaderNav>
  );
};
