'use strict';
// config.js — Central config (ported from verbose-fishstick reference)
require('dotenv').config();

function normalizeOwnerJid(input) {
    const raw = String(input || '').trim();
    if (!raw) return '';
    const digits = raw.replace(/[^0-9]/g, '');
    if (!digits) return '';
    return `${digits}@s.whatsapp.net`;
}

function buildOwnerWaJids() {
    return String(process.env.OWNER_WA_JID || '')
        .split(',')
        .map((j) => normalizeOwnerJid(j))
        .filter(Boolean);
}

const config = {
    tgBotToken: (process.env.TG_BOT_TOKEN || '').trim(),
    ownerTelegramId: (process.env.OWNER_TG_ID || '').trim(),
    ownerWhatsAppJids: buildOwnerWaJids(),
    globalPrefix: '.',

    system: {
        taskTimeoutMs: 60000,
        maxQueueConcurrency: 50,
        watchdogTimeoutMs: 120000,
    },

    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: undefined,
    },

    ai: {
        openRouterKey: process.env.OPENROUTER_API_KEY || undefined,
    },
};

module.exports = Object.freeze(config);
