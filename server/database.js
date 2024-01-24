const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql2
   .createPool({
      //   connectionLimit: 5,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_PASSWORD,
      password: process.env.MYSQL_DATABASE,
   })
   .promise();

async function getUsers() {
   const [rows] = await pool.query(`
   USE alumninet; 
   SELECT * FROM users`);
   return rows;
}

async function getUserById(id) {
   const [rows] = await pool.query(
      `
   USE alumninet; 
   SELECT * 
   FROM users
   WHERE id = ?
    `,
      [id]
   );

   return rows[0];
}

async function saveUser(email, firstname) {
   const result = await pool.query(
      `
   USE alumninet; 
    INSERT INTO users (email, firstname)
    VALUES (?, ?)
    `,
      [email, firstname]
   );

   const id = result.insertId;
   return getUserById(id);
}

// Update user by ID
async function updateUser(id, updatedEmail, updatedFirstName) {
   const result = await pool.query(
      `
      USE alumninet; 
        UPDATE users
        SET title = ?, content = ?
        WHERE id = ?
    `,
      [updatedEmail, updatedFirstName, id]
   );

   return getUserById(id);
}

// Delete user by ID
async function deleteUser(userId) {
   await pool.query(
      `
      USE alumninet; 
        DELETE FROM users
        WHERE id = ?
    `,
      [userId]
   );

   return { message: "User deleted successfully" };
}

module.exports = {
   getUsers,
   getUserById,
   saveUser,
   updateUser,
   deleteUser,
};
