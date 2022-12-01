import { validationResult } from "express-validator";
var handleValidationErrors = function (req, res, next) {
    var errors = validationResult(req);
    if (!errors.isEmpty())
        res.status(400).json(errors.array());
    next();
};
export { handleValidationErrors };
