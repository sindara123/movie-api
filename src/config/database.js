import mongoose from "mongoose";
import debug from "debug";

const dbConnect = debug("app:db");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGO_URI_DEV,
      {
        serverSelectionTimeoutMS: 5000,
      },
    );
    console.log(
      `MongoDB connected ${connectionInstance.connection.host} (${process.env.NODE_ENV || "development"})`,
    );

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected.");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected.");
    });
  } catch (err) {
    console.error(`MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
