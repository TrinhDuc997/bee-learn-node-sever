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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const PhoneticIPAController = {
    addPhoneticIPA: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("req", req.body);
            const arrPhonetics = req.body;
            arrPhonetics.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
                const newPhoneticIPA = new models_1.PhoneticIPA(element);
                yield newPhoneticIPA.save((err) => {
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
    getPhoneticIPA: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const phoneticIPAs = yield models_1.PhoneticIPA.find().sort({ ordinalNumber: 1 });
            res.status(200).json(phoneticIPAs);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    editPhoneticIPA: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
        }
        catch (error) { }
    }),
};
exports.default = PhoneticIPAController;
