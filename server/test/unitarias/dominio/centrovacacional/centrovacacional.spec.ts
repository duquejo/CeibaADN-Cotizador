import { CentroVacacional } from '../../../../src/dominio/centrovacacional/modelo/centrovacacional';
import { CentroVacacionalBuilder } from '../../../util/test-builder';

describe('Centro vacacional', () => {

    const _CentroVacacional = CentroVacacional as any;

    const centroVacacionalBaseData = {
        nombre: 'Parque Tayrona',
        descripcion: 'Aventúrate con tu familia',
        calendarios: [ 3, 5, 7 ],
        categoriasUsuarios: [ 1, 2, 3 ],
        calendarioActivo: 3
    };

    it('Centro vacacional debería crearse bien', () => {
        
        // Arrange & Act
        const _centroVacacional: CentroVacacional = new CentroVacacionalBuilder( 
            centroVacacionalBaseData.nombre
        )
        .setDescripcion( centroVacacionalBaseData.descripcion )
        .setCalendarios( centroVacacionalBaseData.calendarios )
        .setCategoriasUsuarios( centroVacacionalBaseData.categoriasUsuarios )
        .setCalendarioActivo( centroVacacionalBaseData.calendarioActivo )
        .build();

        // Assert
        expect( _centroVacacional.nombre ).toEqual( centroVacacionalBaseData.nombre );
        expect( _centroVacacional.descripcion ).toBe( centroVacacionalBaseData.descripcion );
        expect( _centroVacacional.calendarioActivo ).toBe( centroVacacionalBaseData.calendarioActivo );
        expect( _centroVacacional.calendarios ).toEqual( centroVacacionalBaseData.calendarios );
        expect( _centroVacacional.categoriasUsuarios ).toEqual( centroVacacionalBaseData.categoriasUsuarios );
    });

    it('Centro vacacional debería crearse con los valores por defecto', () => {

        // Arrange & Act
        const _centroVacacional: CentroVacacional = new CentroVacacionalBuilder( 
            'Centro vacacional por defecto'
        )
        .setNombre( centroVacacionalBaseData.nombre )
        .build();
    
        // Assert
        expect( _centroVacacional.nombre ).toEqual( centroVacacionalBaseData.nombre );
        expect( _centroVacacional.descripcion ).toBe('');
        expect( _centroVacacional.calendarioActivo ).toBeNull();
        expect( _centroVacacional.calendarios ).toEqual([]);
        expect( _centroVacacional.categoriasUsuarios ).toEqual([]);
    });

    it('Centro vacacional debería crearse asignando como activo un valor existente en el arreglo del calendario', () => {

        // Arrange & Act
        const calendariosActualizar = [ 2, 5 ];
        const calendarioActivoActualizar = 5;
        const _centroVacacional: CentroVacacional = new CentroVacacionalBuilder( 
            centroVacacionalBaseData.nombre
        )
        .setDescripcion( centroVacacionalBaseData.descripcion )
        .setCalendarios( calendariosActualizar )
        .setCalendarioActivo( calendarioActivoActualizar )
        .setCategoriasUsuarios( centroVacacionalBaseData.categoriasUsuarios )
        .build();

        // Assert
        expect( _centroVacacional.calendarioActivo ).toEqual( calendarioActivoActualizar );
        expect( _centroVacacional.calendarios ).toEqual( calendariosActualizar );
    });

    it('Centro vacacional debería crearse asignando como activo el primer calendario del arreglo si su valor es nulo', () => {

        // Arrange & Act
        const calendariosActualizar = [ 5, 9, 7 ];
        const calendarioActivoActualizar = null;
        const _centroVacacional: CentroVacacional = new CentroVacacionalBuilder( 
            centroVacacionalBaseData.nombre
        )
        .setDescripcion( centroVacacionalBaseData.descripcion )
        .setCalendarios( calendariosActualizar )
        .setCalendarioActivo( calendarioActivoActualizar )
        .setCategoriasUsuarios( centroVacacionalBaseData.categoriasUsuarios )
        .build();
        
        // Assert
        expect( _centroVacacional.calendarios ).toEqual( calendariosActualizar );
        expect( _centroVacacional.calendarioActivo ).toBe( calendariosActualizar[0] );
    });

    it('Centro vacacional debería dar por valor de calendario activo nulo si no hay calendarios', () => {

        // Arrange
        // Calendario activo no corresponde a ninguno
        const calendariosActualizar = [];
        const calendarioActivoActualizar = null;
        const _centroVacacional: CentroVacacional = new CentroVacacionalBuilder( 
            centroVacacionalBaseData.nombre
        )
        .setDescripcion( centroVacacionalBaseData.descripcion )
        .setCalendarios( calendariosActualizar )
        .setCalendarioActivo( calendarioActivoActualizar )
        .setCategoriasUsuarios( centroVacacionalBaseData.categoriasUsuarios )
        .build();
        
        // Assert
        expect( _centroVacacional.calendarioActivo ).toBeNull();
    });
});