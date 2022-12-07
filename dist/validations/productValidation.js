import { body } from 'express-validator';
const productValedation = [
    body('title', 'Введите заголовок продукта').isLength({ min: 3 }).isString(),
    body('description', 'Введите описание продукта').isLength({ min: 3 }).isString(),
    body('department', 'Не указан отдел товара').isLength({ min: 3 }).isString(),
    body('price', 'Не указана цена товара').isLength({ min: 1 }),
    body('images', 'Неверная файл изображение').notEmpty(),
];
export { productValedation, };
