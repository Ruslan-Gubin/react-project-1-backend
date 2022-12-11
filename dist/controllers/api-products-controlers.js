import { productService } from "../service/index.js";
import { handleError } from "../utils/index.js";
class ProductController {
    async getProducts(req, res) {
        await productService
            .getAllSortProducts(req)
            .then((products) => res.status(200).json(products))
            .catch((error) => handleError(res, error.message, "Не удалось получить все товары"));
    }
    async getOneProduct(req, res) {
        const id = req.params.id;
        await productService
            .getOneId(id)
            .then((product) => res.status(200).json(product))
            .catch((error) => handleError(res, error.message, "Не удалось получить продукт"));
    }
    async getCatigoriesInDepartment(req, res) {
        const department = req.query.department;
        await productService
            .getCatigoriesInDepartment(department)
            .then((categories) => res.status(200).json(categories))
            .catch((error) => handleError(res, error.message, "Не удалось получить категории"));
    }
    async getImagesFromSwiper(req, res) {
        await productService
            .getImagesFromSwiper()
            .then((images) => res.status(200).json(images))
            .catch((error) => handleError(res, error.message, "Не удалось получить изображения"));
    }
    async addProduct(req, res) {
        const reqBody = req.body;
        await productService
            .addProduct(reqBody)
            .then(() => res.status(201).json({ success: true }))
            .catch((error) => handleError(res, error, "Не удалось создать продукт"));
    }
    async removeProduct(req, res) {
        const body = req.body;
        await productService
            .removeProduct(body)
            .then((removeRes) => res.status(200).json(removeRes))
            .catch((error) => handleError(res, error.message, "Не удалось удалить продукт"));
    }
    async editProduct(req, res) {
        const body = req.body;
        await productService
            .update(body)
            .then((newProduct) => res.status(200).json(newProduct))
            .catch((error) => handleError(res, error, "Не удалось изменить продукт"));
    }
    async buyProduct(req, res) {
        const body = req.body;
        await productService
            .buyProduct(body)
            .then((success) => res.status(200).json(success))
            .catch((error) => handleError(res, error, "Не удалось создать заказ"));
    }
    async createrComment(req, res) {
        const body = req.body;
        await productService
            .createrComment(body)
            .then((response) => res.status(200).json(response))
            .catch((error) => handleError(res, error, "Не удалось изменить продукт"));
    }
    async removeComment(req, res) {
        const body = req.body;
        await productService
            .removeComment(body)
            .then((response) => res.status(200).json(response))
            .catch((error) => handleError(res, error, "Не удалось изменить продукт"));
    }
}
export const productController = new ProductController();
