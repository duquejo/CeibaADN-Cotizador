import * as React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { ModalCalendarios } from './';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../../../../core/redux/reductores'

describe('ModalCalendarios test', () => {

  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof ModalCalendarios> & {
    onSubmit: SinonStub;
    handleEditCalendar: SinonStub;
  };

  beforeEach(() => {
    componentProps = {
      onSubmit: stub(),
      handleEditCalendar: stub()
    };

    const store = createStore( rootReducer );
    componentWrapper = render(
        <Provider store={ store }>
            <ModalCalendarios { ...componentProps } />
        </Provider> 
    );
  });

  it('Debería coincidir con el snapshot', () => {
    expect( componentWrapper.container ).toMatchSnapshot();
  });
});
