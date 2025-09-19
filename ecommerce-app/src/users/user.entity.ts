import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn } from 'typeorm';
import { Cart } from 'src/carts/cart.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string; // 'customer' or 'admin'

  @CreateDateColumn()
  createdAt: Date;
  
  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}
