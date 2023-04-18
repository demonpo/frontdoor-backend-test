import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infra/typeorm/entities/user.entity';
import { UserRepository } from './domain/contracts/repositories/user-repository';
import { ImplUserRepository } from './infra/typeorm/repositories/impl-user-repository';
import { UsersService } from './domain/services/users.service';
import { ExampleMiddleware } from '../shared/infra/middlewares/example.middleware';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SharedModule],
  providers: [
    {
      provide: UserRepository, // Used as a symbol
      useClass: ImplUserRepository,
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
