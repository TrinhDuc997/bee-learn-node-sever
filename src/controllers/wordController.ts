import { words } from "../models/word";
import { Request, Response } from "express";
import axios from "axios";

const wordController = {
  addWord: async (req: Request, res: Response) => {
    console.log("req", req.body);
    res.status(200).json(req.body);
  },

  // get detail word
  getDetailWord: async (req: Request, res: Response) => {
    const { word = "" } = req.query || {};
    const options = {
      method: "GET",
      url: `https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${word}`,
      headers: {
        "X-RapidAPI-Key": "a58d2b794dmsh62a2d109c81b9b6p1cd8e9jsn61557fcceaed",
        "X-RapidAPI-Host": "lingua-robot.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },
};
export default wordController;
