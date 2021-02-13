export interface UserInfo {
  email: string;
  password: string;
  isWholesaleClient: boolean;
}

export type User = UserInfo | null;
