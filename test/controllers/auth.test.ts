import { TestingModule, Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { useDataSource } from '@jorgebodega/typeorm-seeding';
import AppDataSource from '../../src/database/datasource';
import { DataSource } from 'typeorm';
import { RefreshTokenDto } from 'src/users/controllers/dtos/token.dto';
import { Tokens } from '../../src/users/domain/entities';
import { sign } from 'jsonwebtoken';
import { LogInDto, RegisterDto } from 'src/users/controllers/dtos';

describe('AuthController', () => {
  let app: INestApplication;
  let server: any;
  let datasource: DataSource;

  let tokens: Tokens;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
    datasource = await AppDataSource.initialize();
    await useDataSource(datasource);
  }, 20000);

  afterAll(async () => {
    await app.close();
    server.close();
    const queryRunner = datasource.createQueryRunner();
    await queryRunner.clearTable('user');
    await datasource.destroy();
  });

  it('/register (POST)', async () => {
    const payload: RegisterDto = {
      email: 'test@test.com',
      password: 'password',
    };

    const response = await request(server).post('/register').send(payload);

    expect(response.status).toBe(201);
  });

  it('/register (POST) - Email already exists', async () => {
    const payload: RegisterDto = {
      email: 'test@test.com',
      password: 'password',
    };

    const response = await request(server).post('/register').send(payload);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email already exists');
  });

  it('/login (POST)', async () => {
    const payload: LogInDto = {
      email: 'test@test.com',
      password: 'password',
    };

    const response = await request(server).post('/login').send(payload);

    expect(response.status).toBe(201);
    tokens = response.body.data as Tokens;

    expect(tokens).toHaveProperty('accessToken');
    expect(tokens).toHaveProperty('refreshToken');
  });

  it('/login (POST) - password is not correct', async () => {
    const payload: LogInDto = {
      email: 'test@test.com',
      password: '12345',
    };

    const response = await request(server).post('/login').send(payload);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Password is not correct');
  });

  it('/login (POST) - User not found', async () => {
    const payload: LogInDto = {
      email: 'not_found@test.com',
      password: '12345',
    };

    const response = await request(server).post('/login').send(payload);

    expect(response.status).toBe(404);
    expect(response.body.statusCode).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  it('/refreshTokens (POST)', async () => {
    const payload: RefreshTokenDto = {
      refreshToken: tokens.refreshToken,
    };

    const response = await request(server).post('/refreshTokens').send(payload);

    expect(response.status).toBe(201);
    const newTokens = response.body.data as Tokens;

    expect(newTokens).toHaveProperty('accessToken');
    expect(newTokens.accessToken.length).toBeGreaterThan(20);
    expect(newTokens).toHaveProperty('refreshToken');
    expect(newTokens.refreshToken.length).toBeGreaterThan(20);
  });

  it('/refreshTokens (POST) - Invalid refresh token', async () => {
    const payload: RefreshTokenDto = {
      refreshToken: sign({ id: 'someId' }, 'wrongKey'),
    };

    const response = await request(server).post('/refreshTokens').send(payload);

    expect(response.status).toBe(404);
  });

  it('/logout (POST)', async () => {
    const response = await request(server)
      .post('/logout')
      .send()
      .set({ Authorization: 'Bearer ' + tokens.accessToken });

    expect(response.status).toBe(201);
  });

  it('/refreshTokens (POST) - Already logged out', async () => {
    const payload: RefreshTokenDto = {
      refreshToken: tokens.refreshToken,
    };

    const response = await request(server).post('/refreshTokens').send(payload);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('forbiddenError');
  });
});
