import mongoose from "mongoose";
import { word } from "./word";
const uniqueValidator = require("mongoose-unique-validator");

const schemaPhoneticIPA = new mongoose.Schema(
  {
    character: {
      type: String,
      required: true,
      unique: true,
    },
    urlSoundIPA: {
      type: String,
    },
    nameIconSoundIPA: {
      type: String,
    },
    exampleWords: {
      type: [
        {
          word: {
            type: String,
          },
          phonetic: {
            type: String,
          },
        },
      ],
    },
    exampleWord: {
      type: String,
    },
    pronunciationGuide: {
      type: String,
    },
    vowels: {
      type: Boolean,
      default: false,
    },
    consonants: {
      type: Boolean,
      default: false,
    },
    ordinalNumber: {
      type: Number,
      default: false,
    },
  },
  { collection: "PhoneticIPAs" }
);
schemaPhoneticIPA.plugin(uniqueValidator);

// interface word {
//   word: string;
//   phonetic?: string;
// }
export interface IPhoneticIPA {
  character: string;
  urlSoundIPA?: string;
  nameIconSoundIPA?: string;
  exampleWords?: word[];
  exampleWord: string;
  pronunciationGuide?: string;
  vowels?: boolean;
  consonants?: boolean;
  ordinalNumber: number;
}
export const PhoneticIPA = mongoose.model("PhoneticIPA", schemaPhoneticIPA);
