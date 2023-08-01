import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middlewere/Errorhandler.js";
dotenv.config();
import { connectDB } from "./config/DataBase.js";
import { AllUser } from "./routes/AllUser.js";
import cors from "cors";

const PORT = process.env.PORT || 5005;

connectDB();

const app = express();

const corsOptions = {
  origin: "http://localhost:3002",
  // Add other CORS options if needed
};

app.use(cors(corsOptions));

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.use("/user", AllUser);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Connected to server on port ${PORT}`);
});
