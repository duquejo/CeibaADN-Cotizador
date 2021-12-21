import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { GestionCotizaciones } from './index';

describe('GestionCotizaciones Test', () => {
  let componentWrapper: ShallowWrapper;

  it('should match snapshot', () => {
    componentWrapper = shallow( <GestionCotizaciones /> );
    expect(componentWrapper).toMatchSnapshot();
  });
});
