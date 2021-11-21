import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    let referrer = null;
    if (userData.referrer) {
      referrer = await this.usersRepository.findOne({
        referrerId: userData.referrer,
      });
      if (!referrer) {
        throw new HttpException(
          'Referrer with given referrer_id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
    }
    const newUser = await this.usersRepository.create({
      ...userData,
      referrer: referrer,
    });
    await this.usersRepository.save(newUser);
    if (referrer) {
      referrer.referees = [...referrer.referees, newUser];
      await this.usersRepository.save(referrer);
    }
    return newUser;
  }
}
