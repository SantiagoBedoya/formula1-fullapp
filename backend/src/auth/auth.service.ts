import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Roles } from './entities/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto, isAdmin = false) {
    const currentUser = await this.findByEmail(registerDto.email);
    if (currentUser) throw new BadRequestException('email already in use');

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(registerDto.password, salt);
    const user = this.userRepository.create({
      ...registerDto,
      password: hash,
      role: isAdmin ? Roles.ADMIN : Roles.USER,
    });
    await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException('invalid credentials (email)');
    const isValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('invalid credentials (password)');
    }
    const token = this.jwtService.sign({ userId: user.id });
    return { accessToken: token };
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
}
