import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { SharedModule } from './shared/shared.module';
import typeormConfig from './database/typeorm-config';
import { HighlightModule } from './highlights/highlight.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeormConfig,
    }),
    UserModule,
    HighlightModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
