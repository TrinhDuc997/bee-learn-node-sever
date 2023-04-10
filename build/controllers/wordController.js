"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const models_1 = require("../models");
// import cheerio from "cheerio";
// import fs from "fs";
// const dataDetailWord0To1000: IWordsExpand[] = require("../playgroundMongoDB/vocab0to1000.json");
// const dataDetailWord1000To1200: IWordsExpand[] = require("../playgroundMongoDB/vocab1000to1200.json");
// const dataDetailWord1201To1700: IWordsExpand[] = require("../playgroundMongoDB/vocab1201To1700.json");
// const dataDetailWord1701To2000: IWordsExpand[] = require("../playgroundMongoDB/vocab1701To2000.json");
// const newData = require("../playgroundMongoDB/dict_hh.db.json");
// Private Function --- START
// interface example {
//   example?: string;
//   meaning?: string;
// }
// interface Definition {
//   type?: string;
//   meaning?: string;
//   examples?: example[];
// }
// interface Word {
//   definitions?: Definition[];
// }
// function parseHtmlToWord(html: string): Definition[] {
//   const $ = cheerio.load(html);
//   const definitions: Definition[] = [];
//   $("h2").each((i, elem) => {
//     const type = $(elem).text().trim();
//     const meaningList = $(elem).next("ul").children("li");
//     meaningList.each((j, meaningElem) => {
//       const childrens: any = meaningElem.children || [];
//       let meaning: string = "";
//       childrens.forEach((element: any) => {
//         const { type = "", data = "" } = element;
//         if (type === "text") {
//           meaning = meaning === "" ? data : `${meaning}, ${data}`;
//         }
//       });
//       const exampleList = $(meaningElem).children("ul").children("li");
//       const examples = exampleList.map((k, exampleElem) => {
//         const exampleText: string = $(exampleElem).text().trim() || "";
//         return {
//           example: exampleText.split(":")[0] || "",
//           meaning: exampleText.split(":")[1] || "",
//         };
//       });
//       definitions.push({ type, meaning, examples: [...examples] });
//     });
//   });
//   return definitions;
// }
// async function convertDataWordExpandToWord(
//   params: IWords
// ): Promise<IWordsExpand[]> {
//   let wordsExpand: IWordsExpand[];
//   wordsExpand = await Promise.all(
//     params.map((item) => {
//       const detailWord: IWordsExpand = [
//         ...dataDetailWord0To1000,
//         ...dataDetailWord1000To1200,
//         ...dataDetailWord1201To1700,
//         ...dataDetailWord1701To2000,
//       ].find((subI) => (subI.entries[0] || {}).entry === item.word) || {
//         entries: [{ entry: item.word }],
//       };
//       return detailWord;
//     })
//   );
//   return wordsExpand;
// }
// async function getDetailWord(word: string):Promise<IWordsExpand> {
//   const options = {
//     method: "GET",
//     url: `https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${word}`,
//     headers: {
//       "X-RapidAPI-Key": "a58d2b794dmsh62a2d109c81b9b6p1cd8e9jsn61557fcceaed",
//       "X-RapidAPI-Host": "lingua-robot.p.rapidapi.com",
//     },
//   };
//   let detailWord = await axios
//     .request(options)
//     .then(function (response) {
//       return response.data;
//     })
//     .catch(function (error) {
//       return error;
//     });
//   return detailWord;
// }
// async function convertoWords(params: IWordsExpand[]): Promise<IWords> {
//   let convertList: IWords = [];
//   params.map((item) => {
//     const { entries } = item;
//     const word = (entries[0] || {}).entry || "";
//     let interpretation: Interpretation = {};
//     let pronunciation: Pronunciation = {};
//     entries.map((eItem) => {
//       const { pronunciations, interpretations } = eItem;
//       pronunciation =
//         pronunciations?.find(
//           (i) =>
//             i.context?.regions?.find(
//               (sI) => sI === "United Kingdom" || sI === "United States"
//             ) && !!i.audio
//         ) || {};
//       interpretation = interpretations?.find((i) => i.lemma === word) || {};
//     });
//     convertList.push({
//       word,
//       pronunciation:
//         (pronunciation?.transcriptions || [])[0]?.transcription || "",
//       audio: pronunciation?.audio?.url || "",
//       pos: interpretation?.partOfSpeech || "",
//     });
//   });
//   return convertList;
// }
// Private Function --- END
const wordController = {
    addListWordFromExcel: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("req", req.body);
            const arrWords = req.body;
            arrWords.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
                const newWord = new models_1.Words(element);
                yield newWord.save((err) => {
                    if (err) {
                        console.log(err.message);
                    }
                });
            }));
            res.status(200).json(req.body);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    updateListWord: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const arrWords = req.body;
            arrWords.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
                models_1.Words.updateOne({
                    word: element.word,
                    topics: { $not: { $elemMatch: { $in: element.topics } } },
                }, {
                    $set: { pos: element.type, definition: element.meaning },
                    $addToSet: { topics: { $each: element.topics } },
                }, { upsert: true }, (err, result) => {
                    if (err) {
                        console.log(`Error: ${err}`);
                    }
                    else {
                        console.log(`Updated ${result.modifiedCount} document(s)`);
                    }
                });
            }));
            res.status(200).json(arrWords);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    addWord: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("req", req.body);
        res.status(200).json(req.body);
    }),
    // Handle Get Detail Word
    getDetailWord: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { word = "" } = req.query || {};
        const options = {
            method: "GET",
            url: `https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${word}`,
            headers: {
                "X-RapidAPI-Key": "a58d2b794dmsh62a2d109c81b9b6p1cd8e9jsn61557fcceaed",
                "X-RapidAPI-Host": "lingua-robot.p.rapidapi.com",
            },
        };
        axios_1.default
            .request(options)
            .then(function (response) {
            res.status(200).json(response.data);
        })
            .catch(function (error) {
            res.status(500).json(error);
        });
    }),
    getListWords: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { page = 0, limit = 1000, subject = "" } = req.query || {};
            console.log("🚀 ~ file: wordController.ts:210 ~ getListWords: ~ req.query:", req);
            const numberSkip = Number(page) * Number(limit);
            const dataWords = yield models_1.Words.find({ topics: { $regex: subject } })
                .limit(Number(limit))
                .skip(Number(numberSkip));
            res.status(200).json(dataWords);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    getListVocabularySubjects: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const listVocabularySubjects = yield models_1.VocabularySubjects.find();
            res.status(200).json(listVocabularySubjects);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    getSizeCollection: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { subject = "" } = req.query || {};
            console.log("🚀 ~ file: wordController.ts:230 ~ getSizeCollection: ~ subject:", subject);
            const sizeCollection = yield models_1.Words.find({
                topics: { $regex: subject },
            }).count();
            res.status(200).json(sizeCollection);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
};
exports.default = wordController;
