"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wordController_1 = __importDefault(require("../controllers/wordController"));
const router = express_1.default.Router();
// Add Word
router.post("/addWord", wordController_1.default.addWord);
// Get Detail word
router.get("/getDetailWord", wordController_1.default.getDetailWord);
exports.default = router;
