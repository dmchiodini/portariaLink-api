import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { ResidentsModule } from './residents/residents.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CondominiumsModule } from './condominiums/condominiums.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ResidentsModule,
    DeliveriesModule,
    CondominiumsModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
