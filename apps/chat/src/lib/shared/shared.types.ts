export type User = {
  id: number;
  socketId: string;
  username: string;
  online: boolean;
  joinedAt: string;
  alias: string;
  avatarUrl: string;
  email?: string;
  isEmailVerified: boolean;
  location?: string;
  description?: string;
  phoneNumber?: string;
  ssoProvider: string;
  web3Address?: string;
  web3Network: string;
  openAiKey?: string;
  lastSeen: string;
};

export type Room = {
  id: string;
  name: string;
  users: User[];
  description?: string;
};

export type Chat = {
  username: string;
  content: string;
  sent: Date;
  userAvatar: string;
  isAuthor: boolean;
};
