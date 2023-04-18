import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { useDataSource, useSeeders } from '@jorgebodega/typeorm-seeding';
import { UsersCreate } from '../../src/database/seeds/1651763625266-UsersCreate';
import AppDataSource from '../../src/database/datasource';

describe('UsersController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const datasource = await AppDataSource.initialize();

    // Config to set up Database connection and to initialize migrations and seeders
    await datasource.dropDatabase();
    await datasource.runMigrations();
    await useDataSource(datasource);

    await useSeeders(UsersCreate);
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/users');
    expect(response.status).toBe(200);
    expect(response.body.data[0]).toHaveProperty('id');
    expect(response.body.data[0]).toHaveProperty('firstName');
    expect(response.body.data[0]).toHaveProperty('lastName');
    expect(response.body.data[0]).toHaveProperty('email');
  });
});
