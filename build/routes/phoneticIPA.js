"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const phoneticIPAController_1 = __importDefault(require("../controllers/phoneticIPAController"));
const router = express_1.default.Router();
// Add Phonetic IPA
router.post("/addPhonetic", phoneticIPAController_1.default.addPhoneticIPA);
// Get Detail Phoentic IPA
router.get("/getPhonetic", phoneticIPAController_1.default.getPhoneticIPA);
exports.default = router;
