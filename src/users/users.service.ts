import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import User from 'src/sequelize/models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);

    return user;
  }

  findAll() {
    return `This action returns user`;
  }

  async findOne(id: string) {
    return await this.userModel.findByPk(id);
  }
  async findByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
