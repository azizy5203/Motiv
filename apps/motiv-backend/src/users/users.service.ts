import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EmailService } from '../email/email.service';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async findOne(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async inviteUser(email: string) {
    const invitationToken = randomBytes(32).toString('hex');
    const user = await this.prisma.user.create({
      data: {
        email,
        password: '', // Placeholder password
        firstName: '',
        lastName: '',
        verificationToken: invitationToken,
      },
    });

    const invitationLink = `http://localhost:3001/register?token=${invitationToken}`;
    await this.emailService.sendMail(
      email,
      'You have been invited to join Motiv',
      `Click here to accept your invitation: ${invitationLink}`,
      `<p>Click here to accept your invitation: <a href="${invitationLink}">${invitationLink}</a></p>`,
    );

    return { message: 'Invitation sent successfully' };
  }
}
