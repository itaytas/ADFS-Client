import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { Strategy as SamlStrategy, VerifiedCallback, Profile } from 'passport-saml';
import path from 'path';
import { Configuration, IProfileExtractor } from '../configuration';
import { LooseObject } from '../interface/LooseObject';

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
}

const passportClient = new PassportClient();
export { passportClient };
