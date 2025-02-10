import mongoose from 'mongoose';

const mongoURL = 'mongodb://localhost:27017/resturant';

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