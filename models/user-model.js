module.exports = {
    tableName: "users",
    schema: {
        id: "INT AUTO_INCREMENT PRIMARY KEY",
        name: "VARCHAR(255) NOT NULL",
        email: "VARCHAR(255) UNIQUE NOT NULL",
        mobile: "VARCHAR(255) UNIQUE NOT NULL",
        gender: "VARCHAR(255)",
        created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
    }
};
