import { Router } from 'express';
import {
    getLoans, getLoanById, createLoan, updateLoanStatus
} from '../controllers/loanController.js';
import {
    validateLoan, validateLoanStatus, validateLoanId
} from '../validators/loanValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.route('/')
    .get(verifyToken, getLoans)
    .post(verifyToken, validateLoan, handleValidationErrors, createLoan);

router.route('/:id')
    .get(verifyToken, validateLoanId, handleValidationErrors, getLoanById);

router.route('/:id/status')
    .patch(verifyToken, validateLoanId, validateLoanStatus, handleValidationErrors, updateLoanStatus);

export default router;