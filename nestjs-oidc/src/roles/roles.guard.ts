import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }

    //const request = context.switchToHttp().getRequest();
    const { user } = context.switchToHttp().getRequest();
    console.log(`RolesGuard user: ${user.roles}`);
    return matchRoles(roles, user.roles);
  }
}

function matchRoles(wantedRoles: string[], userRoles: string[]): boolean {
  const wantedSet = new Set(wantedRoles);
  return userRoles.some((role) => wantedSet.has(role));
}
