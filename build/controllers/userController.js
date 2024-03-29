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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const commonUtils_1 = require("../utils/commonUtils");
const UserController = {
    addUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, username, email, password, googleId, facebookId, techLogin, } = req.body;
            const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_KEY);
            // Create a new User document
            const newUser = new models_1.Users({
                name,
                username,
                email,
                password,
                googleId,
                facebookId,
                techLogin,
                tags: [{ title: "Mặc định", code: "default" }],
                tokens: [token],
            });
            const checkExistedUser = yield models_1.Users.findOne({ username: username });
            if (!checkExistedUser) {
                // Save the new User document to the database
                yield newUser.save();
                // Return the new User document as the response
                res.status(201).json(newUser);
            }
            else {
                throw { code: 11000 };
            }
        }
        catch (err) {
            if (err.code === 11000) {
                res.status(401).json({
                    message: `duplicate key error collection: ${Object.keys(err.keyValue || {})}`,
                    err,
                });
            }
            else {
                res.status(500).json({ message: "Internal server error", err });
            }
        }
    }),
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, name, email, password, googleId, facebookId, techLogin, tags, } = req.body;
            // Find the User document to update
            const userToUpdate = yield models_1.Users.findById(id);
            if (!userToUpdate) {
                return res.status(404).json({ message: "User not found" });
            }
            // Update the User document fields
            userToUpdate.name = name || userToUpdate.name;
            userToUpdate.email = email || userToUpdate.email;
            userToUpdate.password = password || userToUpdate.password;
            userToUpdate.googleId = googleId || userToUpdate.googleId;
            userToUpdate.facebookId = facebookId || userToUpdate.facebookId;
            userToUpdate.techLogin = techLogin || userToUpdate.techLogin;
            userToUpdate.tags = tags || userToUpdate.tags;
            // Save the updated User document to the database
            yield userToUpdate.save();
            const dataUser = {
                id: userToUpdate._id.toString(),
                email: userToUpdate.email,
                name: userToUpdate.name || "",
                googleId: userToUpdate.googleId,
                facebookId: userToUpdate.facebookId,
                techLogin: userToUpdate.techLogin,
                tags: userToUpdate.tags,
            };
            // Return the updated User document as the response
            res.status(200).json(dataUser);
        }
        catch (err) {
            console.log("Error updating user:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }),
    getListUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Find all User documents in the database
            const users = yield models_1.Users.find();
            // Return the list of User documents as the response
            res.status(200).json(users);
        }
        catch (err) {
            console.log("Error getting list of users:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username = "", password = "", token, loginBy = "", } = req.body || {};
            let user;
            if (loginBy === "google" || loginBy === "facebook") {
                const { id, name = "", email = "", image = "", } = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                let filter = { _id: id };
                if (loginBy === "google") {
                    filter = { googleId: id };
                }
                else if (loginBy === "facebook") {
                    filter = { facebookId: id };
                }
                user = yield models_1.Users.findOne(filter);
                if (!user) {
                    // Create a new User document
                    const newUser = new models_1.Users({
                        name,
                        email,
                        image,
                        googleId: loginBy === "google" ? id : null,
                        facebookId: loginBy === "facebook" ? id : null,
                        tags: [{ title: "Mặc định", code: "default" }],
                    });
                    // Save the new User document to the database
                    user = yield newUser.save();
                }
            }
            else {
                user = yield models_1.Users.findOne({
                    username: username,
                    password: password,
                }).exec();
            }
            if (!!user) {
                const { tokens = [] } = user;
                let hierarchicalArrayOfWords = (0, commonUtils_1.getHierarchicalArrayOfWords)(user.wordsLearned);
                const token = jsonwebtoken_1.default.sign({ timeLogin: Date.now(), id: user._id }, process.env.JWT_KEY);
                const dataUser = {
                    id: user._id.toString(),
                    username: user.username || "",
                    role: user.role || "",
                    name: user.name || "",
                    courseLearned: user.courseLearned,
                    hierarchicalArrayOfWords,
                    googleId: user.googleId,
                    facebookId: user.facebookId,
                    techLogin: user.techLogin,
                    tags: user.tags,
                    token,
                };
                const newTokens = [token, ...tokens];
                user.set("tokens", newTokens);
                yield user.save();
                res.status(200).json(dataUser);
            }
            else {
                res.status(401).json({ username, tokens: "", message: "LoginFalse" });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    profile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authHeader = req.headers["authorization"];
            const token = (authHeader && authHeader.split("=")[1]) || "";
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
            const { id } = decodedToken;
            const user = yield models_1.Users.findOne({ _id: id }).exec();
            if (!!user) {
                let hierarchicalArrayOfWords = (0, commonUtils_1.getHierarchicalArrayOfWords)(user.wordsLearned); // example: hierarchicalArrayOfWords=[10,13,20,89];
                const dataUser = {
                    id: user._id.toString(),
                    username: user.username || "",
                    email: user.email,
                    name: user.name || "",
                    role: user.role,
                    googleId: user.googleId,
                    facebookId: user.facebookId,
                    techLogin: user.techLogin,
                    tags: user.tags,
                    courseLearned: user.courseLearned,
                    hierarchicalArrayOfWords,
                };
                res.status(200).json(Object.assign({}, dataUser));
            }
            else {
                res.status(404).json({ message: "user not found!" });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
};
exports.default = UserController;
