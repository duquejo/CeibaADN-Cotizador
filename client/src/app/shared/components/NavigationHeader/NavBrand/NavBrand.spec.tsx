import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { NavBrand } from './index';
import LogoCeiba from 'assets/img/logo-ceiba.png';

describe('Pruebas para el componente <NavBrand />', () => {

    let componentWrapper: ShallowWrapper;

    afterEach(() => {
        componentWrapper.unmount();
    });


    it('Debería renderizar el logo de la aplicación', () => {
        // Arrange
        let params = {
            text: 'Demo',
            imgSrc: LogoCeiba
        };       
        // Act
        componentWrapper = shallow( 
            <NavBrand
                { ...params }
            />
        );
        // Assert
        expect( componentWrapper ).toMatchSnapshot();
        expect( componentWrapper.find('LogoImg').prop('src') ).toBe(params.imgSrc);
    });

    it('No debería renderizar el logo de la aplicación, sino el texto si no está presente el parámetro', () => {
        // Arrange
        let params = {
            text: 'Demo'
        };       
        // Act
        componentWrapper = shallow( 
            <NavBrand
                { ...params }
            />
        );
        // Assert
        expect( componentWrapper ).toMatchSnapshot();
        expect( componentWrapper.find('LogoSpan').text() ).toBe(params.text);
    });
});
