import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import EmailService from './ email.service';
import { UsersService } from '../users/users.service';
@Injectable()
export class EmailRefferalService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
) {}
  public sendRefferalLink(email: string) {
    const token = Buffer.from(id.toString()).toString('base64')

    const url = `${this.configService.get('EMAIL_REFFERAL_URL')}
token=${token}`;


const text = `Your refferal link is : ${url}`;
    return this.emailService.sendMail({
      to: email,
      subject: 'Refferal link',
      text,
}) }
}