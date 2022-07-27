import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Недостаточно защищенный пароль нужен минимум 5').isLength({min: 5}),
    body('fullName', 'Минимальное количество символов 3').isLength({min: 3}),
    body('avatarUrl', 'Неверно указан URL аватарки').optional().isURL(),
];
