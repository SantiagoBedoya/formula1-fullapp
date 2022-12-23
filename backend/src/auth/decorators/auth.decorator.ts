import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from '../entities/roles.enum';
import { JwtGuard } from '../guards/jwt.guard';
import { UserRoleGuard } from '../guards/user-role.guard';
import { RoleProtected } from './role-protected.decorator';

export function Auth(...roles: Roles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(JwtGuard, UserRoleGuard),
  );
}
