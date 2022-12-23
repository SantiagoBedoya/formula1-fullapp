import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cars' })
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    unique: true,
  })
  name: string;

  @OneToOne(() => Car, (car) => car.id, {
    nullable: true,
  })
  @JoinColumn({
    name: 'predecessor_id',
  })
  predecessor: string | Car;

  @Column('varchar', {
    name: 'engine_name',
  })
  engineName: string;

  @Column('varchar')
  tires: string;
}
