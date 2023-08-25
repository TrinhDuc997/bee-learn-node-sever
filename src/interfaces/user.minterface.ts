import mongoose from "mongoose";
import { IWordLeaned } from "./word.interface";

interface MongoResult {
  _id?: mongoose.Types.ObjectId;
  _doc?: any;
}
export interface IUser extends MongoResult {
  id?: string;
  name: string;
  username?: string;
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
  tags?: ITag[];
}

export interface ITag extends MongoResult {
  title?: string;
  description?: string;
}

interface Token {
  type: string;
}

export interface ICourseLearned extends MongoResult {
  course?: string;
  subject?: string;
  numberPacks?: number[];
}

export type FieldFilter = {
  _id?: string;
  googleId?: string;
  facebookId?: string;
};
