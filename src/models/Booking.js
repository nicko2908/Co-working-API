import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
{
    startDate: {
    type: Date,
    required: [true, 'La fecha de inicio es obligatoria'],
    },
    endDate: {
    type: Date,
    required: [true, 'La fecha de fin es obligatoria'],
    },
    status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
    },
    member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: [true, 'El miembro es obligatorio'],
    },
    room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: [true, 'La sala es obligatoria'],
    },
    notes: {
    type: String,
    trim: true,
    },
},
{ timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);