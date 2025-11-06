import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(login: LoginDto) {
    const user = await this.usersService.findByEmail(login.email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (user.password !== login.password)
      throw new UnauthorizedException('Invalid credentials');

    const token = { token: 'your-token' };
    const { password, ...safeUser } = user;

    return { user: safeUser, token };
  }
}
