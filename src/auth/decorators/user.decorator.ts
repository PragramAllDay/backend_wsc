import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserRes } from '@types';

type Req = Express.Request & {
  user: UserRes;
};

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserRes => {
    const request: Req = ctx.switchToHttp().getRequest();
    return request.user as UserRes;
  },
);
