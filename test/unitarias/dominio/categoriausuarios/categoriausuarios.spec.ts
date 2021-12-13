import { CategoriaUsuarios } from '../../../../src/dominio/categoriausuarios/modelo/categoriausuarios';

describe('Categoría de usuarios', () => {

  const _CategoriaUsuarios = CategoriaUsuarios as any;
  
  const categoriaUsuarioDataTest = {
    nombre: "Categoría de asociados 1",
    descripcion: "Plan de pruebas",
    valorAlta: 50000,
    valorBaja: 25000
  };

  it('Categoría de usuarios debería crear bien', () => {
    
    // Arrange
    const categoriaUsuarioValues = Object.values( categoriaUsuarioDataTest );

    // Act
    const categoriaUsuarios = new _CategoriaUsuarios( ...categoriaUsuarioValues );
    
    // Assert
    expect( categoriaUsuarios.nombre ).toEqual( categoriaUsuarioDataTest.nombre );
    expect( categoriaUsuarios.descripcion ).toEqual( categoriaUsuarioDataTest.descripcion );
    expect( categoriaUsuarios.valorAlta ).toEqual( categoriaUsuarioDataTest.valorAlta );
    expect( categoriaUsuarios.valorBaja ).toEqual( categoriaUsuarioDataTest.valorBaja );
  });

  it('Categoría de usuarios debería crearse con los valores por defecto', () => {

    // Arrange
    const calendarioSinParametros = {
      nombre: 'Rango de $1\'500.000 en adelante'
    };
    
    // Act
    const categoriaUsuarios = new _CategoriaUsuarios( ...Object.values( calendarioSinParametros ) );

    // Assert
    expect( categoriaUsuarios.nombre ).toEqual( calendarioSinParametros.nombre );
    expect( categoriaUsuarios.descripcion ).toBe('');
    expect( categoriaUsuarios.valorAlta ).toBeUndefined();
    expect( categoriaUsuarios.valorBaja ).toBeUndefined();
  });
});
