import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = process.env.MONGO_URI
      ? await mongoose.connect(process.env.MONGO_URI)
      : null;

    console.log(`MongoDb connected: ${conn?.connection.host}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default connectDB;
