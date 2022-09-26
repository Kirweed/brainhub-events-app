import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: 3,
    maxLength: 30,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 30,
    required: true,
  },
  email: {
    type: String,
    maxLength: 50,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const event = mongoose.model("Event", eventSchema);

export default event;
