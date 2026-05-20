import { Router } from 'express';
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
} from '../controllers/bookingController.js';

const router = Router();

router.route('/')
  .get(getBookings)
  .post(createBooking);

router.route('/:id')
  .get(getBookingById);

router.route('/:id/status')
  .patch(updateBookingStatus);

export default router;