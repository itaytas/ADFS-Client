import { Application } from 'express';
import { router } from '../route/router';
import { errorHandlerMiddleware } from './errorHandlerMiddleware';

export function applyRoutesMiddleware(app: Application): void {
    app.use('/api', router);
    app.use(errorHandlerMiddleware);
}
