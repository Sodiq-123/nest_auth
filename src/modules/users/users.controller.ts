import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppLogger } from '../../common/logger/logger';
import { LoginDTO, RegisterDTO } from '../../common/dto/user.dto';
import { UsersService } from './users.service';
import { HttpResponse } from '../../common/utilities/response.utilites';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  async registerUser(@Body() body: RegisterDTO) {
    AppLogger.log('Create User...');
    const response = await this.usersService.create(body);
    AppLogger.log('Successful returning response ' + JSON.stringify(response));
    return HttpResponse.send('registration successful', response);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'login a user' })
  async loginUser(@Body() body: LoginDTO) {
    AppLogger.log('Login User...');
    const response = await this.usersService.login(body);
    AppLogger.log('Successful returning response ' + JSON.stringify(response));
    return HttpResponse.send('login successful', response);
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get a logged in users' profile" })
  @ApiBearerAuth()
  async getProfile(@GetUser() user) {
    AppLogger.log('Get Profile', JSON.stringify(user));
    const response = await this.usersService.getProfile(user);
    AppLogger.log('Successful returning response ' + JSON.stringify(response));
    return HttpResponse.send('profile retrieved', response);
  }
}
