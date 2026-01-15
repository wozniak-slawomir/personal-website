/**
 * Calculator database module
 */
import type Database from 'better-sqlite3';
import { createDatabase } from './database';

let db: Database.Database | null = null;

function initializeCalculatorDatabase(database: Database.Database): void {
    database.exec(`
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

        CREATE INDEX IF NOT EXISTS idx_responses_created_at ON calculator_responses(created_at);
        CREATE INDEX IF NOT EXISTS idx_responses_segment ON calculator_responses(segment);
    `);
}

export function getCalculatorDatabase(): Database.Database {
    if (!db) {
        db = createDatabase('calculator', initializeCalculatorDatabase);
    }
    return db;
}
