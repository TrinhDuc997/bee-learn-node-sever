import { FieldFilter, IUser, IWordLeaned } from "../interfaces";
import { Users } from "../models";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getHierarchicalArrayOfWords } from "../utils/commonUtils";

declare var process: {
  env: {
    DATABASE_URL: string;
    PORT: number;
    DB_NAME: string;
    DB_OPTIONS: string;
    JWT_KEY: string;
  };
};
const UserController = {
  addUser: async (req: Request, res: Response) => {
    try {
      const {
        name,
        username,
        email,
        password,
        googleId,
        facebookId,
        techLogin,
      } = req.body;

      const token = jwt.sign({ email }, process.env.JWT_KEY);
      // Create a new User document
      const newUser = new Users({
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
      const checkExistedUser = await Users.findOne({ username: username });

      if (!checkExistedUser) {
        // Save the new User document to the database
        await newUser.save();
        // Return the new User document as the response
        res.status(201).json(newUser);
      } else {
        throw { code: 11000 };
      }
    } catch (err: any) {
      if (err.code === 11000) {
        res.status(401).json({
          message: `duplicate key error collection: ${Object.keys(
            err.keyValue || {}
          )}`,
          err,
        });
      } else {
        res.status(500).json({ message: "Internal server error", err });
      }
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const {
        id,
        name,
        email,
        password,
        googleId,
        facebookId,
        techLogin,
        tags,
      } = req.body;

      // Find the User document to update
      const userToUpdate = await Users.findById(id);

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
      await userToUpdate.save();
      const dataUser: IUser = {
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
    } catch (err) {
      console.log("Error updating user:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getListUser: async (req: Request, res: Response) => {
    try {
      // Find all User documents in the database
      const users = await Users.find();

      // Return the list of User documents as the response
      res.status(200).json(users);
    } catch (err) {
      console.log("Error getting list of users:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const {
        username = "",
        password = "",
        token,
        loginBy = "",
      } = req.body || {};

      let user;
      if (loginBy === "google" || loginBy === "facebook") {
        const {
          id,
          name = "",
          email = "",
          image = "",
        } = jwt.verify(token, process.env.JWT_KEY) as IUser;

        let filter: FieldFilter = { _id: id };
        if (loginBy === "google") {
          filter = { googleId: id };
        } else if (loginBy === "facebook") {
          filter = { facebookId: id };
        }
        user = await Users.findOne(filter);
        if (!user) {
          // Create a new User document
          const newUser = new Users({
            name,
            email,
            image,
            googleId: loginBy === "google" ? id : null,
            facebookId: loginBy === "facebook" ? id : null,
            tags: [{ title: "Mặc định", code: "default" }],
          });
          // Save the new User document to the database
          user = await newUser.save();
        }
      } else {
        user = await Users.findOne({
          username: username,
          password: password,
        }).exec();
      }

      if (!!user) {
        const { tokens = [] } = user;
        let hierarchicalArrayOfWords: number[] = getHierarchicalArrayOfWords(
          user.wordsLearned as IWordLeaned[]
        );
        const token: string = jwt.sign(
          { timeLogin: Date.now(), id: user._id },
          process.env.JWT_KEY
        );
        const dataUser: IUser = {
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
        await user.save();
        res.status(200).json(dataUser);
      } else {
        res.status(401).json({ username, tokens: "", message: "LoginFalse" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  profile: async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = (authHeader && authHeader.split("=")[1]) || "";
      const decodedToken = jwt.verify(token, process.env.JWT_KEY) as {
        id: string;
      };
      const { id } = decodedToken;
      const user = await Users.findOne({ _id: id }).exec();
      if (!!user) {
        let hierarchicalArrayOfWords: number[] = getHierarchicalArrayOfWords(
          user.wordsLearned as IWordLeaned[]
        ); // example: hierarchicalArrayOfWords=[10,13,20,89];
        const dataUser: IUser = {
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
        res.status(200).json({ ...dataUser });
      } else {
        res.status(404).json({ message: "user not found!" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default UserController;
