import { Footer } from './styles';
import React from 'react';

export const FooterContainer: React.FC = () => {
    return (
        <Footer>
            José Miguel Duque Mejía - { new Date().getFullYear() }
        </Footer>
    );
};
