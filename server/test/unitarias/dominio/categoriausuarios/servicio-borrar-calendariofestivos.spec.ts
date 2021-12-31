import { SinonStubbedInstance } from 'sinon';
import { NotFoundException } from '@nestjs/common';
import { createStubObj } from '../../../util/create-object.stub';
import { ServicioBorrarCategoriaUsuarios } from '../../../../src/dominio/categoriausuarios/servicio/servicio-borrar-categoriausuarios';
import { RepositorioCategoriaUsuarios } from '../../../../src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';



describe('ServicioBorrarCategoriaUsuarios', () => {

  let servicioBorrarCategoriaUsuarios: ServicioBorrarCategoriaUsuarios;
  let repositorioCategoriaUsuariosStub: SinonStubbedInstance<RepositorioCategoriaUsuarios>;

  beforeEach(() => {

    // Stub Repository Methods
    repositorioCategoriaUsuariosStub = createStubObj<RepositorioCategoriaUsuarios>([
      'existeCategoriaUsuarios',
      'borrar'
    ]);

    // Re-instanciate service
    servicioBorrarCategoriaUsuarios = new ServicioBorrarCategoriaUsuarios( repositorioCategoriaUsuariosStub );
  });

  it( 'Una categoría de usuarios no debería borrarse en el repositorio si no existe', async () => {

    // Arrange
    const calendarioId = 1;
    repositorioCategoriaUsuariosStub.existeCategoriaUsuarios.returns( Promise.resolve( false ) );

    /**
     * Act & Assert
     * Send any number
     */
    await expect( servicioBorrarCategoriaUsuarios.ejecutar( calendarioId ) )
      .rejects
      .toThrowError( NotFoundException );
  });

  it( 'Una categoría de usuarios debería borrarse en el repositorio si existe', async () => {

    // Arrange
    const calendarioId = 1;
    repositorioCategoriaUsuariosStub.existeCategoriaUsuarios.returns( Promise.resolve( true ) );

    /**
     * Act
     * Send any number & class {CategoriaUsuarios} Object
     */
    await servicioBorrarCategoriaUsuarios.ejecutar( calendarioId );

    // Assert
    expect( repositorioCategoriaUsuariosStub.borrar.getCalls().length ).toBe(1);
    expect( repositorioCategoriaUsuariosStub.borrar.calledWith( calendarioId )).toBeTruthy();
  });
});