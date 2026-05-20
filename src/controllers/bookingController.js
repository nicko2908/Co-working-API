import Booking from '../models/Booking.js';

export const getBookings = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.roomId) filter.room = req.query.roomId;

    const bookings = await Booking.find(filter)
      .populate('member', 'name email plan')
      .populate('room', 'name type pricePerHour');
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('member', 'name email plan')
      .populate('room', 'name type pricePerHour');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Reserva no encontrada' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Reserva no encontrada' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};