import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        migrations: [join(__dirname, '**', '*.entity.{ts,js}')],
        migrationsTableName: 'migration_history',
        migrationsRun: true,
        synchronize: configService.get('DB_SYNCRONIZE'),
      }),
    }),
  ],
})
export class DatabaseModule {}
