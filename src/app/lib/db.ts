import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'artacode',
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

export async function remove(table: string, condition: string) {
    const query = `DELETE FROM ${table} WHERE ${condition}`;
    const [result] = await pool.execute(query);
    return result;
}

export default pool;
