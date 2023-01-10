import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const playerSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    nameSity: { type: String, required: true },
    population: { type: Number, required: true },
    resourceBar: {
        wood: { type: Number, required: true },
        clay: { type: Number, required: true },
        iron: { type: Number, required: true },
        wheat: { type: Number, required: true },
    },
    capasity: {
        wood: { type: Number, required: true },
        clay: { type: Number, required: true },
        iron: { type: Number, required: true },
        wheat: { type: Number, required: true },
    },
    income: {
        wood: { type: Number, required: true },
        clay: { type: Number, required: true },
        iron: { type: Number, required: true },
        wheat: { type: Number, required: true },
    },
    mines: [
        {
            resorse: { type: String, required: true },
            level: { type: Number, required: true },
            imag: { type: String, required: true },
            title: { type: String, required: true },
            piple: { type: Number, required: true },
            income: { type: Number, required: true },
        },
    ],
    inventory: [
        {
            bonus: { type: String, },
            image: { type: String, },
            name: { type: String, },
            purpose: { type: String, },
            status: { type: Boolean, },
            cell: { type: Number, },
            order: { type: Number, },
        },
    ],
    compass: {
        type: Number,
        default: 100,
        required: true
    },
    health: {
        type: Number,
        default: 100,
        required: true
    },
    level: {
        type: Number,
        default: 0,
        required: true
    },
    experience: {
        type: Number,
        default: 0,
        required: true
    },
    adventure: {
        status: {
            type: Boolean,
            default: false,
            required: true
        },
        startTime: {
            type: Number,
            default: 0,
            required: true,
        },
        endTime: {
            type: Number,
            default: 0,
            required: true,
        },
        goBackTime: {
            type: Number,
            default: 0,
            required: true,
        },
        extraction: {
            type: Object,
            wood: { type: Number, default: 0 },
            clay: { type: Number, default: 0 },
            iron: { type: Number, default: 0 },
            wheat: { type: Number, default: 0 },
        }
    }
}, { timestamps: true });
export const playerModel = mongoose.model('Player', playerSchema);
