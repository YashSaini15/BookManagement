import React, { useState, ChangeEvent, FormEvent } from "react";
import { validationMessages } from "../config/bookFormValidation";

interface Book {
  id?: string;
  bookname: string;
  author: string;
  quantity: number | string;
  price: number | string;
  date?: string;
}

interface BookFormProps {
  initialData?: Book;
  handleOnSubmit: (book: Book) => void;
}

interface ValidationErrors {
  bookname?: string;
  author?: string;
  quantity?: string;
  price?: string;
}

const BookForm: React.FC<BookFormProps> = ({ initialData, handleOnSubmit }) => {
  const [book, setBook] = useState<Book>({
    bookname: initialData?.bookname || "",
    author: initialData?.author || "",
    quantity: initialData?.quantity || "",
    price: initialData?.price || "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validate = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};
  
    if (!book.bookname.trim()) {
      newErrors.bookname = validationMessages.bookname.required;
    } else if (book.bookname.trim().length < 2) {
      newErrors.bookname = validationMessages.bookname.minLength;
    }
  
    if (!book.author.trim()) {
      newErrors.author = validationMessages.author.required;
    }
  
    if (!book.quantity.toString().trim()) {
      newErrors.quantity = validationMessages.quantity.required;
    } else if (isNaN(Number(book.quantity))) {
      newErrors.quantity = validationMessages.quantity.number;
    } else if (Number(book.quantity) <= 0) {
      newErrors.quantity = validationMessages.quantity.min;
    }
  
    if (!book.price.toString().trim()) {
      newErrors.price = validationMessages.price.required;
    } else if (isNaN(Number(book.price))) {
      newErrors.price = validationMessages.price.number;
    } else if (Number(book.price) <= 0) {
      newErrors.price = validationMessages.price.min;
    }
  
    return newErrors;
  };
  

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    handleOnSubmit({ ...book, date: new Date().toISOString() });
  };

  return (
    <form onSubmit={onSubmit} className="book-form">
      <div>
        <label htmlFor="bookname">Book Name:</label>
        <input
          id="bookname"
          type="text"
          name="bookname"
          value={book.bookname}
          onChange={handleInputChange}
        />
        {errors.bookname && <span className="error">{errors.bookname}</span>}
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          type="text"
          name="author"
          value={book.author}
          onChange={handleInputChange}
        />
        {errors.author && <span className="error">{errors.author}</span>}
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          id="quantity"
          type="number"
          name="quantity"
          value={book.quantity}
          onChange={handleInputChange}
        />
        {errors.quantity && <span className="error">{errors.quantity}</span>}
      </div>
      <div>
        <label htmlFor="price">Price($):</label>
        <input
          id="price"
          type="number"
          name="price"
          value={book.price}
          onChange={handleInputChange}
        />
        {errors.price && <span className="error">{errors.price}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookForm;
