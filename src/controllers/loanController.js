import Loan from '../models/Loan.js';

export const getLoans = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.estado = req.query.status;
    if (req.query.genre) filter['book.genero'] = req.query.genre;
    const loans = await Loan.find(filter)
      .populate('book')
      .populate('reader');
    res.json({ success: true, data: loans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id)
      .populate('book')
      .populate('reader');
    if (!loan) {
      return res.status(404).json({ success: false, message: 'Préstamo no encontrado' });
    }
    res.json({ success: true, data: loan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createLoan = async (req, res) => {
  try {
    const { fechaPrestamo, fechaDevolucionEsperada } = req.body;
    if (new Date(fechaDevolucionEsperada) <= new Date(fechaPrestamo)) {
      return res.status(400).json({
        success: false,
        message: 'La fecha de devolución esperada debe ser posterior a la fecha de préstamo',
      });
    }
    const loan = await Loan.create(req.body);
    res.status(201).json({ success: true, data: loan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateLoanStatus = async (req, res) => {
  try {
    const { estado } = req.body;
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true, runValidators: true }
    );
    if (!loan) {
      return res.status(404).json({ success: false, message: 'Préstamo no encontrado' });
    }
    res.json({ success: true, data: loan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};