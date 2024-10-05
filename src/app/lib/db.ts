import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

export async function insert(table: string, data: Record<string, any>) {
    const keys = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map(() => '?').join(', ');
  
    const query = `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`;
    const [result] = await pool.execute(query, values);
    return result;
}
  
export async function update(table: string, data: Record<string, any>, condition: string) {
    const keys = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);

    const query = `UPDATE ${table} SET ${keys} WHERE ${condition}`;
    const [result] = await pool.execute(query, values);
    return result;
}

export async function query(sql: string, values?: any[]) {
    const [rows] = await pool.execute(sql, values);
    return rows;
}

export async function remove(table: string, condition: string) {
    const query = `DELETE FROM ${table} WHERE ${condition}`;
    const [result] = await pool.execute(query);
    return result;
}

export default pool;
