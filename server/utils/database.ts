/**
 * Generic SQLite database factory
 * Creates and manages separate database instances
 */
import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { mkdirSync } from 'fs';

const databases = new Map<string, Database.Database>();

/**
 * Get or create a SQLite database instance by name.
 * Each database is stored in .data/{name}.db
 */
export function createDatabase(name: string, initFn?: (db: Database.Database) => void): Database.Database {
    if (databases.has(name)) {
        return databases.get(name)!;
    }

    const dbPath = join(process.cwd(), '.data', `${name}.db`);

    // Ensure the directory exists
    mkdirSync(dirname(dbPath), { recursive: true });

    const db = new Database(dbPath);
    db.pragma('journal_mode = WAL');

    if (initFn) {
        initFn(db);
    }

    databases.set(name, db);
    return db;
}

/**
 * Close a specific database connection
 */
export function closeDatabase(name: string): void {
    const db = databases.get(name);
    if (db) {
        db.close();
        databases.delete(name);
    }
}

/**
 * Close all database connections (useful for graceful shutdown)
 */
export function closeAllDatabases(): void {
    for (const [name, db] of databases) {
        db.close();
        databases.delete(name);
    }
}
