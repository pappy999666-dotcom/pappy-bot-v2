'use strict';
// utils/validator.js — Common validation helpers

/**
 * safeJsonParse(str, fallback?)
 * Parses JSON without throwing. Returns fallback (null) on error.
 */
function safeJsonParse(str, fallback = null) {
    try {
        return JSON.parse(str);
    } catch {
        return fallback;
    }
}

/**
 * isValidJid(jid)
 * Checks if a string looks like a WhatsApp JID.
 */
function isValidJid(jid) {
    return typeof jid === 'string' && (jid.endsWith('@s.whatsapp.net') || jid.endsWith('@g.us') || jid.endsWith('@newsletter'));
}

/**
 * isValidPhone(phone)
 * Checks if a string is a valid phone number (digits only, 7-15 chars).
 */
function isValidPhone(phone) {
    return /^\d{7,15}$/.test(String(phone || '').replace(/[^0-9]/g, ''));
}

/**
 * clamp(n, min, max)
 */
function clamp(n, min, max) {
    return Math.min(Math.max(Number(n), min), max);
}

module.exports = { safeJsonParse, isValidJid, isValidPhone, clamp };
