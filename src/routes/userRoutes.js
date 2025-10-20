import express from 'express';

class UserRoutes {
  constructor(userController, authenticateToken) {
    this.userController = userController;
    this.authenticateToken = authenticateToken;
    this.router = express.Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get('/users',
      this.authenticateToken.verify,
      this.userController.getAllUsers.bind(this.userController));
  }

  getRouter() {
    return this.router;
  }
}

export default UserRoutes;
