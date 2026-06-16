import { body, param } from 'express-validator';

export const validateLoan = [
    body('fechaPrestamo')
        .notEmpty().withMessage('La fecha de préstamo es obligatoria')
        .isISO8601().withMessage('La fecha de préstamo debe tener formato válido (YYYY-MM-DD)')
        .toDate(),

    body('fechaDevolucionEsperada')
        .notEmpty().withMessage('La fecha de devolución esperada es obligatoria')
        .isISO8601().withMessage('La fecha de devolución esperada debe tener formato válido (YYYY-MM-DD)')
        .toDate()
        .custom((value, { req }) => {
            const fechaPrestamo = new Date(req.body.fechaPrestamo);
            const fechaDevolucion = new Date(value);
            if (fechaDevolucion <= fechaPrestamo) {
                throw new Error('La fecha de devolución esperada debe ser posterior a la fecha de préstamo');
            }
            return true;
        }),

    body('fechaDevuelto')
        .optional()
        .isISO8601().withMessage('La fecha de devolución debe tener formato válido (YYYY-MM-DD)')
        .toDate(),

    body('notas')
        .optional()
        .isString().withMessage('Las notas deben ser texto')
        .trim(),

    body('book')
        .notEmpty().withMessage('El libro es obligatorio')
        .isMongoId().withMessage('El libro no es un ID válido'),

    body('reader')
        .notEmpty().withMessage('El lector es obligatorio')
        .isMongoId().withMessage('El lector no es un ID válido'),
];

export const validateLoanStatus = [
    body('estado')
        .notEmpty().withMessage('El estado es obligatorio')
        .isIn(['active', 'returned', 'overdue'])
        .withMessage('El estado debe ser: active, returned u overdue'),

    body('fechaDevuelto')
        .if(body('estado').equals('returned'))
        .notEmpty().withMessage('La fecha de devolución es obligatoria cuando el estado es returned')
        .isISO8601().withMessage('La fecha de devolución debe tener formato válido (YYYY-MM-DD)')
        .toDate(),
];

export const validateLoanId = [
    param('id')
        .isMongoId().withMessage('El ID del préstamo no es válido'),
];