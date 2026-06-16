import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
    nombre: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        select: false,
    },
    rol: {
        type: String,
        enum: ['admin', 'librarian'],
        default: 'librarian',
    },
    },
{ timestamps: true }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

export default mongoose.model('User', userSchema);