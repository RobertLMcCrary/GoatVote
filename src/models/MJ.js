import mongoose from 'mongoose';

const MJSchema = new mongoose.Schema({
    votes: { type: Number, required: true },
});

// Avoid overwriting the model if it's already defined
const MJModel = mongoose.models.MJ || mongoose.model('MJ', MJSchema);

export default MJModel;
