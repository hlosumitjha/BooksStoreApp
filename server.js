import express from "express";
import { PORT, MongoDBURL } from "./config.js";
const app = express();
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

app.use(express.json());

app.use(cors({
  origin:"http://localhost:3000",
  methods:['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type'],
}))


app.get("/", (req, res) => {
  return res.status(200).send("Server is Running");
});

app.use("/books", booksRoute);

mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
