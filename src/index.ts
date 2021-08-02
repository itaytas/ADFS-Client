import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import { Configuration, IConfiguration } from './configuration';
import { applyRoutesMiddleware } from './middleware/applyRoutesMiddleware';
import { applySamlMiddleware } from './middleware/applySamlMiddleware';
import { applyThirdPartyMiddleware } from './middleware/applyThirdPartyMiddleware';

function adfsClient(credentials: any, config: IConfiguration): void {
    console.log('starting');
    const app = express();
    applyThirdPartyMiddleware(app);
    applySamlMiddleware(app);
    applyRoutesMiddleware(app);
    const httpServer = http.createServer(app).listen(8080);
    const httpsServer = https.createServer(credentials, app).listen(8443);
}

function main() {
    const privateKey = fs.readFileSync('certs/<path-to-key>.key', 'utf8');
    const certificate = fs.readFileSync('certs/<path-to-certificate>.key', 'utf8');
    const credentials = { cert: certificate, key: privateKey };

    adfsClient(credentials, Configuration);
    process.on('unhandledRejection', (error: any) => {
        console.error(`Unexpected error: ${error}, stack: ${error.stack}`);
    });
}

main();
