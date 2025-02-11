import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoURL = process.env.DB_URL

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to the database')
});

db.on('error', (err) => {
    console.error('Error connecting to the database', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from the database')
});

export default db;