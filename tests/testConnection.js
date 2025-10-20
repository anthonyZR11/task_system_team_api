
const { default: database } = await import("../src/config/database.js");

async function test() {
  const db = database

  try {
    console.log('🔌 Probando conexión con mysql2/promise...');
    
    // 1. Probar sin conexión
    const con = await db.getConnection();
    try {
      const [result2] = await con.execute('SELECT 2 + 2 AS solution');
      console.log('✅ Con conexión:', result2[0].solution);
    } finally {
      con.release(); // ✅ IMPORTANTE liberar la conexión
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await db.close();
  }
}

test();