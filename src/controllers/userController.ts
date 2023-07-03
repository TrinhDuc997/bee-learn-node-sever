import { IUser, IWordLeaned } from "../interfaces";
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
        tokens: [token],
      });

      // Save the new User document to the database
      await newUser.save();

      // Return the new User document as the response
      res.status(201).json(newUser);
    } catch (err: any) {
      console.log("🚀 ~ file: userController.ts:48 ~ addUser: ~ err:", err);
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
      const { id } = req.params;
      const { name, email, password, googleId, facebookId, techLogin } =
        req.body;

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

      // Save the updated User document to the database
      await userToUpdate.save();

      // Return the updated User document as the response
      res.status(200).json(userToUpdate);
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
      const { username = "", password = "" } = req.body || {};
      const user = await Users.findOne({
        username: username,
        password: password,
      }).exec();

      if (!!user) {
        const { tokens = [] } = user;
        const dataUser = {
          id: user._id,
          username: user.username || "",
          name: user.name || "",
        };
        const token: string = jwt.sign(
          { timeLogin: Date.now(), id: user._id },
          process.env.JWT_KEY
        );
        const newTokens = [token, ...tokens];
        user.set("tokens", newTokens);
        await user.save();
        res.status(200).json({ ...dataUser, token });
      } else {
        res.status(404).json({ username, tokens: "", message: "LoginFalse" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  profile: async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = (authHeader && authHeader.split(" ")[1]) || "";
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
          username: user.username,
          email: user.email,
          name: user.name,
          googleId: user.googleId,
          facebookId: user.facebookId,
          techLogin: user.techLogin,
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
