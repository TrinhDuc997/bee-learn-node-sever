import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

// Add user
router.post("/addUser", userController.addUser);
// Update user
router.put("/updateUser", userController.updateUser);
// Add list user
router.post("/getListUser", userController.getListUser);
// login
router.post("/login", userController.login);
// Get profile
router.get("/profile", userController.profile);

export default router;
