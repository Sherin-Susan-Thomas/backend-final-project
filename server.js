import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8080;
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");

//connection to monogDB
const mongoUrl = process.env.MONGO_URL;
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("connected to mongoDB"))
  .catch((error) => console.log(error));
mongoose.Promise = Promise;

//stores images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "picture.jpeg");
  },
});

const upload = multer({ storage: storage });
app.post("/api/uploads", upload.single("file"), (req, res) => {
  res.status(200).json("file uploaded");
});
// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(" Technigo Final Project");
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
