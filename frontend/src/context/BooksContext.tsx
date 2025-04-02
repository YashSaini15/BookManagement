import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getBooksAPI, Book } from "../api/book";

interface BooksContextType {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

export const BooksContext = createContext<BooksContextType>({
  books: [],
  setBooks: () => {},
});

export const BooksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooksAPI();
        setBooks(response.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};
