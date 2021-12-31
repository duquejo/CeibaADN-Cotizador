import { CategoriaUsuarios } from '../../../../src/dominio/categoriausuarios/modelo/categoriausuarios';
import { CategoriaUsuariosBuilder } from '../../../util/test-builder';

describe('Categoría de usuarios', () => {

  const _CategoriaUsuarios = CategoriaUsuarios as any;
  
  const categoriaUsuarioDataTest = {
    nombre: "Categoría de asociados 1",
    descripcion: "Plan de pruebas",
    valorAlta: 50000,
    valorBaja: 25000
  };

  it('Categoría de usuarios debería crear bien', () => {
    
    // Arrange & Act
    const _categoriaUsuarios: CategoriaUsuarios = new CategoriaUsuariosBuilder(
      categoriaUsuarioDataTest.nombre,
      categoriaUsuarioDataTest.valorAlta,
      categoriaUsuarioDataTest.valorBaja
    )
    .setDescripcion( categoriaUsuarioDataTest.descripcion )
    .build();
    
    // Assert
    expect( _categoriaUsuarios.nombre ).toEqual( categoriaUsuarioDataTest.nombre );
    expect( _categoriaUsuarios.descripcion ).toEqual( categoriaUsuarioDataTest.descripcion );
    expect( _categoriaUsuarios.valorAlta ).toEqual( categoriaUsuarioDataTest.valorAlta );
    expect( _categoriaUsuarios.valorBaja ).toEqual( categoriaUsuarioDataTest.valorBaja );
  });

  it('Categoría de usuarios debería crearse con los valores por defecto', () => {

    // Arrange & Act
    const _categoriaUsuarios: CategoriaUsuarios = new CategoriaUsuariosBuilder(
      categoriaUsuarioDataTest.nombre,
      categoriaUsuarioDataTest.valorAlta,
      categoriaUsuarioDataTest.valorBaja
    )
    .setValorAlta( 60000 )
    .setValorBaja( 40000 )
    .setNombre( 'Categoría con valores por defecto' )
    .build();

    // Assert
    expect( _categoriaUsuarios.nombre ).toEqual( 'Categoría con valores por defecto' );
    expect( _categoriaUsuarios.descripcion ).toBe('');
  });
});
