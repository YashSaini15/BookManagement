import instance from "./axiosConfig";

export interface Book {
  id: string;
  bookname: string;
  author: string;
  quantity: number;
  price: number;
  date: string;
}

export interface NewBook {
  bookname: string;
  author: string;
  quantity: number;
  price: number;
  date: string;
}

export interface BookResponse {
  message: string;
  book: Book;
}

export interface BooksResponse {
  message: string;
  books: Book[];
}

export interface DeleteBookResponse {
  message: string;
}

export const addBookAPI = async (book: NewBook): Promise<BookResponse> => {
  const response = await instance.post<BookResponse>("/books", book);
  return response.data;
};

export const getBooksAPI = async (): Promise<BooksResponse> => {
  const response = await instance.get<BooksResponse>("/books");

  return {
    ...response.data,
    books: response.data.books.map((book) => ({
      ...book,
      date: new Date(book.date).toISOString(),
    })),
  };
};


export const editBookAPI = async (
  id: string,
  book: NewBook
): Promise<BookResponse> => {
  const response = await instance.put<BookResponse>(`/books/${id}`, book);
  return response.data;
};

export const deleteBookAPI = async (
  id: string
): Promise<DeleteBookResponse> => {
  const response = await instance.delete<DeleteBookResponse>(`/books/${id}`);
  return response.data;
};
