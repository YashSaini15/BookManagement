import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import { BooksContext } from "../context/BooksContext";
import { addBookAPI, getBooksAPI, NewBook } from "../api/book";
import { toast } from "react-toastify";
import toastMessages, { toastStyle } from "../config/toastMessages";
import "../styles/BookForm.css";

const AddBook: React.FC = () => {
  const { setBooks } = useContext(BooksContext);
  const navigate = useNavigate();

  const handleOnSubmit = async (bookData: any) => {
    try {
      const newBook: NewBook = {
        bookname: bookData.bookname,
        author: bookData.author,
        quantity: Number(bookData.quantity),
        price: Number(bookData.price),
        date: new Date().toISOString(),
      };

      await addBookAPI(newBook);
      const updatedBooks = await getBooksAPI();
      setBooks(updatedBooks.books);
      toast.success(toastMessages.addBook.success, toastStyle.success);
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || toastMessages.addBook.error, toastStyle.error);
    }
  };

  return (
    <div className="add-book">
      <h2>Add a New Book</h2>
      <BookForm handleOnSubmit={handleOnSubmit} />
    </div>
  );
};

export default AddBook;
