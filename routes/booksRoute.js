import express from 'express';
import { Book } from "../models/bookModel.js";
const router=express.Router();


//Route For Saving a Book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({
          message: "Send all required fields:title , author , publishYear ",
        });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//Route For Get All Books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(201).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({ message: error.message });
  }
});
//Route For Get Book By ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.send(500).send({ message: error.message });
  }
});
//Route For Update Book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title , author , publishYear ",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return res.status(404).send({ message: "Book Not Found" });
    }
    return res.status(201).send({ message: "Book Updated", result });
  } catch (error) {
    console.log(error);
    res.send(500).send({ message: error.message });
  }
});
//Route For Deleting Book By id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Book Not Found" });
    }
    return res.status(201).send({ message: "Book Deleted" });
  } catch (error) {
    console.log(error);
    res.send(500).send({ message: error.message });
  }
});

export default router;