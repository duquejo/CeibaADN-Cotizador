import * as React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { ModalCentrosVacacionales } from '.';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../../../../core/redux/reductores';

describe('ModalCentrosVacacionales test', () => {

  let componentWrapper: RenderResult;

  beforeEach(() => {
    const store = createStore( rootReducer );
    componentWrapper = render(
        <Provider store={ store }>
            <ModalCentrosVacacionales/>
        </Provider> 
    );
  });

  it('Debería coincidir con el snapshot', () => {
    expect( componentWrapper.container ).toMatchSnapshot();
  });
  
});
