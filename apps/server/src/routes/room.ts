import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { RoomController } from '../controllers/room';

const router = Router();
const prisma = new PrismaClient(); // TODO: Make Prisma Singleton
const roomController = new RoomController(prisma);

router.get('/', (req: Request, res: Response) =>
  roomController.getRooms(req, res)
);
router.post('/', (req: Request, res: Response) =>
  roomController.createRoom(req, res)
);
router.delete('/', (req: Request, res: Response) =>
  roomController.deleteRoom(req, res)
);
router.put('/', (req: Request, res: Response) =>
  roomController.editRoomDetails(req, res)
);

router.post('/dm', (req: Request, res: Response) =>
  roomController.createDm(req, res)
);

router.post('/join', (req: Request, res: Response) =>
  roomController.joinRoom(req, res)
);
router.post('/leave', (req: Request, res: Response) =>
  roomController.leaveRoom(req, res)
);
router.post('/kick', (req: Request, res: Response) =>
  roomController.kickUser(req, res)
);

export default router;
