import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleMiddleware } from '../shared/infra/middlewares/example.middleware';
import { SharedModule } from '../shared/shared.module';
import { UserEntity } from './infra/typeorm/entities';
import { UserRepository } from './domain/contracts/repositories';
import { TypeOrmUserRepository } from './infra/typeorm/repositories';
import { UsersService } from './domain/services/users.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SharedModule],
  providers: [
    {
      provide: UserRepository, // Used as a symbol
      useClass: TypeOrmUserRepository,
    },
    UsersService,
  ],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExampleMiddleware).forRoutes(UserController);
  }
}
