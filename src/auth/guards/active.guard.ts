import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UserRes } from '@types';

@Injectable()
export class ActiveGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user }: { user: UserRes } = context.switchToHttp().getRequest();

    return user?.is_active ?? false;
  }
}
