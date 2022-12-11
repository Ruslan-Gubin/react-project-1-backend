class Controller {
    constructor() { }
    handlerError(res, error, text) {
        return res.status(500).send({ error, text });
    }
    async create(req, res, errorText) {
        await this.service
            .create(req)
            .then((comments) => res.status(201).json(comments))
            .catch((error) => this.handleError(res, error, errorText));
    }
    async getAll(req, res, errorText) {
        await this.service
            .getAll(req.params.limit)
            .then((comments) => res.status(200).json(comments))
            .catch((error) => this.handleError(res, error, errorText));
    }
    async getOne(req, res, errorText) {
        await this.service
            .getOne(req.params.id)
            .then((comment) => res.status(200).json(comment))
            .catch((error) => handleError(res, error, errorText));
    }
    async remove(req, res, errorText) {
        await this.service
            .remove(req.params.id)
            .then(() => res.status(200).json(req.params.id))
            .catch((error) => handleError(res, error, errorText));
    }
    async update(req, res, errorText) {
        await this.service
            .update(req)
            .then(() => res.status(200).json({ success: true }))
            .catch((error) => handleError(res, error, errorText));
    }
}
export {};
