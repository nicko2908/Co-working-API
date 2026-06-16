import { body, param } from 'express-validator';

export const validateReader = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser texto')
        .trim(),

    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email no es válido')
        .normalizeEmail(),

    body('membresia')
        .optional()
        .isIn(['standard', 'premium'])
        .withMessage('La membresía debe ser: standard o premium'),

    body('activo')
        .optional()
        .isBoolean().withMessage('El campo activo debe ser true o false'),
];

export const validateReaderId = [
    param('id')
        .isMongoId().withMessage('El ID del lector no es válido'),
];