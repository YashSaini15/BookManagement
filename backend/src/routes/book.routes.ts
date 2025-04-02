import { Router } from "express";
import {
  addBook,
  getBooks,
  editBook,
  deleteBook,
} from "../controllers/book.controller";
import { authenticate } from "../middleware/auth.middleware";
const router = Router();

router.get("/books", authenticate, getBooks);
router.post("/books", authenticate, addBook);
router.put("/books/:id", authenticate, editBook);
router.delete("/books/:id", authenticate, deleteBook);

export default router;
