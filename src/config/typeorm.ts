import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mohit',
  database: 'backendDiageo',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
};
