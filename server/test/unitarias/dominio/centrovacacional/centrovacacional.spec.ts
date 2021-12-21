import { CentroVacacional } from '../../../../src/dominio/centrovacacional/modelo/centrovacacional';

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
        
        // Arrange
        const centroVacacionalValues = Object.values( centroVacacionalBaseData );

        // Act
        const centroVacacional = new _CentroVacacional( ...centroVacacionalValues );

        // Assert
        expect( centroVacacional.nombre ).toEqual( centroVacacionalBaseData.nombre );
        expect( centroVacacional.descripcion ).toBe( centroVacacionalBaseData.descripcion );   
        expect( centroVacacional.calendarioActivo ).toBe( centroVacacionalBaseData.calendarioActivo );   
        expect( centroVacacional.calendarios ).toEqual( centroVacacionalBaseData.calendarios );   
        expect( centroVacacional.categoriasUsuarios ).toEqual( centroVacacionalBaseData.categoriasUsuarios );
    });

    it('Centro vacacional debería crearse con los valores por defecto', () => {

        // Arrange
        const centroVacacionalSinParametrosOpcionales = {
          nombre: 'Finca San Jerónimo'
        };
        
        // Act
        const centroVacacional = new _CentroVacacional( ...Object.values( centroVacacionalSinParametrosOpcionales ) );
    
        // Assert
        expect( centroVacacional.nombre ).toEqual( centroVacacionalSinParametrosOpcionales.nombre );
        expect( centroVacacional.descripcion ).toBeUndefined();
        expect( centroVacacional.calendarioActivo ).toBeUndefined();
        expect( centroVacacional.calendarios ).toBeUndefined();
        expect( centroVacacional.categoriasUsuarios ).toBeUndefined();
    });

    it('Centro vacacional debería crearse asignando como activo un valor existente en el arreglo del calendario', () => {

        // Arrange
        const centroVacacionalCopia = Object.assign( {}, centroVacacionalBaseData );

        centroVacacionalCopia.calendarios = [ 2, 5 ];
        centroVacacionalCopia.calendarioActivo = 5;

        const centroVacacionalValues = Object.values( centroVacacionalCopia );

        // Act
        const centroVacacional = new _CentroVacacional( ...centroVacacionalValues );

        // Assert
        expect( centroVacacional.nombre ).toBe( centroVacacionalCopia.nombre );
        expect( centroVacacional.descripcion ).toBe( centroVacacionalCopia.descripcion );
        expect( centroVacacional.calendarioActivo ).toBe( centroVacacionalCopia.calendarioActivo );
        expect( centroVacacional.calendarios ).toBe( centroVacacionalCopia.calendarios );
        expect( centroVacacional.categoriasUsuarios ).toEqual( centroVacacionalCopia.categoriasUsuarios );
    });

    it('Centro vacacional debería crearse asignando como activo el primer calendario del arreglo si su valor es nulo', () => {

        // Arrange
        const centroVacacionalCopia = Object.assign( {}, centroVacacionalBaseData );

        // Calendario activo no corresponde a ninguno
        centroVacacionalCopia.calendarios = [ 5, 9, 7 ];
        centroVacacionalCopia.calendarioActivo = null;

        const centroVacacionalValues = Object.values( centroVacacionalCopia );

        // Act
        const centroVacacional = new _CentroVacacional( ...centroVacacionalValues );
        
        // Assert
        expect( centroVacacional.nombre ).toBe( centroVacacionalCopia.nombre );
        expect( centroVacacional.descripcion ).toBe( centroVacacionalCopia.descripcion );
        expect( centroVacacional.calendarios ).toEqual( centroVacacionalCopia.calendarios );
        expect( centroVacacional.calendarios[0] ).toBe( centroVacacional.calendarioActivo );
        expect( centroVacacional.categoriasUsuarios ).toEqual( centroVacacionalCopia.categoriasUsuarios );
    });

    it('Centro vacacional debería dar por valor de calendario activo nulo si no hay calendarios', () => {

        // Arrange
        const centroVacacionalCopia = Object.assign( {}, centroVacacionalBaseData );

        // Calendario activo no corresponde a ninguno
        centroVacacionalCopia.calendarios = [];
        centroVacacionalCopia.calendarioActivo = null;

        const centroVacacionalValues = Object.values( centroVacacionalCopia );

        // Act
        const centroVacacional = new _CentroVacacional( ...centroVacacionalValues );
        
        // Assert
        expect( centroVacacional.calendarioActivo ).toBeNull();
    });
});