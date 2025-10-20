import { body, validationResult } from "express-validator";
import ApiResponse from "../utils/ApiResponse.js";


class AuthController {
  constructor(authService) {
    this.authService = authService
  }
  async loginUser(req, res) {
    try {
      const { email, password } = req.body

      await body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email format is invalid")
        .run(req)

      await body("password")
        .trim()
        .notEmpty().withMessage("password is required")
        .isString().withMessage("Must be a string")
        .isLength({ min: 8, max: 20 })
        .withMessage("Must be between 8 and 20 characters")
        .run(req)

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorDetails = errors.array().map((error) => ({
          field: error.path,
          message: error.msg,
          value: error.value,
        }));
        return ApiResponse.badRequest({ res, details: errorDetails });
      }

      const result = await this.authService.loginUser({ email, password });

      switch (result.success) {
        case false:
          return ApiResponse.badRequest({
            res,
            code: result.code,
            message: result.message
          });

        default: {
          return ApiResponse.authSuccess({
            res,
            user: result.user,
            token: result.token,
            expiresIn: result.expiresIn
          });
        }
      }


    } catch (error) {
      console.log("Error in AuthController:", error.message);
      res.status(500).json({ error: "Error login" });
    }
  }

  async registerUser() {

  }
}

export default AuthController;