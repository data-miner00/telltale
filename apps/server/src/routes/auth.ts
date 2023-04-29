import express, { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthController } from '../controllers/auth';
import { validate } from '../middlewares/validate';
import { authRequestSchema } from '../validators/auth';

const router = Router();
const prisma = new PrismaClient();
const authController = new AuthController(prisma);

router.post('/login', validate(authRequestSchema), (req, res) =>
  authController.loginAsync(req, res)
);
router.post('/register', validate(authRequestSchema), (req, res) =>
  authController.registerAsync(req, res)
);
router.post(`/logout`, (req, res) => authController.logoutAsync(req, res));

export default router;
