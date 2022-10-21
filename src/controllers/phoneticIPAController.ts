import { PhoneticIPA, IPhoneticIPA } from "../models";
import { Request, Response } from "express";

const PhoneticIPAController = {
  addPhoneticIPA: async (req: Request, res: Response) => {
    try {
      console.log("req", req.body);
      const arrPhonetics = req.body;
      arrPhonetics.forEach(async (element: IPhoneticIPA) => {
        const newPhoneticIPA = new PhoneticIPA(element);
        await newPhoneticIPA.save((err: any) => {
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

  getPhoneticIPA: async (req: Request, res: Response) => {
    try {
      const phoneticIPAs = await PhoneticIPA.find();
      res.status(200).json(phoneticIPAs);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default PhoneticIPAController;
