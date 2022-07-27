import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import {loginValidation, registerValidation} from './validations/auth-validation.js';
import { UserController, PostController } from './controllers/index.js'
import AuthMiddleware from './middlewares/Auth/auth-middleware.js';
import validationResult from './middlewares/Errors/handleValidationErrors.js';
import { postCreateValidation } from './validations/post-validation.js';

dotenv.config();

mongoose
    .connect(process.env.DB_URL)
    .then(() => {console.log('DB is OK')})
    .catch((err) => {console.log('err', err)})

const app = express();
app.use(cors());
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));
app.use(express.json());
// AUTH
app.post('/auth/login', loginValidation, validationResult, UserController.login);
app.post('/auth/register', registerValidation, validationResult, UserController.register);
app.get('/auth/me', AuthMiddleware, UserController.getMe);
// POST
app.post('/posts/', AuthMiddleware, postCreateValidation, validationResult, PostController.create);
app.delete('/posts/:id', AuthMiddleware, PostController.remove);
app.patch('/posts/:id', AuthMiddleware, validationResult, PostController.update);
app.get('/posts/:id', AuthMiddleware, PostController.getOne);
app.get('/posts', AuthMiddleware, PostController.getAll);

// FILES
app.post('/upload', AuthMiddleware, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server is OK PORT is ${process.env.PORT}`)
})
