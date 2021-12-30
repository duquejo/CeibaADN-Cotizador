import { createConnection, getConnection } from 'typeorm';

const app = `http://localhost:3000/api`;
const connection = {

  async create(){
    const conn = await createConnection();
  },

  async clear(){
    const connection = getConnection();
    const entities = connection.entityMetadatas;
    entities.forEach(async (entity) => {
      const repository = connection.getRepository( entity.name );
      await repository.query( `DELETE FROM ${ entity.tableName }` );
    });
  },

  async close(){
    const connection = getConnection();
    if( connection.isConnected ) {
      await getConnection().close(); 
    }
  },
};

export { connection, app };