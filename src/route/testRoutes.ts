import express, { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { passportClient } from '../clients/passportClient';

const testRouter = express.Router();

testRouter.get(
    '/',
    passportClient.createLoggedInUserAuthorizeMiddleware({ shouldRedirectToHome: true }),
    async (req: Request, res: Response, next: NextFunction) => {
        res.status(StatusCodes.OK).json({ message: 'ADFS client authentication succeeded' });
    }
);

export { testRouter };
