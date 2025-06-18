import CONNECTION from 'db.connection';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  ...CONNECTION,
  entities: [`${__dirname}/**/entities/*.entity.*`],
  migrations: [`${__dirname}/**/migrations/*`],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
