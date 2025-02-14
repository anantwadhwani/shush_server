import mongoose from "mongoose";

// const mongoURI = 'mongodb://0.0.0.0:27017/shush-database';
const mongoURI = 'mongodb+srv://at:OBHCkIwKMSbSfVBf@shush-connection.xwnau.mongodb.net/';

const monogoConnect = () => {
    mongoose.connect(mongoURI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
};

export default monogoConnect;