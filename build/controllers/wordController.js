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
const wordController = {
    addWord: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("req", req.body);
        res.status(200).json(req.body);
    }),
    // get detail word
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
};
exports.default = wordController;
