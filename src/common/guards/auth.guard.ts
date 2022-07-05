import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../modules/users/users.service';
import { RedisCache } from '../utilities/redis.utilities';
import { Repository } from 'typeorm';
import { User } from '../../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const Authorization = request.get('Authorization');
      if (!Authorization) {
        throw new UnauthorizedException('Unauthorized request');
      }
      const token = Authorization.split(' ');
      if (!((token[1] && token[0] === 'Bearer') || token[0] === 'bearer')) {
        throw new UnauthorizedException('Unauthorized request');
      }
      const cacheAccount = await RedisCache.getter(token[1]);
      const user = await this.usersRepository.findOne({
        where: { id: cacheAccount.data.id },
      });
      if (!user) {
        throw new UnauthorizedException('Unauthorized request');
      }

      if (cacheAccount.status) {
        request.user = JSON.parse(cacheAccount.data);
        return true;
      }

      await RedisCache.setter(token[1], JSON.stringify(user.toJSON()), 30);
      return true;
    } catch (e) {
      throw new UnauthorizedException('Unauthorized request');
    }
  }
}
