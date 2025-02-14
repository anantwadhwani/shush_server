import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const mongoURI = process.env.MONGODB_URI;
// const mongoURI = 'mongodb://0.0.0.0:27017/shush-database';

const monogoConnect = () => {
    mongoose.connect(mongoURI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
};

export default monogoConnect;