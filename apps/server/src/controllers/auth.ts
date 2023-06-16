import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { User, UserProfile, UserPreference } from '@prisma/client';
import { JWT_SECRET as jwtSecret } from '../settings';

type UserProfileWithoutPassword = Omit<UserProfile, 'password'>;
type UserInfoWithoutPassword = User & {
  profile: UserProfileWithoutPassword;
  preference: UserPreference;
};

/**
 * The controller class that handles authentication.
 */
export class AuthController {
  constructor(private prisma: PrismaClient) {}

  /**
   * Login with traditional username and password combination.
   * @param req The request object.
   * @param res The response object
   * @returns The credentials populated response object.
   */
  async loginAsync(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      // Check if user exists
      const userExists = await this.prisma.user.findUnique({
        where: { username },
        include: {
          profile: true,
          preference: true,
        },
      });

      if (!userExists) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if valid password
      const validPassword = await this.comparePasswordAsync(
        password,
        userExists.profile?.password ?? ''
      );

      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Update last_seen
      await this.prisma.user.update({
        where: {
          username,
        },
        data: {
          last_seen: new Date(),
        },
      });

      // Generate JWT token
      const token = this.generateJwtAsync({
        id: userExists.id,
        username: userExists.username,
      });

      const { password: _, ...restProfile } = userExists.profile!;
      const userWithoutPassword: UserInfoWithoutPassword = {
        ...userExists,
        preference: userExists.preference!,
        profile: restProfile,
      };

      return res.status(200).json({
        user: userWithoutPassword,
        jwt: token,
      });
    } catch (error) {}
  }

  /**
   * Login with just random, unrestricted username without password.
   * @param req The request object.
   * @param res The response object.
   * @todo
   */
  async loginAnonymousAsync(req: Request, res: Response) {
    console.log('Login anonymous called');
    console.log(req.body);
  }

  /**
   * Login/signup with Metamask default address.
   * @param req The request object.
   * @param res The response object.
   * @todo
   */
  async loginMetamask(req: Request, res: Response) {
    try {
      console.log('Login metamask called');
      const { address } = req.body;
    } catch (error) {}
  }

  /**
   * Login/signup with third-party SSO providers such as Facebook, Google and GitHub.
   * @param req The request object.
   * @param res The response object.
   * @todo
   */
  async loginSSO(req: Request, res: Response) {
    try {
      console.log('Login sso called');
      const { userId, username, service } = req.body;
    } catch (error) {}
  }

  /**
   * Register a user with traditional username/password combination.
   * @param req The register request object.
   * @param res The response object.
   * @returns The registered user info populated response object.
   */
  async registerAsync(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const userExists = await this.prisma.user.findUnique({
        where: { username },
      });

      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await this.hashPassword(password);
      const createdUser = await this.prisma.user.create({
        data: {
          username,
          profile: {
            create: {
              alias: username,
              password: hashedPassword,
              avatar_url: this.generateRandomAvatar(),
            },
          },
          preference: {
            create: {},
          },
        },
        include: {
          profile: true,
          preference: true,
        },
      });

      const token = this.generateJwtAsync({
        id: createdUser.id,
        username: createdUser.username,
      });

      const { password: _, ...restProfile } = createdUser.profile!;
      const userWithoutPassword: UserInfoWithoutPassword = {
        ...createdUser,
        preference: createdUser.preference!,
        profile: restProfile,
      };

      return res.status(201).json({ user: userWithoutPassword, jwt: token });
    } catch (error) {}
  }

  /**
   * Logout from the portal.
   * @param req The logout request object.
   * @param res The logout response object.
   * @returns The actual response to the logout request.
   * @todo
   */
  async logoutAsync(req: Request, res: Response) {
    try {
      return res.status(200).json({ message: 'Logged out' });
    } catch (error) {}
  }

  private generateJwtAsync(jwtContents: JwtContents) {
    return jwt.sign(jwtContents, jwtSecret, { expiresIn: '86400s' });
  }

  private comparePasswordAsync(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  private hashPassword(password: string) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private generateRandomAvatar() {
    const gender = Math.round(Math.random());
    const imageNumber = Math.ceil(Math.random() * 98);

    return `https://randomuser.me/api/portraits/med/${
      gender === 0 ? 'men' : 'women'
    }/${imageNumber}.jpg`;
  }
}

type JwtContents = {
  id: number;
  username: string;
};
