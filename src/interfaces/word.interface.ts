import mongoose from "mongoose";
import { ICourseLearned } from "./user.minterface";

interface MongoResult {
  _id?: mongoose.Types.ObjectId;
  _doc?: any;
}

export interface IPhoneticIPA {
  character: string;
  urlSoundIPA?: string;
  nameIconSoundIPA?: string;
  exampleWords?: IWord[];
  exampleWord: string;
  pronunciationGuide?: string;
  vowels?: boolean;
  consonants?: boolean;
  ordinalNumber: number;
}

interface ITranslation {
  lang?: string;
  trans?: string;
}
interface IExample {
  example?: string;
  meaning?: string;
}
interface IDefinition {
  type?: string;
  meaning?: string;
  examples?: IExample[];
}
interface IExampleOfWord {
  type?: string;
  translation?: string;
  example?: string;
  translateExample?: string;
}
export interface IWord extends MongoResult {
  word: string;
  pronounce?: string;
  image?: string;
  examples?: IExampleOfWord[]; // it be used to save data generate form AI
  customExamples?: string[];
  definition?: string;
  description?: string;
  pronunciation?: string;
  audio?: string;
  pos?: string;
  translations?: ITranslation[];
  definitions?: IDefinition[];
  topics?: string[];
}
export interface IWords extends Array<IWord> {}

export interface IWordLeaned extends MongoResult {
  word: string;
  description?: string;
  examples?: IExampleOfWord[];
  numberOfReview: number;
  numberOfReviewCorrect: number;
  lastTimeReview: number;
  tagIds: string[];
}

export interface IDataFilterWord {
  page?: number;
  limit?: number;
  subject?: string;
  subjects?: string[];
}

export interface IParamsOfAPIUpdateWordsUserLearned {
  id?: string;
  /**
   * if `true`, API return field wordsLearned.
   * @default false
   */
  isLearnNewWord?: boolean;
  wordsLearned?: IWordLeaned[];
  courseLearned?: ICourseLearned;
  /**
   * if `true`, API return field wordsLearned.
   * @default false
   */
  isReturnWordLearned: boolean;
  /**
   *
   */
  isReviewWords?: boolean;
}
