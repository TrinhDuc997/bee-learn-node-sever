"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularySubjects = exports.Words = exports.PhoneticIPA = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const uniqueValidator = require("mongoose-unique-validator");
const schemaPhoneticIPA = new mongoose_1.default.Schema({
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
}, { collection: "PhoneticIPAs" });
schemaPhoneticIPA.plugin(uniqueValidator);
exports.PhoneticIPA = mongoose_1.default.model("PhoneticIPA", schemaPhoneticIPA);
const SchemaWords = new mongoose_1.default.Schema({
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
exports.Words = mongoose_1.default.model("Words", SchemaWords);
const schemaVocabularySubject = new mongoose_1.default.Schema({
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
}, { collection: "VocabularySubjects" });
exports.VocabularySubjects = mongoose_1.default.model("VocabularySubjects", schemaVocabularySubject);
