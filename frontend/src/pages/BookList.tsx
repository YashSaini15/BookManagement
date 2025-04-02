import React, { useContext } from "react";
import { BooksContext } from "../context/BooksContext";
import { useNavigate } from "react-router-dom";
import { deleteBookAPI, getBooksAPI } from "../api/book";
import { toast } from "react-toastify";
import "../styles/BookList.css";
import toastMessages, { toastStyle } from "../config/toastMessages";

const BookList: React.FC = () => {
  const { books, setBooks } = useContext(BooksContext);
  const navigate = useNavigate();

  const handleRemoveBook = async (id: string) => {
    try {
      await deleteBookAPI(id);
      const updatedData = await getBooksAPI();
      setBooks(updatedData.books);
      toast.success(toastMessages.deleteBook.success, toastStyle.success);
    } catch (err: any) {
      toast.error(err.message || toastMessages.deleteBook.error, toastStyle.error);
    }
  };

  return (
    <div className="book-list">
      {books?.length > 0 ? (
        <table className="book-table">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Quantity</th>
              <th>Price($)</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: any) => (
              <tr key={book.id}>
                <td>{book.bookname}</td>
                <td>{book.author}</td>
                <td>{book.quantity}</td>
                <td>{book.price}</td>
                <td>{new Date(book.date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => navigate(`/edit/${book.id}`)}>
                    Edit
                  </button>
                  <button onClick={() => handleRemoveBook(book.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books found. Please add some books.</p>
      )}
    </div>
  );
};

export default BookList;
