import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { GlobalErrorBoundary } from './index';
import { ReactNode } from 'react';

describe('Pruebas sobre <GlobalErrorBoundary />', () => {
    
  let componentWrapper: ShallowWrapper;
  let componentProps: React.ComponentProps<typeof GlobalErrorBoundary> & {
    children: ReactNode;
  };

  beforeEach(() => {
    componentProps = {
      children: () => ( <span>Hijo de prueba</span>),
    };
    componentWrapper = shallow(<GlobalErrorBoundary { ...componentProps } />);
  });

  it('Debería coincidir con el snapshot', () => {
    expect( componentWrapper ).toMatchSnapshot();
  });
});
