import mongoose from 'mongoose';

const { Schema } = mongoose;

const LeBronSchema = new Schema({
    votes: {
        type: Number,
        required: true,
    },
});

// Avoid overwriting the model if it's already defined
const LeBronModel =
    mongoose.models.LeBron || mongoose.model('LeBron', LeBronSchema);

export default LeBronModel;
