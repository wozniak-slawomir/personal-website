import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { mkdirSync } from 'fs';

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

    // Ensure the directory exists
    mkdirSync(dirname(dbPath), { recursive: true });

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

        -- Survey responses table (Big Five personality survey)
        CREATE TABLE IF NOT EXISTS survey_responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            ip_address TEXT NOT NULL,
            
            -- Screening & employment
            experience_years REAL NOT NULL,
            employment_type TEXT NOT NULL,
            salary_net INTEGER NOT NULL,
            
            -- 20 TIPI questions (1-5 scale)
            e_plus_1 INTEGER NOT NULL,
            u_minus_1 INTEGER NOT NULL,
            s_minus_1 INTEGER NOT NULL,
            se_plus_1 INTEGER NOT NULL,
            i_plus_1 INTEGER NOT NULL,
            e_minus_2 INTEGER NOT NULL,
            u_plus_2 INTEGER NOT NULL,
            s_plus_2 INTEGER NOT NULL,
            se_minus_2 INTEGER NOT NULL,
            i_minus_2 INTEGER NOT NULL,
            e_plus_3 INTEGER NOT NULL,
            u_minus_3 INTEGER NOT NULL,
            s_minus_3 INTEGER NOT NULL,
            se_plus_3 INTEGER NOT NULL,
            i_plus_3 INTEGER NOT NULL,
            e_minus_4 INTEGER NOT NULL,
            u_plus_4 INTEGER NOT NULL,
            s_plus_4 INTEGER NOT NULL,
            se_minus_4 INTEGER NOT NULL,
            i_minus_4 INTEGER NOT NULL,
            
            -- Calculated Big Five scores (1-5 scale)
            extraversion REAL,
            agreeableness REAL,
            conscientiousness REAL,
            emotional_stability REAL,
            intellect REAL,
            
            -- Prediction
            predicted_salary REAL,
            is_b2b INTEGER DEFAULT 0
        );

        -- Outliers table (same structure)
        CREATE TABLE IF NOT EXISTS survey_outliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            ip_address TEXT NOT NULL,
            experience_years REAL NOT NULL,
            employment_type TEXT NOT NULL,
            salary_net INTEGER NOT NULL,
            e_plus_1 INTEGER NOT NULL,
            u_minus_1 INTEGER NOT NULL,
            s_minus_1 INTEGER NOT NULL,
            se_plus_1 INTEGER NOT NULL,
            i_plus_1 INTEGER NOT NULL,
            e_minus_2 INTEGER NOT NULL,
            u_plus_2 INTEGER NOT NULL,
            s_plus_2 INTEGER NOT NULL,
            se_minus_2 INTEGER NOT NULL,
            i_minus_2 INTEGER NOT NULL,
            e_plus_3 INTEGER NOT NULL,
            u_minus_3 INTEGER NOT NULL,
            s_minus_3 INTEGER NOT NULL,
            se_plus_3 INTEGER NOT NULL,
            i_plus_3 INTEGER NOT NULL,
            e_minus_4 INTEGER NOT NULL,
            u_plus_4 INTEGER NOT NULL,
            s_plus_4 INTEGER NOT NULL,
            se_minus_4 INTEGER NOT NULL,
            i_minus_4 INTEGER NOT NULL,
            extraversion REAL,
            agreeableness REAL,
            conscientiousness REAL,
            emotional_stability REAL,
            intellect REAL,
            predicted_salary REAL,
            is_b2b INTEGER DEFAULT 0,
            outlier_reason TEXT
        );

        -- IP restriction index (unique constraint)
        CREATE UNIQUE INDEX IF NOT EXISTS idx_survey_ip ON survey_responses(ip_address);
        CREATE INDEX IF NOT EXISTS idx_survey_created ON survey_responses(created_at);
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
