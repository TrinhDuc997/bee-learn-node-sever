import { IWord } from "../interfaces";
import { Request, Response } from "express";
import axios from "axios";
import { VocabularySubjects, Words } from "../models";

const wordController = {
  addListWordFromExcel: async (req: Request, res: Response) => {
    try {
      console.log("req", req.body);
      const arrWords = req.body;
      arrWords.forEach(async (element: IWord) => {
        const newWord = new Words(element);
        await newWord.save((err: any) => {
          if (err) {
            console.log(err.message);
          }
        });
      });
      res.status(200).json(req.body);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateListWord: async (req: Request, res: Response) => {
    try {
      const arrWords = req.body;
      arrWords.forEach(async (element: any) => {
        Words.updateOne(
          {
            word: element.word,
            topics: { $not: { $elemMatch: { $in: element.topics } } }, // when updating will check the value in topics if exist then no more update
          },
          {
            $set: { pos: element.type, definition: element.meaning },
            $addToSet: { topics: { $each: element.topics } },
          },
          { upsert: true },
          (err, result) => {
            if (err) {
              console.log(`Error: ${err}`);
            } else {
              console.log(`Updated ${result.modifiedCount} document(s)`);
            }
          }
        );
      });
      res.status(200).json(arrWords);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addWord: async (req: Request, res: Response) => {
    console.log("req", req.body);
    res.status(200).json(req.body);
  },

  // Handle Get Detail Word
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

  getListWords: async (req: Request, res: Response) => {
    try {
      const { page = 0, limit = 1000, subject = "" } = req.query || {};
      const numberSkip = Number(page) * Number(limit);
      let dataWords;
      if (subject === "ALL") {
        dataWords = await Words.find()
          .limit(Number(limit))
          .skip(Number(numberSkip));
      } else if (subject === "BASIC") {
        dataWords = await Words.find({ topics: { $regex: subject } })
          .limit(Number(limit))
          .skip(Number(numberSkip));
      } else {
        dataWords = await Words.find({ topics: { $regex: subject } })
          .limit(Number(limit))
          .skip(Number(numberSkip));
      }

      res.status(200).json(dataWords);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getListVocabularySubjects: async (req: Request, res: Response) => {
    const { course = "" } = req.query || {};
    try {
      let listVocabularySubjects = [];
      if (course === "BASIC") {
        let sizeDataWords = await Words.find({
          topics: { $regex: course },
        }).count();
        for (let i = 0; i < Math.ceil(sizeDataWords / 20); i++) {
          listVocabularySubjects.push({
            _id: `Pack ${i + 1}`,
            title: `Chủ đề ${i + 1}`,
            subTitle: `20 Từ`,
            hrefImg: `Pack ${i + 1}`,
          });
        }
      } else {
        listVocabularySubjects = await VocabularySubjects.find({
          tag: { $regex: course },
        });
      }
      res.status(200).json(listVocabularySubjects);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getSizeCollection: async (req: Request, res: Response) => {
    try {
      const { subject = "" } = req.query || {};
      let sizeCollection: number;
      if (subject === "ALL") {
        sizeCollection = await Words.find().count();
      } else {
        sizeCollection = await Words.find({
          topics: { $regex: subject },
        }).count();
      }
      res.status(200).json(sizeCollection);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
export default wordController;
