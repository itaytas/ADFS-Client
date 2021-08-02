import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IErrorMetadata } from '../model/IErrorMetadata';

export function errorHandlerMiddleware(
    errorMetadata: IErrorMetadata,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (errorMetadata.error) {
        console.error(`${errorMetadata.error} ${errorMetadata.stackTrace}`);
        res.status(errorMetadata.code).send(errorMetadata.error);
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
}
