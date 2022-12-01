var handleError = function (res, error, text) { return res.status(500).send({ error: error, text: text }); };
export { handleError };
