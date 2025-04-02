import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import { BooksContext } from "../context/BooksContext";
import { editBookAPI, getBooksAPI, NewBook } from "../api/book";
import { toast } from "react-toastify";
import toastMessages, { toastStyle } from "../config/toastMessages";
import "../styles/EditBook.css";
const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { books, setBooks } = useContext(BooksContext);
  const navigate = useNavigate();

  const bookToEdit = books.find((book: any) => book.id === id);

  const handleOnSubmit = async (updatedBookData: any) => {
    try {
      const updatedBookInput: NewBook = {
        bookname: updatedBookData.bookname,
        author: updatedBookData.author,
        quantity: Number(updatedBookData.quantity),
        price: Number(updatedBookData.price),
        date: new Date().toISOString(),
      };

      await editBookAPI(id!, updatedBookInput);

      const updatedBooks = await getBooksAPI();
      setBooks(updatedBooks.books);
      toast.success(toastMessages.editBook.success, toastStyle.success);
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || toastMessages.editBook.error, toastStyle.error);
    }
  };

  if (!bookToEdit) {
    return <p>Book not found</p>;
  }

  return (
    <div className="edit-book">
      <h2>Edit Book</h2>
      <BookForm initialData={bookToEdit} handleOnSubmit={handleOnSubmit} />
    </div>
  );
};

export default EditBook;
