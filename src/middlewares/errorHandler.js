import mongoose from 'mongoose';

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Error interno del servidor';

  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = 'ID no válido';
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = `El valor '${Object.values(err.keyValue)[0]}' ya está registrado`;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default errorHandler;