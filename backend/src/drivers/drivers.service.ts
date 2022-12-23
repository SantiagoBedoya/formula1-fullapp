import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    const driver = this.driverRepository.create(createDriverDto);
    await this.driverRepository.save(driver);
    return driver;
  }

  async findAll(): Promise<Driver[]> {
    const drivers = await this.driverRepository.find();
    return drivers;
  }

  async findOne(id: string): Promise<Driver> {
    const driver = await this.driverRepository.findOneBy({ id });
    if (!driver) throw new NotFoundException('driver not found');
    return driver;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    let driver = await this.findOne(id);
    driver = await this.driverRepository.preload({
      ...driver,
      ...updateDriverDto,
    });
    await this.driverRepository.save(driver);
    return driver;
  }

  async remove(id: string): Promise<Driver> {
    const driver = await this.findOne(id);
    await this.driverRepository.remove(driver);
    return driver;
  }
}
