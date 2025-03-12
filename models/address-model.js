module.exports = {
    tableName: "address",
    schema: {
        id: "INT AUTO_INCREMENT PRIMARY KEY",
        city:"VARCHAR(255)",
        zipcode:"VARCHAR(255)",
        created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
    }
};
