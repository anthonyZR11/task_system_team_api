import express from 'express'
import { config } from "./config/index.js";
import database from "./config/database.js";

import UserModel from "./models/UserModel.js";
import UserService from './services/UserService.js';
import UserController from './controllers/UserController.js';
import UserRoutes from './routes/userRoutes.js';

import AuthService from './services/AuthService.js';
import AuthController from './controllers/AuthController.js';
import AuthRoutes from './routes/authRoutes.js';
import AuthenticateToken from './middlewares/AuthenticateToken.js';

const authenticateToken = new AuthenticateToken();

const userModel = new UserModel(database);
const userService = new UserService(userModel);
const userController = new UserController(userService);
const userRoute = new UserRoutes(userController, authenticateToken);

const authService = new AuthService(userModel);
const authController = new AuthController(authService);
const authRoute = new AuthRoutes(authController);

const app = express();
const PORT = config.app.port || 3000;

app.use(express.json());
app.use('/api', userRoute.getRouter());
app.use('/api', authRoute.getRouter());

app.listen(PORT, () => {
  console.log(`🚀 Server corriendo en http://localhost:${PORT}`);
});