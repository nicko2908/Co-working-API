import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
{
    name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    },
    capacity: {
    type: Number,
    required: [true, 'La capacidad es obligatoria'],
    },
    type: {
    type: String,
    enum: ['private', 'shared', 'meeting_room'],
    required: [true, 'El tipo es obligatorio'],
    },
    pricePerHour: {
    type: Number,
    required: [true, 'El precio por hora es obligatorio'],
    },
},
{ timestamps: true }
);

export default mongoose.model('Room', roomSchema);