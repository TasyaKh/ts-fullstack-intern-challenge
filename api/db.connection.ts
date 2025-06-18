import { config } from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

config();

const CONNECTION: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? 'cat-pinterest-api-pg',
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  username: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? '1',
  database: process.env.POSTGRES_DB ?? 'support_lk_db',
};
export default CONNECTION;
