import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from './roles.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar', {
    unique: true,
  })
  email: string;

  @Column('varchar')
  password: string;

  @Column('enum', {
    enum: Roles,
    default: Roles.USER,
  })
  role: Roles;
}
