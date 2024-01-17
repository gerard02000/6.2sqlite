import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db = null;

if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
        filename: "./src/database/db.sqlite", // Correct path to the SQLite database file
        driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
}

export default db;