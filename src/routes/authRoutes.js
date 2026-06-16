import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../validators/authValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';

const router = Router();

router.route('/register').post(validateRegister, handleValidationErrors, register);
router.route('/login').post(validateLogin, handleValidationErrors, login);

export default router;