import { Request, Response, NextFunction } from "express";
import Book, { IBook } from "../models/book.model";

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookname, author, quantity, price } = req.body;

    if (!bookname || !author || quantity == null || price == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook: IBook = new Book({
      bookname,
      author,
      quantity,
      price,
      date: new Date(),
    });

    const savedBook = await newBook.save();

    res.status(201).json({
      message: "Book added successfully",
      book: savedBook,
    });
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json({ message: "Books fetched successfully", books });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

export const editBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { bookname, author, quantity, price } = req.body;

    if (!bookname || !author || quantity == null || price == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedBook: IBook | null = await Book.findByIdAndUpdate(
      id,
      {
        bookname,
        author,
        quantity,
        price,
        date: new Date(),
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deleteBook: IBook | null = await Book.findByIdAndDelete(id);

    if (!deleteBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book: deleteBook,
    });
  } catch (error) {
    next(error);
  }
};
