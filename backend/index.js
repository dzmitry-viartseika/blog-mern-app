import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
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

app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
        }, process.env.SECRET_SESSION, {
            expiresIn: '30d',
        })

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать пользователя',
        })
    }
})

app.post('/auth/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            res.status(404).json({
                message: 'Неверный логин или пароль',
            })
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPassword) {
            res.status(404).json({
                message: 'Неверный логин или пароль',
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, process.env.SECRET_SESSION, {
            expiresIn: '30d',
        })

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        })

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
})

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server is OK PORT is ${process.env.PORT}`)
})
