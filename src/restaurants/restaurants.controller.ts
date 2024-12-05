import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BaseController } from '../utils/base-controller';
import { RestaurantsService } from './restaurants.service';
import { JwtAuthnGuard } from '../authentication/jwt.guard';

@Controller('api/v1/restaurants')
export class RestaurantsController extends BaseController {
  constructor(protected readonly service: RestaurantsService) {
    super(service);
  }
  @Post()
  async addRestaurant(@Body() data, @Req() req) {
    return this.service.addRestaurant(data, await this.getMeta({ req }));
  }

  @Get('/:id/profile')
  async getRestaurantProfile(@Param() data, @Req() req) {
    return this.service.getRestaurantProfile(data, await this.getMeta({ req }));
  }

  @Post('/:userId/userPreferences')
  @UseGuards(JwtAuthnGuard)
  async setUserRestaurantPreferences(@Body() data, @Req() req) {
    return this.service.setUserRestaurantPreferences(
      data,
      await this.getMeta({ req }),
    );
  }

  @Get('/:userId/userPreferences')
  @UseGuards(JwtAuthnGuard)
  async getUserRestaurantPreferences(@Param() data, @Req() req) {
    return this.service.getUserRestaurantPreferences(
      data,
      await this.getMeta({ req }),
    );
  }
  /********************************************************************* */
  @Get('/:id/allMenus')
  async getRestaurantMenus(@Param('id') restaurantId: string, @Req() req) {
    return this.service.getRestaurantMenus(
      { restaurantId },
      await this.getMeta({ req }),
    );
  }
  @Post('/:id/menu')
  async addRestaurantMenu(@Body() data, @Req() req) {
    return this.service.addRestaurantMenu(data, await this.getMeta({ req }));
  }
  @Patch('/:id/menu')
  async updateRestaurantMenu(@Body() data, @Req() req) {
    return this.service.updateRestaurantMenu(data, await this.getMeta({ req }));
  }
  @Patch('/:id/menuItem')
  async updateMenuItem(@Body() data, @Req() req) {
    return this.service.updateMenuItem(data, await this.getMeta({ req }));
  }
}
