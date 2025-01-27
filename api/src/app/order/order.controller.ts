import { Body, Controller, Post, Session } from '@nestjs/common';

import { RequiresAuth } from '../auth/decorators/requires-auth.decorator';
import { UserSession } from '../user/interfaces/user-session.interface';
import { CreateDTO } from './dtos/create.dto';
import { OrderService } from './order.service';

@Controller('/api/v1/order')
@RequiresAuth(true)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('create')
  async create(@Body() { orderElements }: CreateDTO, @Session() { user }: UserSession) {
    let productsIDs = [];
    for (const element of orderElements) {
      productsIDs.push(element.productID);
    }
    await this.orderService.createOne(orderElements, user.id, productsIDs);

    return { message: 'Your order has been successfully registered.' };
  }
}
