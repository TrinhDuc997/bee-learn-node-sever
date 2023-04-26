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
                    topics: { $not: { $elemMatch: { $in: element.topics } } }, // when updating will check the value in topics if exist then no more update
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
            const numberSkip = Number(page) * Number(limit);
            let dataWords;
            if (subject === "ALL") {
                dataWords = yield models_1.Words.find()
                    .limit(Number(limit))
                    .skip(Number(numberSkip));
            }
            else if (subject === "BASIC") {
                dataWords = yield models_1.Words.find({ topics: { $regex: subject } })
                    .limit(Number(limit))
                    .skip(Number(numberSkip));
            }
            else {
                dataWords = yield models_1.Words.find({ topics: { $regex: subject } })
                    .limit(Number(limit))
                    .skip(Number(numberSkip));
            }
            res.status(200).json(dataWords);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    getListVocabularySubjects: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { course = "" } = req.query || {};
        try {
            let listVocabularySubjects = [];
            if (course === "BASIC") {
                let sizeDataWords = yield models_1.Words.find({
                    topics: { $regex: course },
                }).count();
                for (let i = 0; i < Math.ceil(sizeDataWords / 20); i++) {
                    listVocabularySubjects.push({
                        _id: `Pack ${i + 1}`,
                        title: `Chủ đề ${i + 1}`,
                        subTitle: `20 Từ`,
                        hrefImg: `Pack ${i + 1}`,
                    });
                }
            }
            else {
                listVocabularySubjects = yield models_1.VocabularySubjects.find({
                    tag: { $regex: course },
                });
            }
            res.status(200).json(listVocabularySubjects);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    getSizeCollection: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { subject = "" } = req.query || {};
            let sizeCollection;
            if (subject === "ALL") {
                sizeCollection = yield models_1.Words.find().count();
            }
            else {
                sizeCollection = yield models_1.Words.find({
                    topics: { $regex: subject },
                }).count();
            }
            res.status(200).json(sizeCollection);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
};
exports.default = wordController;
