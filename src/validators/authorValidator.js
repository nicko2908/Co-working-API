import { body, param, validationResult } from 'express-validator';

export const validateAuthor = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser texto')
        .trim(),

    body('nacionalidad')
        .optional()
        .isString().withMessage('La nacionalidad debe ser texto')
        .trim(),

    body('fechaNacimiento')
        .optional()
        .isISO8601().withMessage('La fecha debe tener formato válido (YYYY-MM-DD)')
        .toDate(),
];

export const validateAuthorId = [
    param('id')
        .isMongoId().withMessage('El ID no es válido'),
];

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};