const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql2
   .createPool({
      //   connectionLimit: 5,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DATABASE,
      password: process.env.MYSQL_PASSWORD,
   })
   .promise();

async function createTable(databaseName, tableName, columns) {
   const createTableSQL = `
      CREATE TABLE IF NOT EXISTS ${databaseName}.${tableName} (
         ${columns.join(", ")}
      )
   `;

   await pool.query(createTableSQL);
   console.log(
      `Table ${tableName} created successfully in database ${databaseName}`
   );
}

// Example usage
const columnsDefinition = [
   "id INT AUTO_INCREMENT PRIMARY KEY",
   "email VARCHAR(255) UNIQUE",
   "firstname VARCHAR(255)",
];

createTable("alumninet", "users", columnsDefinition);

async function getUsers(databaseName) {
   const [rows] = await pool.query(`SELECT * FROM ${databaseName}.users`);
   return rows;
}

async function getUserById(databaseName, id) {
   const [rows] = await pool.query(
      `SELECT * FROM ${databaseName}.users WHERE id = ?`,
      [id]
   );

   return rows[0];
}

async function saveUser(databaseName, email, firstname) {
   const result = await pool.query(
      `
    INSERT INTO ${databaseName}.users (email, firstname)
    VALUES (?, ?)
    `,
      [email, firstname]
   );

   const id = result.insertId;
   return getUserById(databaseName, id);
}

// Update user by ID
async function updateUser(databaseName, id, updatedEmail, updatedFirstName) {
   const result = await pool.query(
      `
    UPDATE ${databaseName}.users
    SET email = ?, firstname = ?
    WHERE id = ?
    `,
      [updatedEmail, updatedFirstName, id]
   );

   return getUserById(databaseName, id);
}

// Delete user by ID
async function deleteUser(databaseName, userId) {
   await pool.query(
      `
    DELETE FROM ${databaseName}.users
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
