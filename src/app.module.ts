import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ShopsModule } from './shops/shops.module';
import { ProductsModule } from './products/products.module';
import { StocksModule } from './stocks/stocks.module';
import { StockMovementsModule } from './stock-movements/stock-movements.module';
import { SalesModule } from './sales/sales.module';
import { SalesItemsModule } from './sales-items/sales-items.module';
import { PaymentsModule } from './payments/payments.module';
import { PaymentDetailsModule } from './payment-details/payment-details.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'nindamey11',
      database: 'jayatrack',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false, // set false if going to production
    }),
    InventoryModule,
    UsersModule,
    AuthModule,
    ShopsModule,
    ProductsModule,
    StocksModule,
    StockMovementsModule,
    SalesModule,
    SalesItemsModule,
    PaymentsModule,
    PaymentDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
