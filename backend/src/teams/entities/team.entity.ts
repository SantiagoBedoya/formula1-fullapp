import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Driver } from '../../drivers/entities/driver.entity';

@Entity({ name: 'teams' })
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    unique: true,
    name: 'short_name',
  })
  shortName: string;

  @Column('varchar', {
    name: 'full_name',
  })
  fullName: string;

  @Column('varchar')
  base: string;

  @Column('varchar', {
    name: 'team_chief',
  })
  teamChief: string;

  @Column('varchar', {
    name: 'technical_chief',
  })
  technicalChief: string;

  @Column('varchar')
  chasis: string;

  @Column('varchar', {
    name: 'power_unit',
  })
  powerUnit: string;

  @Column('varchar', {
    name: 'first_team_entry',
  })
  firstTeamEntry: string;

  @Column('integer', {
    name: 'world_champions',
  })
  worldChampions: number;

  @Column('varchar', {
    name: 'highest_race_finish',
  })
  highestRaceFinish: string;

  @Column('integer', {
    name: 'pole_positions',
  })
  polePositions: number;

  @Column('integer', {
    name: 'fastest_laps',
  })
  fastestLaps: number;

  @OneToMany(() => Driver, (driver) => driver.team)
  drivers: Driver[];

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedAt: Date;
}
