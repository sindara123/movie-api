//Entry Point
import dotenv from "dotenv";
dotenv.config();
import debug from "debug";
import connectDB from "./config/database.js";
import app from "./app.js";

const startup = debug("app:startup");

const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("Private Key not defined.");
  process.exit(1);
}

process.on("uncaughtException", (err) => {
  console.error("Unexpected Error.");
  console.error(err instanceof Error ? err.stack : err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandle Rejection", reason);
  process.exit(1);
});

//Express & MongoDB
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
};

startServer();
