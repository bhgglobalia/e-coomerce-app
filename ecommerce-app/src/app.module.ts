import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { CartsModule } from './carts/carts.module';
import { Cart } from './carts/cart.entity';

import { CartItem } from './carts/cart-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'newpassword',
      database: 'e-commerce',
      entities: [User, Product, Cart, CartItem],  
      synchronize: true, 
    }),
    JwtModule.register({
      secret: 'supersecretkey123',
      signOptions: { expiresIn: '3600s' },
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CartsModule,
  ],
})
export class AppModule {}

