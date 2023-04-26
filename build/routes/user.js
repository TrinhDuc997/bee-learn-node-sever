"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
// Add user
router.post("/addUser", userController_1.default.addUser);
// Update user
router.put("/updateUser", userController_1.default.updateUser);
// Add list user
router.post("/getListUser", userController_1.default.getListUser);
// login
router.post("/login", userController_1.default.login);
// Get profile
router.get("/profile", userController_1.default.profile);
exports.default = router;
