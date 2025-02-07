import monogoConnect from "./db.mjs";
import express from "express";
import cors from 'cors';
import auth from './route/auth.mjs';
import shush from './route/shush.mjs';

monogoConnect();

const app = express();
app.use(cors())
app.use(express.json());

// Available Routes
app.use('/auth', auth);
app.use('/shush', shush);

const port = 5000;
app.listen(port, () => {
    console.log(`Shush Backend server running at http://localhost:${port}`)
})