const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// MySQL Connection
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const modelsPath = path.join(__dirname, 'models');

async function updateSchema() {
    const connection = await mysql.createConnection(dbConfig);

    try {
        console.log("Connected to MySQL. Checking schema changes...");

        const files = fs.readdirSync(modelsPath).filter(file => file.endsWith('.js'));

        for (const file of files) {
            const model = require(path.join(modelsPath, file));

            if (!model.tableName || !model.schema) {
                console.log(`Skipping ${file}, no schema found.`);
                continue;
            }

            const [existingTables] = await connection.execute("SHOW TABLES LIKE ?", [model.tableName]);

            if (existingTables.length === 0) {
                // Create table if it doesn't exist
                const createQuery = `CREATE TABLE ${model.tableName} (${Object.entries(model.schema)
                    .map(([key, type]) => `${key} ${type}`)
                    .join(', ')})`;
                console.log(`Creating table: ${model.tableName}`);
                await connection.execute(createQuery);
            } else {
                // Check for missing columns
                const [columns] = await connection.execute(`SHOW COLUMNS FROM ${model.tableName}`);
                const existingColumns = columns.map(col => col.Field);

                for (const [column, type] of Object.entries(model.schema)) {
                    if (!existingColumns.includes(column)) {
                        const alterQuery = `ALTER TABLE ${model.tableName} ADD COLUMN ${column} ${type}`;
                        console.log(`Adding column: ${column} to table ${model.tableName}`);
                        await connection.execute(alterQuery);
                    }
                }
            }
        }

        console.log("Schema update completed.");
    } catch (error) {
        console.error("Error updating schema:", error);
    } finally {
        await connection.end();
    }
}

updateSchema();
