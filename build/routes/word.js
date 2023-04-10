"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wordController_1 = __importDefault(require("../controllers/wordController"));
const router = express_1.default.Router();
// Add List Word From Excel
router.post("/addListWordFromExcel", wordController_1.default.addListWordFromExcel);
// Update List Word From Excel
router.put("/updateListWord", wordController_1.default.updateListWord);
// Add Word
router.post("/addWord", wordController_1.default.addWord);
// Get Detail word
router.get("/getDetailWord", wordController_1.default.getDetailWord);
// Get List Words
router.get("/getListWords", wordController_1.default.getListWords);
router.get("/getSizeCollection", wordController_1.default.getSizeCollection);
// Get List Vocabulary Subjects
router.get("/getListVocabularySubjects", wordController_1.default.getListVocabularySubjects);
exports.default = router;
