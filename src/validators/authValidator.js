import { body, validationResult } from 'express-validator';

export const validateRegister = [
    body('nombre')
        .optional()
        .isString().withMessage('El nombre debe ser texto')
        .trim(),

    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email no es válido')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener mínimo 8 caracteres')
        .matches(/[A-Z]/).withMessage('Debe contener al menos una mayúscula')
        .matches(/[0-9]/).withMessage('Debe contener al menos un número'),

    body('rol')
        .optional()
        .isIn(['admin', 'librarian']).withMessage('El rol debe ser admin o librarian'),
];

export const validateLogin = [
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email no es válido')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria'),
];