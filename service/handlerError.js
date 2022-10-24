
const handleError = (res, error, text) => res.status(500).send({ error, text });

export {handleError};