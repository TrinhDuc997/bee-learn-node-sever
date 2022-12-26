import express from "express";
import PhoneticIPAController from "../controllers/phoneticIPAController";

const router = express.Router();

// Add Phonetic IPA
router.post("/addPhonetic", PhoneticIPAController.addPhoneticIPA);
// Get Detail Phoentic IPA
router.get("/getPhonetic", PhoneticIPAController.getPhoneticIPA);

export default router;
