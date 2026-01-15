/**
 * Survey database module
 */
import type Database from 'better-sqlite3';
import { createDatabase } from './database';

let db: Database.Database | null = null;

function initializeSurveyDatabase(database: Database.Database): void {
    database.exec(`
        CREATE TABLE IF NOT EXISTS survey_responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            ip_address TEXT NOT NULL,
            
            -- Employment data
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
            i_minus_4 INTEGER NOT NULL
        );

        CREATE UNIQUE INDEX IF NOT EXISTS idx_survey_ip ON survey_responses(ip_address);
        CREATE INDEX IF NOT EXISTS idx_survey_created ON survey_responses(created_at);
    `);
}

export function getSurveyDatabase(): Database.Database {
    if (!db) {
        db = createDatabase('survey', initializeSurveyDatabase);
    }
    return db;
}
