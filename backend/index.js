import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {loginValidation, registerValidation} from './validations/auth-validation.js';
import { UserController, PostController } from './controllers/index.js'
import AuthMiddleware from './middlewares/Auth/auth-middleware.js';
import { postCreateValidation } from './validations/post-validation.js';

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
app.post('/posts/', AuthMiddleware, postCreateValidation, PostController.create);
app.delete('/posts/:id', AuthMiddleware, PostController.remove);
app.patch('/posts/:id', AuthMiddleware, PostController.update);
app.get('/posts/:id', AuthMiddleware, PostController.getOne);
app.get('/posts', AuthMiddleware, PostController.getAll);

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server is OK PORT is ${process.env.PORT}`)
})
