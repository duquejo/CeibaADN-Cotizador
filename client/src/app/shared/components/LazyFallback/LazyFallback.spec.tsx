import * as React from 'react';
import { ShallowWrapper, mount, render, shallow } from 'enzyme';
import { LazyFallback } from './index';

describe('Pruebas sobre componente <LazyFallback />', () => {

    let componentWrapper: ShallowWrapper;

    beforeEach( () => {
        componentWrapper = shallow(<LazyFallback/>);
    });

    it('Debería renderizar el elemento', () => {
        expect( componentWrapper ).toMatchSnapshot();
    });

    it('Debería tener el span personalizado implementado', () => {
        expect( componentWrapper.find( 'SpanFallback' ).length ).toBe(1);
    });
});