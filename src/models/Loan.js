import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema(
  {
    fechaPrestamo: {
      type: Date,
      required: [true, 'La fecha de préstamo es obligatoria'],
    },
    fechaDevolucionEsperada: {
      type: Date,
      required: [true, 'La fecha de devolución esperada es obligatoria'],
      validate: {
        validator: function (value) {
          return value > this.fechaPrestamo;
        },
        message: 'La fecha de devolución esperada debe ser posterior a la fecha de préstamo',
      },
    },
    fechaDevuelto: {
      type: Date,
      default: null,
    },
    estado: {
      type: String,
      enum: ['active', 'returned', 'overdue'],
      default: 'active',
    },
    notas: {
      type: String,
      trim: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'El libro es obligatorio'],
    },
    reader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reader',
      required: [true, 'El lector es obligatorio'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Loan', loanSchema);