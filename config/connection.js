import mongoose from "mongoose";

const connectionToDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error; 
  }
};

export default connectionToDB;