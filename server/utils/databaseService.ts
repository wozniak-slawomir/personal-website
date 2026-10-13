/**
 * Persists contact-form submissions, including ones that were delivered.
 */
import type Database from 'better-sqlite3';
import { createDatabase } from './database';

export interface ContactEmailRecord {
    name: string;
    surname: string;
    email: string;
    phone_number?: string | null;
    message: string;
    status: 'success' | 'error';
    error?: string | null;
}

function initializeContactDatabase(database: Database.Database): void {
    database.exec(`
        CREATE TABLE IF NOT EXISTS contact_emails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            name TEXT NOT NULL,
            surname TEXT NOT NULL,
            email TEXT NOT NULL,
            phone_number TEXT,
            message TEXT NOT NULL,
            status TEXT NOT NULL,
            error TEXT
        );

        CREATE INDEX IF NOT EXISTS idx_contact_emails_created ON contact_emails(created_at);
    `);

    const legacyTable = database.prepare(`
        SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'failed_contact_emails'
    `).get();

    if (!legacyTable) {
        return;
    }

    database.exec(`
        INSERT INTO contact_emails (
            created_at,
            name,
            surname,
            email,
            phone_number,
            message,
            status,
            error
        )
        SELECT
            created_at,
            name,
            surname,
            email,
            phone_number,
            message,
            'error',
            error
        FROM failed_contact_emails;

        DROP TABLE failed_contact_emails;
    `);
}

export class DatabaseService {
    private static db: Database.Database | null = null;

    private static getDatabase(): Database.Database {
        if (!this.db) {
            this.db = createDatabase('contact', initializeContactDatabase);
        }
        return this.db;
    }

    static saveContactEmail(entry: ContactEmailRecord): void {
        const database = this.getDatabase();
        database.prepare(`
            INSERT INTO contact_emails (
                name,
                surname,
                email,
                phone_number,
                message,
                status,
                error
            ) VALUES (
                @name,
                @surname,
                @email,
                @phone_number,
                @message,
                @status,
                @error
            )
        `).run({
            name: entry.name,
            surname: entry.surname,
            email: entry.email,
            phone_number: entry.phone_number || null,
            message: entry.message,
            status: entry.status,
            error: entry.error || null,
        });
    }
}
