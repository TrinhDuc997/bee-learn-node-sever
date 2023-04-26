export interface IUser {
  id?: string;
  name: string;
  username: string;
  email?: string;
  password?: string;
  googleId?: string;
  facebookId?: string;
  techLogin?: string;
  tokens?: Token[];
}
interface Token {
  type: string;
}
