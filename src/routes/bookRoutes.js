import { Router } from 'express';
import {
    getBooks, getBookById, createBook, updateBook, deleteBook
} from '../controllers/bookController.js';
import { validateBook, validateBookId } from '../validators/bookValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.route('/')
    .get(verifyToken, getBooks)
    .post(verifyToken, validateBook, handleValidationErrors, createBook);

router.route('/:id')
    .get(verifyToken, validateBookId, handleValidationErrors, getBookById)
    .put(verifyToken, validateBookId, validateBook, handleValidationErrors, updateBook)
    .delete(verifyToken, validateBookId, handleValidationErrors, deleteBook);

export default router;