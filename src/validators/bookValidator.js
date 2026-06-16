import { body, param } from 'express-validator';

export const validateBook = [
    body('titulo')
        .notEmpty().withMessage('El título es obligatorio')
        .isString().withMessage('El título debe ser texto')
        .trim(),

    body('isbn')
        .notEmpty().withMessage('El ISBN es obligatorio')
        .isISBN().withMessage('El ISBN no es válido'),

    body('genero')
        .notEmpty().withMessage('El género es obligatorio')
        .isIn(['fiction', 'non-fiction', 'sci-fi', 'history', 'other'])
        .withMessage('El género debe ser: fiction, non-fiction, sci-fi, history u other'),

    body('anio')
        .optional()
        .isInt({ min: 1000, max: new Date().getFullYear() })
        .withMessage(`El año debe ser un número entre 1000 y ${new Date().getFullYear()}`),

    body('copiasDisponibles')
        .optional()
        .isInt({ min: 0 }).withMessage('Las copias disponibles no pueden ser negativas'),

    body('author')
        .notEmpty().withMessage('El autor es obligatorio')
        .isMongoId().withMessage('El autor no es un ID válido'),
];

export const validateBookId = [
    param('id')
        .isMongoId().withMessage('El ID del libro no es válido'),
];