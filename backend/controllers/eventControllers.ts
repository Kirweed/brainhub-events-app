import { Request, Response } from "express";
import eventModel from "../models/eventModel";

export const createEvent = async (req: Request, res: Response) => {
  if (
    req.body &&
    req.body.firstName &&
    req.body.lastName &&
    req.body.email &&
    req.body.date
  ) {
    const { firstName, lastName, email, date } = req.body;
    const event = await eventModel.create({
      firstName,
      lastName,
      email,
      date,
    });
    res.status(201).json(event);
  } else {
    res.status(400).json("Failure");
    throw new Error("Invalid request!");
  }
};
