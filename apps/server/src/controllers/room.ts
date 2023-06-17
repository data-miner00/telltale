import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

/**
 * The controller class that handles Room related operations.
 */
export class RoomController {
  constructor(private prisma: PrismaClient) {}

  /**
   * Retrieve a list of active conversation (rooms/dm) that a user has.
   * @param req The request object.
   * @param res The response object.
   * @returns The information populated response.
   * @todo
   */
  async getRooms(req: Request, res: Response) {
    try {
      const userId = req.user?.id as number;
      const userMemberships = await this.prisma.membership.findMany({
        where: {
          user_id: userId,
        },
      });

      // TODO: Convert into room info

      return res.status(200).json({ data: userMemberships });
    } catch {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * Creates a room or chat group.
   * @param req The request object.
   * @param res The response object.
   * @returns The response object with created room info.
   */
  async createRoom(req: Request, res: Response) {
    try {
      const { name, description, password, creatorId } = req.body;

      const createdRoom = await this.prisma.room.create({
        data: {
          name,
          description,
          password,
          avatar_url: '/images/default_room_avatar.jpg',
          memberships: {
            create: {
              user_id: creatorId,
              is_admin: true,
            },
          },
        },
      });

      return res.status(200).json({ room: createdRoom });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * Creates a direct message to a target user.
   * @param req The request object.
   * @param res The response object.
   * @returns The dm populated response object.
   */
  async createDm(req: Request, res: Response) {
    try {
      const { creatorId, targetId } = req.body;

      const createdDm = await this.prisma.room.create({
        data: {
          name: `${creatorId}-${targetId}`,
          description: `DM for ${creatorId} and ${targetId}`,
          avatar_url: '/images/default_dm_avatar.jpg',
          memberships: {
            createMany: {
              data: [
                {
                  user_id: creatorId,
                },
                {
                  user_id: targetId,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      });

      return res.status(200).json({ dm: createdDm });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * Invites a user into an existing group chat (room).
   * @param req The request object.
   * @param res The response object.
   * @todo
   */
  async inviteUser(req: Request, res: Response) {
    try {
      // TODO
    } catch (error) {}
  }

  /**
   * Joins an existing group chat (room).
   * @param req The request object.
   * @param res The response object.
   * @returns The response object with joining info.
   */
  async joinRoom(req: Request, res: Response) {
    try {
      // const userId = req.user?.id;
      const { roomId, password, userId } = req.body;

      const roomExists = await this.prisma.room.findFirst({
        where: {
          id: roomId,
        },
      });

      if (!roomExists) {
        return res.status(404).json({ message: 'Room not found' });
      }

      // TODO: Check if already joined

      if (roomExists.password && roomExists.password != password) {
        return res
          .status(400)
          .json({ message: 'Room password does not match' });
      }

      // TODO: Check for existing non-active membership and update if found
      await this.prisma.membership.create({
        data: {
          room_id: roomId,
          user_id: userId!,
        },
      });

      return res.status(200).json({ message: 'Joined successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * Quits an already joined room.
   * @param req The request object.
   * @param res The response object.
   * @returns The leave info populated response.
   */
  async leaveRoom(req: Request, res: Response) {
    try {
      // const userId = req.user?.id;
      const { roomId, userId } = req.body;

      const membership = await this.prisma.membership.findFirst({
        where: {
          room_id: roomId,
          user_id: userId,
        },
      });

      if (!membership) {
        return res.status(404).json({ message: 'Membership not found' });
      }

      // TODO: Check joined room

      await this.prisma.membership.update({
        where: {
          room_id_user_id: {
            room_id: roomId,
            user_id: userId!,
          },
        },
        data: {
          left_at: new Date(),
        },
      });

      return res.status(200).json({ message: 'Successfully left room' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * Forcefully remove a user from an existing group chat as an administrator.
   * @param req The request object.
   * @param res The response object.
   * @returns The kick info populated response object.
   * @todo
   */
  async kickUser(req: Request, res: Response) {
    try {
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * Deletes a room as an administrator.
   * @param req The request object.
   * @param res The response object.
   * @returns The deleted room info populated response object.
   * @todo
   */
  async deleteRoom(req: Request, res: Response) {
    try {
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * Edits the properties of a room as an administrator.
   * @param req The request object.
   * @param res The response object.
   * @returns The edited info populated response object.
   * @todo
   */
  async editRoomDetails(req: Request, res: Response) {
    try {
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

type CreateRoomRequest = {
  name: string;
  description: string;
  password?: string;
};
