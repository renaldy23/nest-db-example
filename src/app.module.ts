import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { DatabaseModule } from './database/database.module';
import { TodoModule } from './todo/todo.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().allow(''),
        DB_DATABASE: Joi.string().required(),
        DB_SYNCRONIZE: Joi.boolean().required(),
      }),
    }),
    DatabaseModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
