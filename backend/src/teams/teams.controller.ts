import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  CacheInterceptor,
  CacheTTL,
  CacheKey,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Roles } from '../auth/entities/roles.enum';

@Controller('teams')
@UseInterceptors(CacheInterceptor)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Auth(Roles.ADMIN)
  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  async findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamsService.findOne(id);
  }

  @Auth(Roles.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Auth(Roles.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamsService.remove(id);
  }
}
