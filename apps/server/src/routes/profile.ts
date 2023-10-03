import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { ProfileController } from '../controllers/profile';
import { validate } from '../middlewares/validate';
import { updateProfileRequestSchema } from '../validators/profile';

const router = Router();
const prisma = new PrismaClient();
const profileController = new ProfileController(prisma);

router.post('/:userId', validate(updateProfileRequestSchema), (req, res) =>
  profileController.updateAsync(req, res)
);

export default router;
