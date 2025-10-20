class UserService {
  // Métodos para manejar usuarios (crear, leer, actualizar, eliminar)
  constructor(userModel) {
    this.userModel = userModel;
  }
  async getAllUsers({ page, limit }) {
    return await this.userModel.findAll({ page, limit });
  }
}

export default UserService;