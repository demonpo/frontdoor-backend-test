import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type JWTPayload = {
  sub: string;
  name: string;
  email: string;
  iat: number;
};

export type JWTPayloadKeys = keyof JWTPayload;

export const JWT = createParamDecorator<JWTPayloadKeys>(
  (data: JWTPayloadKeys, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtPayload = request.jwtPayload as JWTPayload;

    return data ? jwtPayload?.[data] : jwtPayload;
  },
);
