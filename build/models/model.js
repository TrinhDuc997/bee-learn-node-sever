"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneticIPA = void 0;
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
