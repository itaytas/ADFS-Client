import * as passportSaml from 'passport-saml';
import { config } from 'dotenv';

config();

interface IConfiguration {
    application: IApplicationConfiguration;
    authentication: IAuthenticationConfiguration;
    cors: ICORSConfiguration;
}

// ################### Application Configuration ###################
interface IApplicationConfiguration {
    isProduction: boolean;
    jsonBodyMaxSize: string;
    port: number;
    sessionsSecret: string;
}
// ################### Application Configuration ###################

// ################### CORS Configuration ###################
interface ICORSConfiguration {
    allowedHeaders: string[];
    credentials: boolean;
    crossDomain: boolean;
    exposedHeaders: string[];
    methods: string;
    origin: string;
}
// ################### CORS Configuration ###################

// ################### Authentication Configuration ###################
interface IProfileExtractor {
    displayName: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
}

interface IMetadata {
    entityId: string;
}

interface IAuthenticationConfiguration {
    metadata: IMetadata;
    profileExtractor: IProfileExtractor;
    saml: passportSaml.SamlConfig;
}
// ################### Authentication Configuration ###################

const Configuration: IConfiguration = {
    application: {
        isProduction: process.env.IS_PRODUCTION === 'true' || false,
        jsonBodyMaxSize: process.env.JSON_BODY_MAX_SIZE || '30mb',
        port: (process.env.BACKEND_PORT && +process.env.BACKEND_PORT) || 5000,
        sessionsSecret: process.env.SESSIONS_SECRET || 'SESSIONS_SECRET'
    },
    authentication: {
        metadata: {
            entityId: process.env.METADATA_ENTITY_ID || 'http://localhost:5000/metadata.xml'
        },
        profileExtractor: {
            displayName: process.env.PROFILE_EXTRACTOR_DISPLAY_NAME || 'email',
            email: process.env.PROFILE_EXTRACTOR_MAIL || 'email',
            firstName: process.env.PROFILE_EXTRACTOR_FIRST_NAME || 'email',
            id: process.env.PROFILE_EXTRACTOR_ID || 'uid',
            lastName: process.env.PROFILE_EXTRACTOR_LAST_NAME || 'email'
        },
        saml: {
            authnContext: ['http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/windows'],
            callbackUrl: process.env.SAML_CALLBACK_URL || 'http://localhost:5000/auth/saml/callback',
            cert: process.env.SAML_CERT || 'cert',
            entryPoint:
                process.env.SAML_ENTRY_POINT || 'http://localhost:8080/simplesaml/saml2/idp/SSOService.php',
            issuer: process.env.SAML_ISSUER || 'http://localhost:5000/metadata.xml'
        }
    },
    cors: {
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'X-Access-Token',
            'Authorization',
            'Access-Control-Allow-Origin'
        ],
        credentials: true,
        crossDomain: true,
        exposedHeaders: ['content-checksum', 'set-cookie'],
        methods: 'GET,HEAD,OPTIONS,PUT,POST,DELETE',
        origin: '*'
    }
};

export { Configuration, IApplicationConfiguration, IConfiguration, IProfileExtractor };
