import { Response } from 'express';

const handleError = (res: Response, error: any, text: string) => res.status(500).send({ error, text });

export {handleError};