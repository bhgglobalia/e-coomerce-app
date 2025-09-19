import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { Product } from 'src/products/product.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartsRepo: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemsRepo: Repository<CartItem>,
    @InjectRepository(Product) private productsRepo: Repository<Product>,
  ) {}

  async getCart(userId: string) {
    let cart = await this.cartsRepo.findOne({ where: { userId } });
    if (!cart) {
      cart = this.cartsRepo.create({ userId, items: [] });
      await this.cartsRepo.save(cart);
    }
    return cart;
  }

  async addToCart(userId: string, productId: string, quantity: number) {
    const product = await this.productsRepo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    let cart = await this.getCart(userId);

    let item = cart.items.find((i) => i.productId === productId);
    if (item) {
      item.quantity += quantity;
      await this.cartItemsRepo.save(item);
    } else {
      item = this.cartItemsRepo.create({ cartId: cart.id, productId, quantity });
      await this.cartItemsRepo.save(item);
    }

    return this.getCart(userId);
  }

  async removeFromCart(userId: string, productId: string) {
    const cart = await this.getCart(userId);
    const item = cart.items.find((i) => i.productId === productId);
    if (!item) throw new NotFoundException('Item not in cart');

    await this.cartItemsRepo.remove(item);
    return this.getCart(userId);
  }

  async updateQuantity(userId: string, productId: string, quantity: number) {
    const cart = await this.getCart(userId);
    const item = cart.items.find((i) => i.productId === productId);
    if (!item) throw new NotFoundException('Item not in cart');

    item.quantity = quantity;
    await this.cartItemsRepo.save(item);

    return this.getCart(userId);
  }
}
