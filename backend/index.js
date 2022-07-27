import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth-validation.js';
import { validationResult } from 'express-validator';
import UserModel from './models/user-model.js';

dotenv.config();

mongoose
    .connect(process.env.DB_URL)
    .then(() => {console.log('DB is OK')})
    .catch((err) => {console.log('err')})

const app = express();
app.use(express.json());

app.post('/auth/register', registerValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    res.json({
        success: true,
    })
})

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server is OK PORT is ${process.env.PORT}`)
})
