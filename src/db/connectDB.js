import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Database Connected');
    } catch (error) {
        console.log('Error in Connecting DB: ', error.message);
    }
}

export default connectDB