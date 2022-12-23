import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const currentTeam = await this.findOneByShortName(createTeamDto.shortName);
    if (currentTeam) throw new BadRequestException('team already exists');
    const team = this.teamRepository.create(createTeamDto);
    await this.teamRepository.save(team);
    return team;
  }

  async findAll() {
    const teams = await this.teamRepository.find();
    return teams;
  }

  async findOne(id: string): Promise<Team> {
    const team = await this.teamRepository.findOneBy({ id });
    if (!team) throw new NotFoundException('team not found');
    return team;
  }

  async findOneByShortName(shortName: string) {
    const team = await this.teamRepository.findOne({ where: { shortName } });
    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    let team = await this.findOne(id);
    team = await this.teamRepository.preload({ ...team, ...updateTeamDto });
    await this.teamRepository.save(team);
    return team;
  }

  async remove(id: string) {
    const team = await this.findOne(id);
    await this.teamRepository.remove(team);
    return team;
  }
}
