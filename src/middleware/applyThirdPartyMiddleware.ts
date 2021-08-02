import express, { Application, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { Configuration } from '../configuration';

export function applyThirdPartyMiddleware(app: Application): void {
    app.use(cors(Configuration.cors));
    app.use(express.json({ limit: Configuration.application.jsonBodyMaxSize }));
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));

    app.use(
        session({
            // don't create session until something stored
            cookie: {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                path: '/',
                sameSite: false
            },
            resave: false, // don't save session if unmodified
            saveUninitialized: false,
            secret: Configuration.application.sessionsSecret
        })
    );
    app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    });
}
