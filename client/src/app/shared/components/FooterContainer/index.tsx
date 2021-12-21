import React from 'react';

import { Footer } from './styles';

export const FooterContainer: React.FC = () => {
    return (
        <Footer>
            José Miguel Duque Mejía - { new Date().getFullYear() }
        </Footer>
    );
};
