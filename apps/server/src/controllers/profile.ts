import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export class ProfileController {
  constructor(private prisma: PrismaClient) {}

  async updateAsync(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const { alias, email, avatarUrl, location, description } = req.body;

      await this.prisma.userProfile.update({
        where: {
          user_id: userId,
        },
        data: {
          alias,
          email_address: email,
          avatar_url: avatarUrl,
          location,
          description,
        },
      });

      return res.status(200).json({ message: 'Updated' });
    } catch {
      return res.status(500).json({ message: 'Something wrong' });
    }
  }
}
