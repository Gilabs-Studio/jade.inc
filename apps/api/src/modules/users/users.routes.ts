import { Router } from 'express';
import { UsersController } from './users.controller.js';
import { validate } from '../../shared/middleware/validation.middleware.js';
import { authMiddleware, requireAdmin } from '../../shared/middleware/auth.middleware.js';
import {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  listUsersSchema,
  deleteUserSchema,
} from './users.types.js';

const router = Router();
const usersController = new UsersController();

/**
 * Users routes
 * All routes require authentication
 */
router.use(authMiddleware);

router.post('/', requireAdmin, validate(createUserSchema), usersController.createUser);
router.get('/', requireAdmin, validate(listUsersSchema), usersController.listUsers);
router.get('/:id', validate(getUserSchema), usersController.getUserById);
router.patch('/:id', requireAdmin, validate(updateUserSchema), usersController.updateUser);
router.delete('/:id', requireAdmin, validate(deleteUserSchema), usersController.deleteUser);

export default router;

