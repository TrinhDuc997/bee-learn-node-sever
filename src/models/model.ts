import mongoose from "mongoose";
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
    type: [String],
  },
  customExamples: {
    type: [String],
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
    type: [
      {
        type: String,
      },
    ],
  },
});
export const Words = mongoose.model("Words", SchemaWords);

const schemaWordsExpand = new mongoose.Schema({
  type: Object,
  properties: {
    entries: {
      type: Array,
      items: {
        type: Object,
        properties: {
          entry: {
            type: String,
          },
          pronunciations: {
            type: Array,
            items: {
              type: Object,
            },
          },
          interpretations: {
            type: Array,
            items: {
              type: Object,
              properties: {
                lemma: {
                  type: String,
                },
                normalizedLemmas: {
                  type: Array,
                  items: {
                    type: Object,
                    properties: {
                      lemma: {
                        type: String,
                      },
                    },
                  },
                },
                partOfSpeech: {
                  type: String,
                },
                grammar: {
                  type: Array,
                  items: {
                    type: Object,
                  },
                },
              },
            },
          },
          lexemes: {
            type: Array,
            items: {
              type: Object,
              properties: {
                lemma: {
                  type: String,
                },
                partOfSpeech: {
                  type: String,
                },
                senses: {
                  type: Array,
                  items: {
                    type: Object,
                  },
                },
                forms: {
                  type: Array,
                  items: {
                    type: Object,
                    properties: {
                      form: {
                        type: String,
                      },
                      grammar: {
                        type: Array,
                        items: {
                          type: Object,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          license: {
            type: Object,
            properties: {
              name: {
                type: String,
              },
              url: {
                type: String,
                format: URL,
              },
            },
          },
          sourceUrls: {
            type: Array,
            items: {
              type: String,
              format: URL,
            },
          },
        },
      },
    },
  },
});
export const WordsExpand = mongoose.model("WordsExpand", schemaWordsExpand);

const schemaVocabularySubject = new mongoose.Schema(
  {
    title: String,
    description: String,
    subTitle: String,
    hrefImg: String,
    tag: {
      type: [
        {
          type: String,
        },
      ],
    },
  },
  { collection: "VocabularySubjects" }
);
export const VocabularySubjects = mongoose.model(
  "VocabularySubjects",
  schemaVocabularySubject
);
const SchemanewWords = new mongoose.Schema(
  {
    word: {
      type: String,
      require: true,
      unique: true,
    },
    html: {
      type: String,
    },
    description: {
      type: String,
    },
    pronounce: {
      type: String,
    },
  },
  { collection: "newWords" }
);
export const newWords = mongoose.model("newWords", SchemanewWords);
