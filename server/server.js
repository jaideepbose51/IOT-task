import express from "express";
import bodyParser from "body-parser";
import path from "path";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
// import dotenv from "dotenv";
import mongoose from "mongoose";

// dotenv.config();

const app = express();
const port = 3000;

mongoose.connect(
  "mongodb+srv://jaideep:Jaideep03@cluster0.udm7ere.mongodb.net/IOT",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  }
);

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server running on port ${port}`);
});
