export interface Form {
  form: string;
  grammar: object[];
}
export interface Sense {
  definition?: string;
}
export interface Lexeme {
  lemma: string;
  partOfSpeech: string;
  senses: object[];
  forms: object[];
}
interface Lemma {
  lemma?: string;
}
export interface Interpretation {
  lemma?: string;
  normalizedLemmas?: Lemma[];
  partOfSpeech?: string;
  grammar?: object[];
}
export interface Transcription {
  transcription?: string;
  notation?: string;
}
interface Audio {
  url?: string;
  sourceUrl?: string;
}
interface Context {
  regions?: string[];
}
export interface Pronunciation {
  transcriptions?: Array<Transcription>;
  audio?: Audio;
  context?: Context;
}
export interface Emtry {}
export interface Propperties {
  entry: string;
  pronunciations?: Array<Pronunciation>;
  interpretations?: Array<Interpretation>;
  lexemes?: Array<Lexeme>;
}

export declare interface IWordsExpand {
  entries: Array<Propperties>;
}
