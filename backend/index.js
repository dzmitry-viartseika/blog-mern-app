import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth-validation.js';
import { UserController } from './controllers/index.js'
import AuthMiddleware from './middlewares/Auth/auth-middleware.js';

dotenv.config();

mongoose
    .connect(process.env.DB_URL)
    .then(() => {console.log('DB is OK')})
    .catch((err) => {console.log('err')})

const app = express();
app.use(express.json());

app.post('/auth/login', registerValidation, UserController.login);
app.post('/auth/register', UserController.register);
app.get('/auth/me', AuthMiddleware, UserController.getMe);

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server is OK PORT is ${process.env.PORT}`)
})
