import { Request, Response } from "express";
import eventModel from "../models/eventModel";
import { dateValidator } from "../validators/dateValidator";
import { emailValidator } from "../validators/emailValidator";
import { nameValidator } from "../validators/nameValidator";

export const createEvent = async (req: Request, res: Response) => {
  if (
    req.body &&
    req.body.firstName &&
    req.body.lastName &&
    req.body.email &&
    req.body.date
  ) {
    const { firstName, lastName, email, date } = req.body;
    const parsedDate = new Date(date);
    if (!nameValidator(firstName)) {
      res.status(400).json("The first name should be 3 to 30 characters long");
      return;
    }
    if (!nameValidator(firstName)) {
      res.status(400).json("The last name should be 3 to 30 characters long");
      return;
    }
    if (!emailValidator(email)) {
      res.status(400).json("This is not correct email adress");
      return;
    }
    if (!dateValidator(parsedDate)) {
      res.status(400).json("This is not correct date");
      return;
    }
    const event = await eventModel.create({
      firstName,
      lastName,
      email,
      date: parsedDate,
    });
    res.status(201).json(event);
  } else {
    res.status(400).json("Invalid reqest");
    throw new Error("Invalid request!");
  }
};
