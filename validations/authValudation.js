import {body} from 'express-validator';

const loginValedation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 3}),
]

const registerValedation = [
  body('fullName', 'Укажите имя').isLength({min: 3}),
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
]


export {
  registerValedation,
  loginValedation,
};