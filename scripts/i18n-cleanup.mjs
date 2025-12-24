#!/usr/bin/env node

/**
 * i18n Unused Keys Cleanup Script
 * 
 * This script scans all translation keys in locale files and checks if they're
 * used anywhere in the codebase. It generates a report of unused keys and can
 * optionally remove them.
 * 
 * Usage:
 *   npm run i18n:cleanup         # Dry run - shows unused keys
 *   npm run i18n:cleanup -- --fix # Actually removes unused keys
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');
const LOCALES_DIR = join(ROOT_DIR, 'i18n', 'locales');

// Directories to search for key usage
const SEARCH_DIRS = [
    'pages',
    'components',
    'composables',
    'const',
    'server',
    'layouts'
].map(d => join(ROOT_DIR, d));

// Files to search
const SEARCH_FILES = [
    join(ROOT_DIR, 'app.vue'),
    join(ROOT_DIR, 'error.vue')
];

// Keys that use dynamic patterns (don't flag these as unused)
const DYNAMIC_KEY_PATTERNS = [
    /^pricing\.packages\.\w+\.feature\d+$/,
    /^calculator\.tools\.\w+\./,
    /^calculator\.categories\./,
    /^calculator\.context\./
];

function getAllKeys(localeDir) {
    const keys = new Set();
    const files = readdirSync(localeDir).filter(f => f.endsWith('.json'));

    for (const file of files) {
        const content = JSON.parse(readFileSync(join(localeDir, file), 'utf-8'));
        extractKeys(content, '', keys);
    }

    return keys;
}

function extractKeys(obj, prefix, keys) {
    for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
            extractKeys(value, fullKey, keys);
        } else {
            keys.add(fullKey);
        }
    }
}

function isKeyUsed(key) {
    // Check if key matches dynamic patterns
    for (const pattern of DYNAMIC_KEY_PATTERNS) {
        if (pattern.test(key)) {
            return true;
        }
    }

    // Search in directories
    for (const dir of SEARCH_DIRS) {
        try {
            execSync(`grep -rqF "${key}" "${dir}" 2>/dev/null`, { stdio: 'pipe' });
            return true;
        } catch {
            // Key not found in this directory
        }
    }

    // Search in individual files
    for (const file of SEARCH_FILES) {
        try {
            execSync(`grep -qF "${key}" "${file}" 2>/dev/null`, { stdio: 'pipe' });
            return true;
        } catch {
            // Key not found in this file
        }
    }

    return false;
}

function removeKeyFromFile(filePath, keyToRemove) {
    const content = JSON.parse(readFileSync(filePath, 'utf-8'));

    // Handle flat keys (e.g., "seo.title")
    if (keyToRemove in content) {
        delete content[keyToRemove];
        writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
        return true;
    }

    // Handle nested keys
    const parts = keyToRemove.split('.');
    let current = content;
    for (let i = 0; i < parts.length - 1; i++) {
        if (current[parts[i]] === undefined) return false;
        current = current[parts[i]];
    }

    if (parts[parts.length - 1] in current) {
        delete current[parts[parts.length - 1]];
        writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
        return true;
    }

    return false;
}

function main() {
    const fixMode = process.argv.includes('--fix');

    console.log('🔍 Scanning for unused i18n keys...\n');

    // Get all keys from English locale (assuming it's the source of truth)
    const enDir = join(LOCALES_DIR, 'en');
    const allKeys = getAllKeys(enDir);

    console.log(`📊 Found ${allKeys.size} total translation keys\n`);

    const unusedKeys = [];

    for (const key of allKeys) {
        if (!isKeyUsed(key)) {
            unusedKeys.push(key);
        }
    }

    if (unusedKeys.length === 0) {
        console.log('✅ No unused keys found!');
        return;
    }

    console.log(`⚠️  Found ${unusedKeys.length} unused keys:\n`);
    unusedKeys.forEach(key => console.log(`   - ${key}`));

    if (!fixMode) {
        console.log('\n💡 Run with --fix to remove these keys:');
        console.log('   npm run i18n:cleanup -- --fix\n');
        return;
    }

    console.log('\n🧹 Removing unused keys...\n');

    // Remove from both en and pl locales
    const locales = ['en', 'pl'];

    for (const locale of locales) {
        const localeDir = join(LOCALES_DIR, locale);
        const files = readdirSync(localeDir).filter(f => f.endsWith('.json'));

        for (const file of files) {
            const filePath = join(localeDir, file);
            for (const key of unusedKeys) {
                removeKeyFromFile(filePath, key);
            }
        }
    }

    console.log(`✅ Removed ${unusedKeys.length} unused keys from all locale files.`);
}

main();
