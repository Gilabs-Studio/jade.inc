import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { validate } from '../../shared/middleware/validation.middleware.js';
import {
  loginSchema,
  registerSchema,
  refreshTokenSchema,
} from './auth.types.js';

const router = Router();
const authController = new AuthController();

/**
 * Auth routes
 */
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh', validate(refreshTokenSchema), authController.refreshToken);
router.post('/logout', authController.logout);

export default router;

