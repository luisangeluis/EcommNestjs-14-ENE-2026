import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async login(@Body() login: LoginDto) {
    const { email, password } = login;
    const user = await this.usersService.findByEmail(email);
    //validate
  }

  @Post()
  async register() {}
}
