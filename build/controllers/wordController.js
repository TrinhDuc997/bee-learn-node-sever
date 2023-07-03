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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const commonUtils_1 = require("../utils/commonUtils");
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
            console.log("🚀 ~ file: wordController.ts:46 ~ updateListWord: ~ arrWords:", arrWords);
            const updatedWords = yield Promise.all(arrWords.map((element) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield models_1.Words.updateOne({ word: element.word }, {
                    $set: Object.assign({}, element),
                }, { upsert: true });
                if (result.modifiedCount > 0) {
                    const updatedWord = yield models_1.Words.findOne({ word: element.word });
                    return updatedWord;
                }
            })));
            const filteredWords = updatedWords.filter((word) => word !== undefined);
            console.log(`Updated ${filteredWords.length} document(s)`);
            res.status(200).json(filteredWords);
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
            const { page = 0, limit = 1000, subject = "", subjects = [], } = req.query;
            const numberSkip = Number(page) * Number(limit);
            let dataWords;
            if (subject === "ALL") {
                dataWords = yield models_1.Words.find()
                    .limit(Number(limit))
                    .skip(Number(numberSkip));
            }
            else if (subjects.length > 0) {
                dataWords = yield models_1.Words.find({
                    topics: {
                        $in: subjects.map((value) => new RegExp(value, "i")),
                    },
                })
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
            else if (course === "ALL") {
                const dataSubject = yield models_1.VocabularySubjects.find();
                listVocabularySubjects = dataSubject;
            }
            else {
                const dataSubject = yield models_1.VocabularySubjects.find({
                    tag: { $regex: course },
                });
                listVocabularySubjects = dataSubject;
                // listVocabularySubjects = await Promise.all(
                //   dataSubject.map(async (i) => {
                //     let sizeCollection = await Words.find({
                //       topics: { $regex: i.title },
                //     }).count();
                //     return {
                //       _id: i._id,
                //       title: i.title,
                //       subTitle: i.subTitle,
                //       tag: i.tag,
                //       numberWord: sizeCollection,
                //     };
                //   })
                // );
            }
            res.status(200).json(listVocabularySubjects);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    updateVocabularySubjects: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let arrVocabularySubjects = req.body;
            // arrVocabularySubjects = await Promise.all(
            //   arrVocabularySubjects.map(async (i) => {
            //     let sizeCollection = await Words.find({
            //       topics: { $regex: i.title },
            //     }).count();
            //     return {
            //       _id: i._id,
            //       title: i.title,
            //       subTitle: i.subTitle,
            //       tag: i.tag,
            //       numberWord: sizeCollection,
            //     };
            //   })
            // );
            arrVocabularySubjects.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
                models_1.VocabularySubjects.updateOne({
                    _id: element._id,
                }, {
                    $set: { numberWord: element.numberWord },
                }, { upsert: true }, (err, result) => {
                    if (err) {
                        console.log(`Error: ${err}`);
                    }
                    else {
                        // console.log(`Updated ${result.modifiedCount} document(s)`);
                    }
                });
            }));
            res.status(200).json(arrVocabularySubjects);
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
    updateWordsUserLearned: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, isLearnNewWord } = req.body;
            const newWordsLearned = req.body.wordsLeaned;
            const newCourseLearned = req.body.courseLearned;
            // Find the User document to update
            const userToUpdate = yield models_1.Users.findById(id);
            if (!userToUpdate) {
                return res.status(404).json({ message: "User not found" });
            }
            // Update the User document fields
            const { wordsLearned = [] } = userToUpdate || {};
            if (isLearnNewWord) {
                models_1.Users.findOneAndUpdate(
                // xử lý dữ liệu field courseLearned trong trường hợp học từ mới
                {
                    _id: id,
                    courseLearned: {
                        $elemMatch: {
                            course: newCourseLearned.course,
                            subject: newCourseLearned.subject,
                        },
                    },
                }, {
                    $addToSet: {
                        "courseLearned.$.numberPacks": {
                            $each: newCourseLearned.numberPacks,
                        },
                    },
                }, (err, user) => {
                    if (err) {
                        console.error(err);
                    }
                    else if (user) {
                        console.log("Dữ liệu đã được cập nhật thành công");
                    }
                    else {
                        // Không tìm thấy cặp course và subject không tồn tại thì thêm mới
                        models_1.Users.findByIdAndUpdate(id, { $push: { courseLearned: newCourseLearned } }, (err) => {
                            if (err) {
                                console.error(err);
                            }
                            else {
                                console.log("Dữ liệu đã được thêm thành công");
                            }
                        });
                    }
                });
            }
            newWordsLearned.forEach((element) => {
                const item = wordsLearned.find((i) => i.word === element.word);
                if (!!item) {
                    const updateFilter = { _id: id, "wordsLearned.word": item.word };
                    const update = {
                        $set: {
                            "wordsLearned.$.numberOfReview": element.numberOfReview,
                            "wordsLearned.$.numberOfReviewCorrect": element.numberOfReviewCorrect,
                            "wordsLearned.$.lastTimeReview": Date.now(),
                        },
                    };
                    models_1.Users.updateOne(updateFilter, update, function (err, updateResult) {
                        if (err) {
                            console.log("Lỗi cập nhật tài liệu:", err);
                        }
                    });
                }
                else {
                    const insertFilter = { _id: id };
                    const insert = {
                        $push: {
                            wordsLearned: {
                                word: element.word,
                                numberOfReview: element.numberOfReview,
                                numberOfReviewCorrect: element.numberOfReviewCorrect,
                            },
                        },
                    };
                    models_1.Users.updateOne(insertFilter, insert, function (err, insertResult) {
                        if (err) {
                            console.log("Lỗi thêm mới tài liệu:", err);
                        }
                    });
                }
            });
            // After updating the user document, fetch the updated user data
            const updatedUser = yield models_1.Users.findById(id);
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            let hierarchicalArrayOfWords = (0, commonUtils_1.getHierarchicalArrayOfWords)((isLearnNewWord
                ? [...updatedUser.wordsLearned]
                : updatedUser.wordsLearned).map((item) => {
                const newData = newWordsLearned.find((i) => i.word === item.word);
                if (newData) {
                    return Object.assign(Object.assign({}, item), { numberOfReview: newData.numberOfReview, numberOfReviewCorrect: newData.numberOfReviewCorrect });
                }
                else {
                    return item;
                }
            })); // example: hierarchicalArrayOfWords=[10,13,20,89];
            const dataUser = {
                id: updatedUser._id.toString(),
                username: updatedUser.username,
                email: updatedUser.email,
                name: updatedUser.name,
                googleId: updatedUser.googleId,
                facebookId: updatedUser.facebookId,
                techLogin: updatedUser.techLogin,
                courseLearned: updatedUser.courseLearned,
                hierarchicalArrayOfWords,
            };
            res.status(200).json(dataUser);
        }
        catch (err) {
            console.log("Error updating user:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }),
    getListWordsToReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        /**
         *
         * how to get data to review words.
         *  Words will have lastTimeReview. nextTimeReview will base on lastTimeReview plus amount of time corresponding to each level:
         *      with words in level1 review once an hour: ex: lastTimeReview: 2023/05/20 08:30 => nextTimeReview: 2023/05/20 09:30
         *      with words in level2 review once a day
         *      with words in level3 once each two day
         *      with words in level4 once every three days.
         *
         * with each vocabulary review will get 100 words to review
         */
        try {
            const { limit = 100 } = req.query;
            const { cookie = "" } = req.headers || {};
            const token = cookie.split("access_token=")[1] || "";
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
            const { id } = decodedToken;
            const dataUser = yield models_1.Users.findById(id);
            if (!!dataUser) {
                const { wordsLearned = [] } = dataUser || {};
                const sortedWordsLearned = wordsLearned.sort((a, b) => (a.lastTimeReview || 0) - (b.lastTimeReview || 0));
                let filteredWordsLearned = [];
                if (limit === "UNLIMIT") {
                    filteredWordsLearned = sortedWordsLearned;
                }
                else {
                    filteredWordsLearned = sortedWordsLearned.slice(0, parseInt(limit));
                }
                const dataWords = yield models_1.Words.find({
                    word: { $in: filteredWordsLearned.map((i) => i.word) },
                });
                let dataToReview = [];
                filteredWordsLearned.forEach((item) => {
                    const dataWord = dataWords.find((i) => i.word === item.word);
                    if (!!dataWord) {
                        dataToReview.push({
                            idOfWord: dataWord._id,
                            customExamples: dataWord.customExamples,
                            definition: dataWord.definition,
                            description: dataWord.description,
                            examples: dataWord.examples,
                            pos: dataWord.pos,
                            pronounce: dataWord.pronounce,
                            topics: dataWord.topics,
                            translations: dataWord.translations,
                            definitions: dataWord.definitions,
                            idOfWordLearned: item._id,
                            word: item.word,
                            levelOfWord: (0, commonUtils_1.calculateLevelWord)(item.numberOfReviewCorrect, item.numberOfReview),
                            numberOfReview: item.numberOfReview,
                            numberOfReviewCorrect: item.numberOfReviewCorrect,
                            lastTimeReview: item.lastTimeReview,
                        });
                    }
                });
                res.status(200).json(dataToReview);
            }
            else {
                res.status(500).json("User not found");
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
};
exports.default = wordController;
