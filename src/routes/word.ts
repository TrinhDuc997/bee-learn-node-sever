import express from "express";
import wordController from "../controllers/wordController";

const router = express.Router();

// Add List Word From Excel
router.post("/addListWordFromExcel", wordController.addListWordFromExcel);
// Update List Word From Excel
router.put("/updateListWord", wordController.updateListWord);
// Add Word
router.post("/addWord", wordController.addWord);
// Get Detail word
router.get("/getDetailWord", wordController.getDetailWord);
// Get List Words
router.get("/getListWords", wordController.getListWords);
router.get("/getSizeCollection", wordController.getSizeCollection);
// Get List Vocabulary Subjects
router.get(
  "/getListVocabularySubjects",
  wordController.getListVocabularySubjects
);
export default router;
