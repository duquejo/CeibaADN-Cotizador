import * as PropTypes from 'prop-types';
import * as React from 'react';
import { DivContainer } from './styles';
import { Helmet } from 'react-helmet';

import { FooterContainer } from '../FooterContainer/index';

interface LayoutProps {
  title: string;
  description: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <>
      <Helmet>
        {
          // eslint-disable-next-line
          title && <title>Cotizador de Centros Vacacionales | {title}</title>
        }
        {description && <meta name="description" content={description} />}
      </Helmet>
      <DivContainer>{children}</DivContainer>
      <FooterContainer />
    </>
  );
};

Layout.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  //@ts-ignore
  children: PropTypes.node.isRequired
};
