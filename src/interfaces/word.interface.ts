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
export interface IWord {
  _id?: any;
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

export interface IWordLeaned {
  _id: string;
  word: string;
  numberOfReview: number;
  numberOfReviewCorrect: number;
  lastTimeReview: number;
}

export interface IDataFilterWord {
  page?: number;
  limit?: number;
  subject?: string;
  subjects?: string[];
}
