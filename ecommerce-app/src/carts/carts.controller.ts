import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CartsService } from './carts.service';

@Controller('carts')
@UseGuards(JwtAuthGuard)
export class CartsController {
    constructor(private readonly cartsService: CartsService) { }

    @Get()
    getCart(@Request() req) {
        return this.cartsService.getCart(req.user.id);
    }

    @Post('add')
    addTocart(@Request() req, @Body() body: { productId: string; quantity: number }) {
        return this.cartsService.addToCart(req.user.id, body.productId, body.quantity);
    }

    @Post('remove')
    removeFromCart(@Request() req, @Body() body: { productId: string }) {
        return this.cartsService.removeFromCart(req.user.id, body.productId);
    }

    @Put('update')
    updateQuantity(@Request() req, @Body() body: { productId: string; quantity: number }) {
        return this.cartsService.updateQuantity(req.user.id, body.productId, body.quantity);
    }
}
