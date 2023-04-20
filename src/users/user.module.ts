import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { UserEntity } from './infra/typeorm/entities';
import { UserRepository } from './domain/contracts/repositories';
import { TypeOrmUserRepository } from './infra/typeorm/repositories';
import { UsersService } from './domain/services/users.service';
import { UserController } from './controllers/user.controller';
import { HashGenerator, JWTGenerator } from './domain/contracts/gateways';
import {
  BCryptHashGenerator,
  JsonWebTokenJWTGenerator,
} from './infra/gateways';
import { AuthService } from './domain/services';
import { AuthController } from './controllers/auth.controller';
import JwtHandler from '../shared/infra/middlewares/jwt-handler.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SharedModule],
  providers: [
    {
      provide: UserRepository, // Used as a symbol
      useClass: TypeOrmUserRepository,
    },
    {
      provide: HashGenerator,
      useClass: BCryptHashGenerator,
    },
    {
      provide: JWTGenerator,
      useClass: JsonWebTokenJWTGenerator,
    },
    UsersService,
    AuthService,
  ],
  controllers: [UserController, AuthController],
  exports: [TypeOrmModule],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtHandler())
      .exclude(
        { path: 'register', method: RequestMethod.POST },
        { path: 'login', method: RequestMethod.POST },
        { path: 'refreshTokens', method: RequestMethod.POST },
      )
      .forRoutes(UserController, AuthController);
  }
}
