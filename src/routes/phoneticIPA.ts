import express from "express";
import PhoneticIPAController from "../controllers/phoneticIPAController";

const router = express.Router();

// Add Word
router.post("/addPhonetic", PhoneticIPAController.addPhoneticIPA);
// Get Detail word
router.get("/getPhonetic", PhoneticIPAController.getPhoneticIPA);

export default router;
