export type User = {
  currentId: string;
  username: string;
  avatarUrl: string;
  isEmailVerified: boolean;
  isWeb3User: boolean;
  openAiKey: string;
};

export type Room = {
  id: string;
  name: string;
  users: User[];
};

export type Chat = {
  username: string;
  message: string;
  sent: Date;
  userAvatar: string;
  isAuthor: boolean;
};
