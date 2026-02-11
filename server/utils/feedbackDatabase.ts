import type Database from 'better-sqlite3';
import { createDatabase } from './database';

let db: Database.Database | null = null;

function initializeFeedbackDatabase(database: Database.Database): void {
    database.exec(`
        CREATE TABLE IF NOT EXISTS feedback_responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            
            email TEXT,
            
            discovery_source TEXT NOT NULL,
            website_ease TEXT NOT NULL,
            website_ease_comment TEXT,
            technical_issues INTEGER NOT NULL,
            technical_issues_details TEXT,
            
            offer_clarity TEXT NOT NULL,
            missing_offer_info TEXT,
            
            is_client INTEGER NOT NULL,
            
            contact_form_satisfaction TEXT,
            communication_style TEXT,
            response_speed TEXT,
            response_speed_comment TEXT,
            work_delivery_time TEXT,
            work_delivery_time_comment TEXT,
            work_delivery_delayed_cause TEXT,
            
            unpopular_tasks TEXT,
            time_consuming_processes TEXT,
            
            one_tech_change TEXT NOT NULL,
            tech_readiness TEXT NOT NULL,
            
            would_recommend TEXT,
            missing_product TEXT
        );

        CREATE INDEX IF NOT EXISTS idx_feedback_created ON feedback_responses(created_at);
        CREATE INDEX IF NOT EXISTS idx_feedback_email ON feedback_responses(email);
    `);
}

export function getFeedbackDatabase(): Database.Database {
    if (!db) {
        db = createDatabase('feedback', initializeFeedbackDatabase);
    }
    return db;
}
