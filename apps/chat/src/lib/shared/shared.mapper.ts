import { User } from './shared.types';

export type LoginResponse = {
  user: {
    id: number;
    username: string;
    online: boolean;
    last_seen: string;
    created_at: string;
    profile: {
      id: number;
      user_id: number;
      alias: string;
      avatar_url: string;
      email_address: string;
      is_email_verified: boolean;
      location: string;
      description: string;
      phone_number: string;
      sso_provider: string;
      web3_address: string;
      web3_network: string;
      created_at: string;
      updated_at: string;
    };
    preference: {
      id: number;
      user_id: number;
      theme: string;
      subscribe_mailing_list: boolean;
      created_at: string;
      updated_at: string;
    };
  };
  jwt: string;
};

export function mapLoginResponseToUser(lr: LoginResponse): User {
  return <User>{
    id: lr.user.id,
    socketId: '',
    username: lr.user.username,
    online: lr.user.online,
    joinedAt: lr.user.created_at,
    alias: lr.user.profile.alias,
    avatarUrl: lr.user.profile.avatar_url,
    email: lr.user.profile.email_address,
    isEmailVerified: lr.user.profile.is_email_verified,
    location: lr.user.profile.location,
    description: lr.user.profile.description,
    phoneNumber: lr.user.profile.phone_number,
    ssoProvider: lr.user.profile.sso_provider,
    web3Address: lr.user.profile.web3_address,
    web3Network: lr.user.profile.web3_network,
    openAiKey: undefined,
    lastSeen: lr.user.last_seen,
  };
}
