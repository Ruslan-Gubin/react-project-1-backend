import {body} from 'express-validator';

const commentValedation = [
  body('text', 'Введите текст коментария').isLength({min: 3}).isString(),
]

export {
  commentValedation,
}