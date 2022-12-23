import { SetMetadata } from '@nestjs/common';
import { Roles } from '../entities/roles.enum';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: Roles[]) =>
  SetMetadata(META_ROLES, args);
