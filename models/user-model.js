module.exports = {
    tableName: "users",
    schema: {
        id: "INT AUTO_INCREMENT PRIMARY KEY",
        name: "VARCHAR(255) NOT NULL",
        email: "VARCHAR(255) UNIQUE NOT NULL",
        created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
    }
};
