import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { Strategy as SamlStrategy, VerifiedCallback, Profile } from 'passport-saml';
import path from 'path';
import { Configuration, IProfileExtractor } from '../configuration';
import { LooseObject } from '../interface/LooseObject';
import { createMetadataFile } from '../samlMetadata';

class PassportClient {
    constructor() {
        passport.use(
            new SamlStrategy(
                Configuration.authentication.saml,
                (req: Request, profile: Profile | null | undefined, done: VerifiedCallback) => {
                    const profileExtracted = PassportClient.profileExtractor(
                        profile,
                        Configuration.authentication.profileExtractor
                    );
                }
            )
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        passport.serializeUser((user: any, done: (err: Error | null, id?: any) => void) => {
            done(null, user.id);
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        passport.deserializeUser(async (id: any, done: (err: any, user?: any) => void) => {
            done(null, { id });
        });
    }

    // eslint-disable-next-line class-methods-use-this
    public get Instance() {
        return passport;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static profileExtractor(profile: Profile | null | undefined, mappingObject: any) {
        const dynamicProfile: LooseObject = {};
        if (profile) {
            Object.keys(mappingObject).map(
                // eslint-disable-next-line no-return-assign
                key => (dynamicProfile[key] = profile[mappingObject[key]])
            );
        }

        return dynamicProfile;
    }

    // eslint-disable-next-line class-methods-use-this
    public createLoggedInUserAuthorizeMiddleware(args: { shouldRedirectToHome: boolean }) {
        return (req: Request, res: Response, next: NextFunction) => {
            const { user } = req;

            if (!user) {
                console.error('Authorization error: user tried to access route without user on the session');
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                args.shouldRedirectToHome ? res.redirect('/auth/saml') : res.redirect('/unauthorized');
            } else {
                next();
            }
        };
    }

    // eslint-disable-next-line class-methods-use-this
    public createGetMetadataRoute(entityId: string, callbackUrl: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const file = await createMetadataFile(entityId, callbackUrl);

                res.sendFile(path.resolve(__dirname, '../../..', file));
            } catch (error) {
                console.error(error);
            }
        };
    }
}

const passportClient = new PassportClient();
export { passportClient };
