import ApiResponse from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken';
import { config } from "../config/index.js";


class AuthenticateToken {
  verify(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return ApiResponse.unauthorized({
        res,
        message: "Access token required"
      })
    }

    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      req.user = decoded;
      next();

    } catch (error) {
      // ✅ Token expirado
      if (error.name === 'TokenExpiredError') {
        return ApiResponse.unauthorized({
          res,
          message: "Token expired"
        });
      }

      return ApiResponse.unauthorized({
        res,
        message: "Invalid token"
      })
    }
  }
}

export default AuthenticateToken;