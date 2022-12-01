import jwt from "jsonwebtoken";
var checkAuth = function (req, res, next) {
    var token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (token) {
        try {
            var decoded = jwt.verify(token, "secret123");
            req.userId = decoded._id;
            next();
        }
        catch (error) {
            console.log(error, "Нет доступа");
            return res.status(403).json({
                message: "Нет доступа",
            });
        }
    }
    else {
        return res.status(402).json({
            message: "Нет доступа!",
        });
    }
};
export { checkAuth };
