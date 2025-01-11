import mongoose from 'mongoose';

const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 1) return; // Already connected
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'test', // Specify the database name here
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
};

export { connectToDatabase };
