import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const option = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'nindamey11',
  database: 'jayatrack',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  seeds: ['src/database/seeders/*.ts'],
} as DataSourceOptions & SeederOptions;

export const AppDataSource = new DataSource(option);
