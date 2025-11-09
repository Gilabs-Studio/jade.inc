import { Router } from 'express';
import multer from 'multer';
import { UploadController } from './upload.controller.js';
import { authMiddleware, requireRole } from '../../shared/middleware/auth.middleware.js';

const router = Router();
const uploadController = new UploadController();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

/**
 * Upload routes
 */
router.use(authMiddleware);
router.post(
  '/image',
  requireRole('admin', 'editor', 'author'),
  upload.single('image'),
  uploadController.uploadImage
);

export default router;

