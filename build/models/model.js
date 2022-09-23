"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Word = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schemaDetailWord = new mongoose_1.default.Schema({
    type: "object",
    properties: {
        entries: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    entry: {
                        type: "string",
                    },
                    pronunciations: {
                        type: "array",
                        items: {
                            type: "object",
                        },
                    },
                    interpretations: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                lemma: {
                                    type: "string",
                                },
                                normalizedLemmas: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            lemma: {
                                                type: "string",
                                            },
                                        },
                                    },
                                },
                                partOfSpeech: {
                                    type: "string",
                                },
                                grammar: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                    },
                                },
                            },
                        },
                    },
                    lexemes: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                lemma: {
                                    type: "string",
                                },
                                partOfSpeech: {
                                    type: "string",
                                },
                                senses: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                    },
                                },
                                forms: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            form: {
                                                type: "string",
                                            },
                                            grammar: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    license: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string",
                            },
                            url: {
                                type: "string",
                                format: "uri",
                            },
                        },
                    },
                    sourceUrls: {
                        type: "array",
                        items: {
                            type: "string",
                            format: "uri",
                        },
                    },
                },
            },
        },
    },
});
exports.Word = mongoose_1.default.model("Word", schemaDetailWord);
