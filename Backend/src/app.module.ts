import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MaintenancesModule } from './maintenances/maintenances.module';
import { TechniciansModule } from './technicians/technicians.module';
import { PicturesModule } from './pictures/pictures.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    AuthModule,
    UsersModule,
    MaintenancesModule,
    TechniciansModule,
    PicturesModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
