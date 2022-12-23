import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from './cars/cars.module';
import { DriversModule } from './drivers/drivers.module';
import { TeamsModule } from './teams/teams.module';
import type { RedisClientOptions } from 'redis';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        database: configService.get<string>('DATABASE_NAME'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      // store: redisStore,
      // url: 'redis://localhost:6379',
    }),
    CarsModule,
    DriversModule,
    TeamsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
