'use strict';
const fs   = require('fs');
const path = require('path');

async function validateCredentials(sessionFolder) {
    // A session is bootable if it has creds.json with registered:true
    const SESSIONS_DIR = path.join(__dirname, '../../data/sessions');
    const credsPath = path.join(SESSIONS_DIR, sessionFolder, 'creds.json');
    try {
        if (!fs.existsSync(credsPath)) return { valid: false, registered: false };
        const raw = fs.readFileSync(credsPath, 'utf8');
        const creds = JSON.parse(raw);
        return { valid: true, registered: !!creds?.registered };
    } catch {
        return { valid: false, registered: false };
    }
}

async function sweepGhostSessions() {}
async function runFullAudit() {}

module.exports = { validateCredentials, sweepGhostSessions, runFullAudit };
