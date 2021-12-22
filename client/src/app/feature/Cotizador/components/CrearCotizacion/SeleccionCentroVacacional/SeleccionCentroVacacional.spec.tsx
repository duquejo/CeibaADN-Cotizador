import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { SeleccionCentroVacacional } from './index';
import { SinonStub, stub } from 'sinon';
import { CentroVacacional } from '../../../../Admin/models/CentroVacacional';

describe('SeleccionCentroVacacional Test', () => {

  let componentWrapper: ShallowWrapper;

//   const handlerClick = jest.fn();

  let componentProps: React.ComponentProps<typeof SeleccionCentroVacacional> & {
    elementos: CentroVacacional[];
    handlerSeleccion: SinonStub;
  };

  beforeEach( () => {
        componentProps = {
        handlerSeleccion: stub(),
        elementos: [{
                id: 1,
                nombre: 'Centro de prueba',
                descripcion: 'Descripción de prueba',
                calendarios: [],
                categoriaUsuarios: [],
                calendarioActivo: 1
            }]
        };
        componentWrapper = shallow(<SeleccionCentroVacacional { ...componentProps } />);
        jest.clearAllMocks();
    });  

  it('Debería renderizar el componente', () => {
    expect(componentWrapper).toMatchSnapshot();
  });

//   it('Debería activar el elemento al hacerle click', () => {

//     const slideBefore = componentWrapper.find('SwiperSlide').first();

//     console.log( 'before', slideBefore.first().props() );

//     slideBefore.simulate( 'click', { 
//         currentTarget: () => ' selected', 
//         centroVacacional: componentProps.elementos[0]
//      } );
    
//     const slideAfter = componentWrapper.find('SwiperSlide').first();

//     console.log( 'after', slideAfter.first().props() );

//     // expect( slideBefore.prop('className') ).toContain( ' selected' );
//   });

});
