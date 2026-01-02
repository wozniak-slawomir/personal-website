import Database from 'better-sqlite3';
import { join } from 'path';

let db: Database.Database | null = null;

/**
 * Get or create the SQLite database instance.
 * Database is stored in .data/calculator.db
 */
export function getDatabase(): Database.Database {
    if (db) {
        return db;
    }

    const dbPath = join(process.cwd(), '.data', 'calculator.db');

    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');

    initializeDatabase(db);

    return db;
}


function initializeDatabase(database: Database.Database): void {
    database.exec(`
        -- Main responses table
        CREATE TABLE IF NOT EXISTS calculator_responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            
            -- User segment selection
            segment TEXT,
            
            -- People counts per category (JSON)
            people_counts TEXT,
            
            -- Calculated results
            total_yearly_cost REAL,
            zombie_yearly_cost REAL,
            well_spent_yearly_cost REAL,
            
            -- Raw selections data (JSON array)
            selections TEXT
        );

        -- Index for analytics queries
        CREATE INDEX IF NOT EXISTS idx_responses_created_at ON calculator_responses(created_at);
        CREATE INDEX IF NOT EXISTS idx_responses_segment ON calculator_responses(segment);
    `);
}

/**
 * Close the database connection (useful for graceful shutdown)
 */
export function closeDatabase(): void {
    if (db) {
        db.close();
        db = null;
    }
}
