import { ServicioRegistrarUsuario } from 'src/dominio/usuario/servicio/servicio-registrar-usuario';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioRegistrarUsuario', () => {

  let servicioRegistrarUsuario: ServicioRegistrarUsuario;
  let repositorioUsuarioStub: SinonStubbedInstance<RepositorioUsuario>;

  beforeEach(() => {

    repositorioUsuarioStub = createStubObj<RepositorioUsuario>(['existeNombreUsuario', 'guardar']);
    servicioRegistrarUsuario = new ServicioRegistrarUsuario(repositorioUsuarioStub);
  });

  it('si el nombre de usuario ya existe no se puede crear y deberia retonar error', async () => {

    repositorioUsuarioStub.existeNombreUsuario.returns(Promise.resolve(true));

    await expect(
      servicioRegistrarUsuario.ejecutar(
        new Usuario('juan', '1234', new Date().toISOString()),
      ),
    ).rejects.toThrow('El nombre de usuario juan ya existe');
  });

  it('si el nombre no existe guarda el usuario el repositorio', async () => {
    const usuario = new Usuario('juan', '1234', new Date().toISOString());
    repositorioUsuarioStub.existeNombreUsuario.returns(Promise.resolve(false));

    await servicioRegistrarUsuario.ejecutar(usuario);

    expect(repositorioUsuarioStub.guardar.getCalls().length).toBe(1);
    expect(repositorioUsuarioStub.guardar.calledWith(usuario)).toBeTruthy();
  });
});
