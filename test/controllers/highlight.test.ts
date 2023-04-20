import { TestingModule, Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { useDataSource, useSeeders } from '@jorgebodega/typeorm-seeding';
import AppDataSource from '../../src/database/datasource';
import { DataSource } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { env } from '../../src/config/env';
import { HighlightTestCreate } from '../../src/database/seeds/1682005976795-HighlightTestCreate';
import { CreateHighlightDto } from '../../src/highlights/controllers/dtos';

describe('HighlightController', () => {
  let app: INestApplication;
  let server: any;
  let dataSource: DataSource;

  const baseRoute = '/highlight';
  let mockToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
    dataSource = await AppDataSource.initialize();
    // Config to set up Database connection and to initialize migrations and seeders
    await useDataSource(dataSource);
    await useSeeders(HighlightTestCreate);

    mockToken = sign(
      { sub: '64415e38f2450f0127bd039d' },
      env.jwtSecretAccessKey,
      {
        expiresIn: '5m',
      },
    );
  }, 20000);

  afterAll(async () => {
    await app.close();
    server.close();
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.clearTable('user');
    await queryRunner.clearTable('highlight');
    await dataSource.destroy();
  });

  it('/highlight (GET)', async () => {
    const response = await request(server)
      .get(baseRoute)
      .set({ Authorization: 'Bearer ' + mockToken });
    expect(response.status).toBe(200);

    expect(response.body.data).toHaveLength(3);

    expect(response.body.data[0]).toHaveProperty('id');
    expect(response.body.data[0]).toHaveProperty('content');
    expect(response.body.data[0]).toHaveProperty('summary');
    expect(response.body.data[0]).toHaveProperty('createdAt');
    expect(response.body.data[0]).toHaveProperty('tags');
  });

  it('/highlight (POST)', async () => {
    const highlightDto: CreateHighlightDto = {
      content:
        'The study outcomes included incident CHD and stroke. CHD was defined as hospitalized myocardial infarction, definite silent myocardial infarction, or death due to coronary disease. Stroke was defined as rapid onset of a persistent neurologic deficit attributed to an obstruction or rupture of the brain arterial system, lasting more than 24 h and without evidence for other cause.',
    };

    const response = await request(server)
      .post(baseRoute)
      .send(highlightDto)
      .set({ Authorization: 'Bearer ' + mockToken });
    expect(response.status).toBe(201);

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data).toHaveProperty('content');
    expect(response.body.data).toHaveProperty('summary');
    expect(response.body.data).toHaveProperty('tags');
    expect(response.body.data.tags.length).toBeGreaterThanOrEqual(2);
    expect(response.body.data.tags.length).toBeLessThanOrEqual(3);
  });
});
