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
export interface IWord {
  word: string;
  pronounce?: string;
  image?: string;
  examples?: string[];
  customExamples?: string[];
  definition?: string;
  pronunciation?: string;
  audio?: string;
  pos?: string;
  translations?: ITranslation[];
  definitions?: IDefinition[];
  topics?: string[];
}
export interface IWords extends Array<IWord> {}
