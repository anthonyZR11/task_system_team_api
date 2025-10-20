import mysql from 'mysql2/promise';
import { config } from './index.js';

class Database {
  constructor() {
    this.pool = null;
    this.init();
  }

  init() {
    this.pool = mysql.createPool({
      ...config.database,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    });
  }

  async getConnection() {
    try {
      return await this.pool.getConnection();
    } catch (error) {
      throw new Error(`Database: Error obteniendo conexión - ${error.message}`);
    }
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }
}

export default new Database();
