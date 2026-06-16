import { Router } from 'express';
import {
    getReaders, getReaderById, createReader, updateReader, deleteReader
} from '../controllers/readerController.js';
import { validateReader, validateReaderId } from '../validators/readerValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.route('/')
    .get(verifyToken, getReaders)
    .post(verifyToken, validateReader, handleValidationErrors, createReader);

router.route('/:id')
    .get(verifyToken, validateReaderId, handleValidationErrors, getReaderById)
    .put(verifyToken, validateReaderId, validateReader, handleValidationErrors, updateReader)
    .delete(verifyToken, validateReaderId, handleValidationErrors, deleteReader);

export default router;