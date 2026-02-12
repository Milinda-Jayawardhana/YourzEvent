import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB')
    })

    try {
        const uri = process.env.MONGODB_URI
        if (!uri) throw new Error('MONGODB_URI is not set in .env')
        await mongoose.connect(uri)
    } catch (err) {
        console.error('MongoDB connection error:', err)
        process.exit(1)
    }

}

export default connectDB; 