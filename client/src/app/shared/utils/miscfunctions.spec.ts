import { extraerIdsDeArray, obtenerCalendarioActivo, cotizacionTemplate } from './miscfunctions';
import { ISelectionOptions } from '../../feature/Admin/models/FormSelector';

describe('Funciones de miscelánea o utilidades', () => {

  const arrayCalendarioKeys: ISelectionOptions[] = [
    { value: '1', label: 'Calendario de prueba festivos' },
    { value: '3', label: 'Calendario de prueba festivos II' },   
    { value: '2', label: 'Calendario de prueba festivos III' },
  ];

  const arrayTest = [
    { id: 2, name: 'test'},
    { id: 5, name: 'demo'},
    { id: 22, name: 'prueba'},
    { id: 23, name: 'prueba'},
    { id: 11, name: 'prueba'},
  ];

  const cotizacion = {
    categoriaUsuarios: {
      id: 2, nombre: "Categoria", descripcion: "", valorAlta: 1200, valorBaja: 200 
    },
    centroVacacional: {
      id: 4, nombre: "Cosa!", descripcion: "asdasd", calendarioActivo: 27
    },
    codigo: "29211171-9922-497c-bce6-0cad9e0d9492",
    fechaFin: "2021-12-25T00:00:00-05:00",
    fechaInicio: "2021-12-23T00:00:00-05:00",
    id: 7,
    personas: 3,
    total: 1800
  };

  const isHTML = ( str: string ) => {
    var doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
  }

  it('Debería devolver una cadena HTML válida', () => {
    // Arrange & Act
    const html = cotizacionTemplate( cotizacion );
    // Assert
    expect( isHTML( html ) ).toBeTruthy();
  });

  it('Debería devolver una cadena HTML válida con si se especifica que es para frontend', () => {
    // Arrange & Act
    const html = cotizacionTemplate( cotizacion, true );
    // Assert
    expect( isHTML( html ) ).toBeTruthy();
  });

  it('Debería devolver vacío si no se envían identificadores', () => {
    // Arrange
    const arrayBusqueda: Array<any> = [];
    // Act
    const idExtraido = extraerIdsDeArray( arrayBusqueda, arrayTest );
    // Assert
    expect(idExtraido.length).toBe(0);
  });

  it('Debería extraer todos ID\'s efectivamente de un arreglo de objetos', () => {
    // Arrange
    const arrayBusqueda = [{ id: 1, foo: 'bar'}, { id: 5, bar: 'foo'}];
    // Act
    const idExtraido = extraerIdsDeArray( arrayBusqueda, arrayTest );
    // Assert
    expect(idExtraido.length).toBe(1);
  });

  it('Debería extraer todos ID\'s efectivamente del arreglo numérico', () => {
    // Arrange
    const arrayBusqueda = [5, 11];
    // Act
    const idExtraido = extraerIdsDeArray( arrayBusqueda, arrayTest );
    // Assert
    expect(idExtraido.length).toBe(2);
  });

  it('Debería solo los ID\'s que estén en el arreglo numérico', () => {
    // Arrange
    const arrayBusqueda = [5, 100];
    // Act
    const idExtraido = extraerIdsDeArray( arrayBusqueda, arrayTest );
    // Assert
    expect(idExtraido.length).toBe(1);
  });

  it('Debería devolver nada si no encuentra ningún identificador en el arreglo numérico', () => {
    // Arrange
    const arrayBusqueda = [123, 125];
    // Act
    const idExtraido = extraerIdsDeArray( arrayBusqueda, arrayTest );
    // Assert
    expect(idExtraido.length).toBe(0);
  });

  it('Debería devolver como calendario activo el mismo identificador si se encuentra en los calendarios', () => {
    // Arrange
    const calendarioActivo = 1;
    // Act
    const calendarioActivoAuto = obtenerCalendarioActivo( calendarioActivo, arrayCalendarioKeys );
    // Assert
    expect( calendarioActivo ).toBe(calendarioActivoAuto);
  });

  it('Debería devolver el primero si el calendario activo no se encuentra en los calendarios', () => {
    // Arrange
    const calendarioActivo = 10;
    // Act
    const calendarioActivoAuto = obtenerCalendarioActivo( calendarioActivo, arrayCalendarioKeys );
    // Assert
    expect( calendarioActivoAuto ).toBe(Number( arrayCalendarioKeys[0].value ));
  });

  it('Debería devolver null si no hay calendarios', () => {
    // Arrange
    const calendarioActivo = 10;
    // Act
    const calendarioActivoAuto = obtenerCalendarioActivo( calendarioActivo, [] );
    // Assert
    expect( calendarioActivoAuto ).toBeNull();
  });
});