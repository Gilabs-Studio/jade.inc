import { createApp } from './app.js';
import { env } from './config/env.js';
import { errorMiddleware, notFoundMiddleware } from './shared/middleware/error.middleware.js';

/**
 * Start the server
 */
async function startServer() {
  try {
    const app = createApp();

    // Add error handling middleware (must be last)
    app.use(notFoundMiddleware);
    app.use(errorMiddleware);

    const port = parseInt(env.PORT, 10) || 3001;

    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
      console.log(`📝 Environment: ${env.NODE_ENV}`);
      console.log(`🔗 API prefix: ${env.API_PREFIX || '/api/v1'}`);
      console.log(`🏥 Health check: http://localhost:${port}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
