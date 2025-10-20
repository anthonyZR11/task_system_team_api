import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'

class AuthService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async loginUser({ email, password }) {
    const user = await this.userModel.findByEmail(email)

    if (!user || user.length === 0) {
      return {
        success: false,
        code: "INVALID_CREDENTIALS",
        message: "Invalid email",
      }
    }

    const [{ password: hashedPassword }] = user
    const isValidPassword = await this.comparePassword(password, hashedPassword)

    if (!isValidPassword) {
      return {
        success: false,
        code: "INVALID_CREDENTIALS",
        message: "Invalid password",
      }
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn
      }
    );

    return {
      user: user.map(user => {
        const { password, existUser, ...cleanUser } = user;
        return cleanUser
      })[0],
      token,
      expiresIn: config.jwt.expiresIn
    }
  }

  async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default AuthService