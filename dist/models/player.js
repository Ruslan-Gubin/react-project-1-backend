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
}, { timestamps: true });
export const playerModel = mongoose.model('Player', playerSchema);
