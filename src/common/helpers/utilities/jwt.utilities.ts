import { JwtPayload } from '../../../common/interfaces/jwt.interface';
import { IServiceResponse } from '../../../common/interfaces/service.interface';
import { JWT_SECRET } from '../../../config/env.config';
import { User } from '../../../models/user.entity';
import { sign } from 'jsonwebtoken';

export class JwtHelper {
  static async signToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      id: user.id,
    };
    return sign(payload, JWT_SECRET, { expiresIn: '1hr' });
  }

  static async refreshJWT(user: User): Promise<IServiceResponse> {
    const token = await this.signToken(user);
    return {
      data: {
        token,
      },
    };
  }
}
