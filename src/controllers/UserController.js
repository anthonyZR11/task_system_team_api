import { query, validationResult } from "express-validator";
import UserSerializer from "../serializers/userSerializer.js";
import ApiResponse from "../utils/ApiResponse.js";

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async getAllUsers(req, res) {
    try {
      const { page, limit } = req.query;

      await query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer")
        .run(req);

      await query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be an integer between 1 and 100")
        .run(req);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorDetails = errors.array().map((error) => ({
          field: error.path,
          message: error.msg,
          value: error.value,
        }));
        return ApiResponse.badRequest({ res, details: errorDetails });
      }

      const result = await this.userService.getAllUsers({ page, limit });

      const serializedUsers = UserSerializer.collection(
        result.users,
        {
          total: result.total,
          page: result.currentPage,
          limit: result.limit
        }
      )

      return ApiResponse.success({
        res,
        data: serializedUsers.users,
        "message": "get all users successfully",
        meta: serializedUsers.pagination
      });
    } catch (error) {
      console.log("Error in UserController:", error.message);
      res.status(500).json({ error: "Error retrieving users" });
    }
  }
}

export default UserController;
