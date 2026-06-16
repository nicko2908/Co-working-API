import { Router } from 'express';
import {
    getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor
} from '../controllers/authorController.js';
import {
    validateAuthor, validateAuthorId, handleValidationErrors
} from '../validators/authorValidator.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.route('/')
    .get(verifyToken, getAuthors)
    .post(verifyToken, validateAuthor, handleValidationErrors, createAuthor);

router.route('/:id')
    .get(verifyToken, validateAuthorId, handleValidationErrors, getAuthorById)
    .put(verifyToken, validateAuthorId, validateAuthor, handleValidationErrors, updateAuthor)
    .delete(verifyToken, validateAuthorId, handleValidationErrors, deleteAuthor);

export default router;