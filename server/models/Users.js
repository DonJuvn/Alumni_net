const mysql = require('mysql2/promise');

async function createUsersTable() {
  const connection = await mysql.createConnection({
    host: 'root',
    user: 'myusername',
    password: 'mypassword',
    database: 'alumni-net',
  });

  try {
    // Create Users table
    await connection.execute(`
      CREATE TABLE Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        refreshToken VARCHAR(255),
        role ENUM('admin', 'alumni', 'non-related') NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Add constraint for password length
    await connection.execute(`
      ALTER TABLE Users ADD CONSTRAINT check_password_length CHECK (LENGTH(password) >= 6)
    `);

    console.log('Users table created successfully.');
  } catch (error) {
    console.error('Error creating Users table:', error.message);
  } finally {
    // Close the connection
    await connection.end();
  }
}

// Execute the function
createUsersTable();
