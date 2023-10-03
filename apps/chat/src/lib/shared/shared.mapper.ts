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

export function mapLoginResponseToUser(data: LoginResponse): User {
  return <User>{
    id: data.user.id,
    socketId: '',
    username: data.user.username,
    online: data.user.online,
    joinedAt: data.user.created_at,
    alias: data.user.profile.alias,
    avatarUrl: data.user.profile.avatar_url,
    email: data.user.profile.email_address,
    isEmailVerified: data.user.profile.is_email_verified,
    location: data.user.profile.location,
    description: data.user.profile.description,
    phoneNumber: data.user.profile.phone_number,
    ssoProvider: data.user.profile.sso_provider,
    web3Address: data.user.profile.web3_address,
    web3Network: data.user.profile.web3_network,
    openAiKey: undefined,
    lastSeen: data.user.last_seen,
  };
}
