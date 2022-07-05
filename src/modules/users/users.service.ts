import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../../models/user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from '../../common/interfaces/jwt.interface';
import * as ENV from '../../config/env.config';
import { IServiceResponse } from '../../common/interfaces/service.interface';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisCache } from '../../common/helpers/utilities/redis.utilities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(payload): Promise<IServiceResponse> {
    try {
      const foundUser = await this.usersRepository.findOne({
        where: { email: payload.email },
      });
      if (foundUser) {
        throw new BadRequestException('Email already exist');
      }
      const user = new User();
      user.first_name = payload.first_name;
      user.last_name = payload.last_name;
      user.email = payload.email.toLowerCase();
      user.username = payload.username;
      user.phone_number = payload.phone_number;
      user.password = bcrypt.hashSync(payload.password, 10);
      await this.usersRepository.save(user);
      const account = await this.usersRepository.findOne({
        where: {
          id: user.id,
        },
      });
      return {
        data: {
          ...account.toJSON(),
        },
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async login(payload): Promise<IServiceResponse> {
    payload.email = payload.email.toLowerCase();
    const user = await this.usersRepository.findOne({
      where: { email: payload.email },
    });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    if (!bcrypt.compareSync(payload.password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }
    const token = await this.signToken(user);
    await RedisCache.setter(token, JSON.stringify(user.toJSON()), 30);
    return {
      data: {
        ...user.toJSON(),
        token,
      },
    };
  }

  async getProfile(user: User): Promise<IServiceResponse> {
    const profile = await this.usersRepository.findOne({
      where: { id: user.id },
    });
    return {
      data: profile.toProfile(),
    };
  }

  async signToken(user: User) {
    const payload: JwtPayload = {
      id: user.id,
    };
    return sign(payload, ENV.JWT_SECRET, { expiresIn: '60 * 30' });
  }
}
