import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';

@Entity({
  name: 'drivers',
})
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('date')
  dob: Date;

  @Column('varchar')
  country: string;

  @Column('varchar', {
    name: 'place_of_birth',
  })
  placeOfBirth: string;

  @Column('float')
  points: number;

  @Column('integer')
  podiums: number;

  @Column('integer', {
    name: 'world_champions',
  })
  worldChampions: number;

  @ManyToOne(() => Team, (team) => team.drivers, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: 'team_id',
  })
  team: string | Team;
}
