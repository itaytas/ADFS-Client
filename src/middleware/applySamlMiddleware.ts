import { Application, NextFunction, Request, Response } from 'express';
import { Configuration } from '../configuration';
import { passportClient } from '../clients/passportClient';

function applySamlMiddleware(app: Application): void {
    app.get(
        '/metadata.xml',
        passportClient.createGetMetadataRoute(
            Configuration.authentication.metadata.entityId,
            String(Configuration.authentication.saml.callbackUrl)
        )
    );

    app.use(passportClient.Instance.initialize());
    app.use(passportClient.Instance.session());
    app.get('/auth/saml', passportClient.Instance.authenticate('saml'));

    // Redirect from saml login page to what path we choose
    app.post(
        '/auth/saml/callback',
        passportClient.Instance.authenticate('saml'),
        (req: Request, res: Response) => {
            res.redirect('/api/user/me');
        }
    );

    // TODO: Remove this condition at production
    if (Configuration.application.isProduction) {
        app.use((req: Request, res: Response, next: NextFunction) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            !req.user ? res.redirect('/auth/saml') : next();
        });
    }
}

export { applySamlMiddleware };
