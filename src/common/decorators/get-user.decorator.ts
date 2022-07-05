import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    try {
      const request = ctx.switchToHttp().getRequest();
      if (!request.user) {
        throw new UnauthorizedException('Unauthorized request');
      }
      return request.user;
    } catch (e) {
      throw new UnauthorizedException('Unauthorized request');
    }
  },
);
