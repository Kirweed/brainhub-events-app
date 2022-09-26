import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  date: Date,
});

const event = mongoose.model("Event", eventSchema);

export default event;
