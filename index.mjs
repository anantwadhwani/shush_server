import monogoConnect from "./db.mjs";
import express from "express";
import cors from 'cors';
import auth from './route/auth.mjs';
import shush from './route/shush.mjs';

monogoConnect();

const app = express();

app.use(cors());
app.use(express.json());

const corsOptions = {
    origin: ["https://shush-w3d5.onrender.com", "http://localhost:3000"], // frontend URI (ReactJS)
};
app.use(cors(corsOptions));

// Available Routes
app.use('/auth', auth);
app.use('/shush', shush);

// app.get("/*", function (req, res) {
//     res.sendFile("C:/Users/91878/Dropbox/PC/Desktop/React/shush/public/index.html", function (err) {
//         if (err) {
//             res.status(500).send(err);
//         }
//     });
// });

const port = 4000;
app.listen(port, () => {
    console.log(`Shush Backend server running at ${port}`);
});
