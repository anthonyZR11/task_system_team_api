import express from 'express';

class AuthRoutes {
  constructor(authController) {
    this.authController = authController;
    this.router = express.Router();
    this.initRouters();
  }

  initRouters() {
    this.router.post('/login', (req, res) => this.authController.loginUser(req, res));
  }

  getRouter() {
    return this.router;
  }
}

export default AuthRoutes;