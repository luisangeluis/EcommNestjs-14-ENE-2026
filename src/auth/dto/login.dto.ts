import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'myEmail@gmail.com',
    description: 'your personal mail',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'P@ssword12345',
    description: 'your password',
  })
  @IsNotEmpty()
  password: string;
}
