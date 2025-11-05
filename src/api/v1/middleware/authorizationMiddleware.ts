import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appErrors";

export interface AuthRequest extends Request {
  user?: any;
}

interface AuthorizationOptions {
  roles?: string[];        // allowed roles
  allowSameUser?: boolean; // e.g. user can access their own data
}

/**
 * Authorization middleware — checks user roles and access permissions.
 */
export const authorize =
  (options: AuthorizationOptions = {}) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        return next(new AppError("User not authenticated", 401));
      }

      // Check if user has required role
      if (options.roles && !options.roles.includes(user.role)) {
        // Allow same user access if enabled
        if (options.allowSameUser && req.params.id === user.uid) {
          return next();
        }
        return next(new AppError("Access denied: insufficient permissions", 403));
      }

      next();
    } catch {
      next(new AppError("Authorization failed", 403));
    }
  };
