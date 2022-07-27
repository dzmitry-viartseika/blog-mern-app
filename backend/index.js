import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {loginValidation, registerValidation} from './validations/auth-validation.js';
import { UserController, PostController } from './controllers/index.js'
import AuthMiddleware from './middlewares/Auth/auth-middleware.js';

dotenv.config();

mongoose
    .connect(process.env.DB_URL)
    .then(() => {console.log('DB is OK')})
    .catch((err) => {console.log('err', err)})

const app = express();
app.use(express.json());
// AUTH
app.post('/auth/login',  loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', AuthMiddleware, UserController.getMe);
// POST
app.post('/posts/create', PostController.create);
// app.delete('/posts/:id')
// app.patch('/posts/update')
// app.get('/posts/:id')
// app.get('/posts')

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server is OK PORT is ${process.env.PORT}`)
})
