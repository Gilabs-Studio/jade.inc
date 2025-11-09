import type { Request, Response } from 'express';
import { supabaseAdmin } from '../../config/supabase.js';
import { ResponseUtil } from '../../shared/utils/response.util.js';
import { asyncHandler } from '../../shared/utils/validation.util.js';
import type { AuthenticatedRequest } from '../../shared/types/common.types.js';
import { randomUUID } from 'crypto';

/**
 * Upload controller - handles file uploads to Supabase Storage
 */
export class UploadController {
  /**
   * Upload image to Supabase Storage
   */
  uploadImage = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return ResponseUtil.unauthorized(res);
    }

    // Check if file exists
    if (!req.file) {
      return ResponseUtil.badRequest(res, 'No file uploaded', 'NO_FILE');
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return ResponseUtil.badRequest(res, 'Invalid file type. Only images are allowed.', 'INVALID_FILE_TYPE');
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (req.file.size > maxSize) {
      return ResponseUtil.badRequest(res, 'File size exceeds 5MB limit', 'FILE_TOO_LARGE');
    }

    try {
      // Generate unique filename
      const fileExt = req.file.originalname.split('.').pop();
      const fileName = `${randomUUID()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabaseAdmin.storage
        .from('blog-images')
        .upload(filePath, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false,
        });

      if (error) {
        console.error('Supabase upload error:', error);
        // Check if bucket exists, if not create it
        if (error.message?.includes('Bucket not found') || error.message?.includes('bucket')) {
          // Try to create bucket (this might fail if user doesn't have permission)
          const { error: createError } = await supabaseAdmin.storage.createBucket('blog-images', {
            public: true,
            fileSizeLimit: 5242880, // 5MB
          });
          if (createError) {
            console.error('Failed to create bucket:', createError);
            return ResponseUtil.error(res, 'Storage bucket not configured. Please create "blog-images" bucket in Supabase Storage.', 500, 'BUCKET_NOT_FOUND');
          }
          // Retry upload after creating bucket
          const { data: retryData, error: retryError } = await supabaseAdmin.storage
            .from('blog-images')
            .upload(filePath, req.file.buffer, {
              contentType: req.file.mimetype,
              upsert: false,
            });
          if (retryError) {
            console.error('Retry upload error:', retryError);
            return ResponseUtil.error(res, 'Failed to upload image', 500, 'UPLOAD_ERROR');
          }
          // Get public URL
          const { data: urlData } = supabaseAdmin.storage
            .from('blog-images')
            .getPublicUrl(filePath);
          if (!urlData?.publicUrl) {
            return ResponseUtil.error(res, 'Failed to get image URL', 500, 'URL_ERROR');
          }
          return ResponseUtil.success(res, {
            url: urlData.publicUrl,
            path: filePath,
            fileName: fileName,
          }, 'Image uploaded successfully');
        }
        return ResponseUtil.error(res, 'Failed to upload image', 500, 'UPLOAD_ERROR');
      }

      // Get public URL
      const { data: urlData } = supabaseAdmin.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        return ResponseUtil.error(res, 'Failed to get image URL', 500, 'URL_ERROR');
      }

      return ResponseUtil.success(res, {
        url: urlData.publicUrl,
        path: filePath,
        fileName: fileName,
      }, 'Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      return ResponseUtil.error(res, 'Failed to upload image', 500, 'UPLOAD_ERROR');
    }
  });
}

