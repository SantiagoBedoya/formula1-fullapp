import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = this.carRepository.create(createCarDto);
    await this.carRepository.save(car);
    return car;
  }

  async findAll(): Promise<Car[]> {
    const cars = await this.carRepository.find();
    return cars;
  }

  async findOne(id: string): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: { id: id },
      relations: { predecessor: true },
    });
    if (!car) throw new NotFoundException('car not found');
    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    let car = await this.findOne(id);
    car = await this.carRepository.preload({ ...car, ...updateCarDto });
    await this.carRepository.save(car);
    return car;
  }

  async remove(id: string) {
    const car = await this.findOne(id);
    await this.carRepository.remove(car);
    return car;
  }
}
