```typescript
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(`Error occurred: ${err.message}`);
  
  // Customize the response based on the error type
  let status = 500;
  let message = 'Internal Server Error';

  if (err.name === 'ValidationError') {
    status = 400;
    message = err.message;
  } else if (err.name === 'UnauthorizedError') {
    status = 401;
    message = 'Unauthorized';
  }

  res.status(status).json({
    error: {
      type: err.name,
      message: message,
      details: err.message
    }
  });
};
```