import express from 'express';
import cookieParser from 'cookie-parser'
import 'dotenv/config'

import connectDB from './db/connectDB.js';
import userRouter from './routes/user.route.js';
import eventRouter from './routes/event.route.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);

app.listen(PORT, () => {
    connectDB();
    console.log('Server is Listening to PORT: ', PORT);
})