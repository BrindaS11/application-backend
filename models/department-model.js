module.exports = {
    tableName: "department",
    schema: {
        id: "INT AUTO_INCREMENT PRIMARY KEY",
        dept_name: "VARCHAR(255) NOT NULL",
        manager: "VARCHAR(255) UNIQUE NOT NULL",
        created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
    }
};
