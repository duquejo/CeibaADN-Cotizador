import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';

import { CategoriaUsuarios } from '../../../../src/dominio/categoriausuarios/modelo/categoriausuarios';
import { ServicioGuardarCategoriaUsuarios } from '../../../../src/dominio/categoriausuarios/servicio/servicio-guardar-categoriausuarios';
import { RepositorioCategoriaUsuarios } from '../../../../src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';

describe('ServicioGuardarCategoriaUsuarios', () => {

  const _CategoriaUsuarios = CategoriaUsuarios as any;

  let servicioGuardarCategoriaUsuarios: ServicioGuardarCategoriaUsuarios;
  let repositorioCategoriaUsuariosStub: SinonStubbedInstance<RepositorioCategoriaUsuarios>;
  
  const categoriaUsuarioDataTest = {
    nombre: "Categoría de asociados 1",
    descripcion: "Plan de pruebas",
    valorAlta: 50000,
    valorBaja: 25000
  };

  beforeEach(() => {
    
    // Stub Repository Methods
    repositorioCategoriaUsuariosStub = createStubObj<RepositorioCategoriaUsuarios>([ 
      'guardar'
    ]);

    // Re-instanciate service
    servicioGuardarCategoriaUsuarios = new ServicioGuardarCategoriaUsuarios( repositorioCategoriaUsuariosStub );
  });

  it( 'Una categoría de usuarios debería guardarse en el repositorio', async () => {

    // Arrange
    const categoriaUsuarioValues = Object.values( categoriaUsuarioDataTest );
    const categoriaUsuario = new _CategoriaUsuarios( ...categoriaUsuarioValues );

    await servicioGuardarCategoriaUsuarios.ejecutar( categoriaUsuario );

    expect( repositorioCategoriaUsuariosStub.guardar.getCalls().length ).toBe(1);
    expect( repositorioCategoriaUsuariosStub.guardar.calledWith( categoriaUsuario )).toBeTruthy();
  });
});