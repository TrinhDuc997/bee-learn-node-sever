import express from "express";
import wordController from "../controllers/wordController";

const router = express.Router();

// Add Word
router.post("/addWord", wordController.addWord);
// Get Detail word
router.get("/getDetailWord", wordController.getDetailWord);

export default router;
