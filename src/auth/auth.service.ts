import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(login: LoginDto) {
    const user = await this.usersService.findByEmail(login.email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (user.password !== login.password)
      throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };

    const { password, ...safeUser } = user;
    const token = await this.jwtService.signAsync(payload);

    return { user: safeUser, token };
  }

  async register(createUser: CreateUserDto) {
    const userExists = await this.usersService.findByEmail(createUser.email);

    if (userExists) throw new BadRequestException('User already exists');

    const { password, ...safeUser } =
      await this.usersService.create(createUser);

    return { user: safeUser };
  }
}
