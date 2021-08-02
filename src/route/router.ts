import express from 'express';
import { testRouter } from './testRoutes';

const router = express.Router();

// Users routes
router.use('/user', testRouter);

export { router };
