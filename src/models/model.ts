import mongoose, { Schema } from "mongoose";
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

export const PhoneticIPA = mongoose.model("PhoneticIPA", schemaPhoneticIPA);

const SchemaWords = new mongoose.Schema({
  word: {
    type: String,
    require: true,
    unique: true,
  },
  phonetic: {
    type: String,
  },
  image: {
    type: String,
  },
  examples: {
    type: [
      {
        word: { type: String },
        type: { type: String },
        translation: { type: String },
        example: { type: String },
        translateExample: { type: String },
      },
    ],
  },
  definition: {
    type: String,
  },
  pronunciation: {
    type: String,
  },
  audio: {
    type: String,
  },
  pos: {
    type: String,
  },
  translations: {
    type: [
      {
        lang: { type: String },
        trans: { type: String },
      },
    ],
  },
  definitions: {
    type: [
      {
        type: { type: String },
        meaning: { type: String },
        examples: {
          type: [
            {
              example: { type: String },
              meaning: { type: String },
            },
          ],
        },
      },
    ],
  },
  topics: {
    type: [String],
  },
});
export const Words = mongoose.model("Words", SchemaWords);

const schemaVocabularySubject = new mongoose.Schema(
  {
    title: String,
    description: String,
    subTitle: String,
    hrefImg: String,
    tag: {
      type: [String],
    },
    numberWord: Number,
  },
  { collection: "VocabularySubjects" }
);
export const VocabularySubjects = mongoose.model(
  "VocabularySubjects",
  schemaVocabularySubject
);

// create a new schema for users
const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, sparse: true, required: false },
    role: { type: String },
    email: {
      type: String,
      sparse: true, // allow values null
      required: false, // Cho phép email không bắt buộc
    },
    image: { type: String },
    password: { type: String },
    googleId: { type: String, default: null },
    facebookId: { type: String, default: null },
    techLogin: { type: String, default: null },
    tokens: {
      type: [String],
    },
    wordsLearned: {
      type: [
        {
          word: { type: String },
          description: { type: String },
          examples: {
            type: [
              {
                word: { type: String },
                type: { type: String },
                translation: { type: String },
                example: { type: String },
                translateExample: { type: String },
              },
            ],
          },
          numberOfReview: { type: Number },
          numberOfReviewCorrect: { type: Number },
          lastTimeReview: { type: Number },
          tagIds: {
            type: [
              {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users.tags",
              },
            ],
          },
        },
      ],
    },
    courseLearned: {
      type: [
        {
          course: { type: String },
          subject: { type: String },
          numberPacks: {
            type: [Number],
          },
        },
      ],
    },
    tags: {
      type: [
        {
          title: {
            type: String,
            unique: true,
            require: true,
          },
          description: { type: String },
        },
      ],
    },
  },
  { collection: "Users" }
);
// create a new model based on the schema
export const Users = mongoose.model("Users", usersSchema);
// list of tags
// const listOfTags = new mongoose.Schema(
//   {
//     title: { type: String, unique: true, require: true },
//     description: { type: String },
//   },
//   { collection: "ListOfTags" }
// );

// export const ListOfTags = mongoose.model("ListOfTags", listOfTags);
