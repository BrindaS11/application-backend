module.exports = {
    tableName: "department",
    schema: {
        id: "INT AUTO_INCREMENT PRIMARY KEY",
        dept_name: "VARCHAR(255)",
        manager: "VARCHAR(255)",
        created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
    }
};
