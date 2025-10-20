class UserModel {
  constructor(database) {
    this.database = database;
  }

  async findAll({ page = 1, limit = 10 } = {}) {
    try {
      const connection = await this.database.getConnection();
      const offset = (page - 1) * limit;

      const [rows] = await connection.execute(
        `SELECT
          id,
          username,
          full_name,
          email,
          created_at
        FROM users
        ORDER BY created_at
        LIMIT ?
        OFFSET ?`,
        [limit, offset]
      );

      const [[{ total }]] = await connection.execute(
        `SELECT
          count(*) AS total
        FROM users`
      );

      return {
        users: rows,
        total,
        currentPage: page,
        limit,
      };
    } catch (error) {
      console.error("Error fetching users from DB:", error);
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      const connection = await this.database.getConnection();
      const [row] = await connection.query(`
        SELECT
          1 AS "existUser",
          id,
          email,
          password
        FROM users
        WHERE email = ?
      `, [email])

      return row
    } catch (error) {
      console.error("Error fetching users from DB:", error);
      throw error;
    }
  }
}

export default UserModel;
