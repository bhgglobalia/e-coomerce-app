import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productRemp: Repository<Product>) { }

    async create(productData: Partial<Product>): Promise<Product> {
        const product = this.productRemp.create(productData);
        return this.productRemp.save(product);
    }

    async findAll(): Promise<Product[]> {
        return this.productRemp.find();
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productRemp.findOne({ where: { id } });
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    async update(id: string, updateData: Partial<Product>): Promise<Product> {
        const product = await this.findOne(id);
        Object.assign(product, updateData);
        return this.productRemp.save(product);
    }

    async remove(id: string): Promise<{ message: string }> {
        const product = await this.findOne(id);
        await this.productRemp.remove(product);
        return { message: "Product deleted successfully" };
    }

}
