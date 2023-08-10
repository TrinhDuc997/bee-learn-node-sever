import { IWordLeaned } from "./word.interface";

export interface IUser {
  id?: string;
  name: string;
  username: string;
  email?: string;
  role?: string;
  token?: string;
  image?: string;
  password?: string;
  googleId?: string;
  facebookId?: string;
  techLogin?: string;
  tokens?: Token[];
  courseLearned?: ICourseLearned[];
  wordsLearned?: IWordLeaned[];
  hierarchicalArrayOfWords?: number[];
}
interface Token {
  type: string;
}

export interface ICourseLearned {
  course?: string;
  subject?: string;
  numberPacks?: number[];
}

export type FieldFilter = {
  _id?: string;
  googleId?: string;
  facebookId?: string;
};
