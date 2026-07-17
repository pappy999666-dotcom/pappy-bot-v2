'use strict';
// lib/telegramUI.js — Modern Telegram UI helpers for Pappy Bot V2
// Provides blockquote formatting, rich HTML, inline keyboards, structured menus.

const CHANNEL_URL = 'https://whatsapp.com/channel/0029VbCSVL9HLHQgReyVeE39';

// ─── Text escaping ────────────────────────────────────────────────────────────
function escapeHtml(text) {
    return String(text ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ─── Blockquote formatter ─────────────────────────────────────────────────────
function blockquote(text) {
    return `<blockquote>${escapeHtml(text)}</blockquote>`;
}

function expandableBlockquote(text) {
    return `<blockquote expandable>${escapeHtml(text)}</blockquote>`;
}

// ─── Status badges ─────────────────────────────────────────────────────────────
const STATUS = {
    ok:      '✅',
    error:   '❌',
    warn:    '⚠️',
    info:    'ℹ️',
    loading: '⏳',
    lock:    '🔒',
    unlock:  '🔓',
    bot:     '🤖',
    link:    '🔗',
    star:    '⭐',
    fire:    '🔥',
    crown:   '👑',
    paw:     '🐾',
};

// ─── Standard response builder ────────────────────────────────────────────────
/**
 * buildResponse({ icon, title, body, footer?, note? })
 * Returns HTML-formatted Telegram message string.
 */
function buildResponse({ icon = STATUS.paw, title, body, footer, note }) {
    let html = `<b>${icon} ${escapeHtml(title)}</b>\n`;
    html += `<blockquote>${escapeHtml(body)}</blockquote>`;
    if (footer) html += `\n\n<i>${escapeHtml(footer)}</i>`;
    if (note)   html += `\n${escapeHtml(note)}`;
    return html;
}

// ─── Success / Error / Info quick builders ────────────────────────────────────
function successMsg(title, body, footer = '') {
    return buildResponse({ icon: STATUS.ok, title, body, footer });
}
function errorMsg(title, body) {
    return buildResponse({ icon: STATUS.error, title, body });
}
function infoMsg(title, body) {
    return buildResponse({ icon: STATUS.info, title, body });
}
function warnMsg(title, body) {
    return buildResponse({ icon: STATUS.warn, title, body });
}

// ─── Inline keyboard builders ─────────────────────────────────────────────────
/**
 * inlineRow(...buttons)
 * buttons: { text, callback_data? | url? }
 */
function inlineRow(...buttons) {
    return buttons.map((b) => {
        if (b.url)           return { text: b.text, url: b.url };
        if (b.callback_data) return { text: b.text, callback_data: b.callback_data };
        return b;
    });
}

/**
 * inlineKeyboard(rows)
 * rows: array of inlineRow() results
 */
function inlineKeyboard(rows) {
    return { reply_markup: { inline_keyboard: rows } };
}

/**
 * channelButton(label?)
 * Appends a "Follow Pappy Channel" button row.
 */
function channelButton(label = '📢 Follow Pappy Channel') {
    return inlineRow({ text: label, url: CHANNEL_URL });
}

// ─── Structured menu card ─────────────────────────────────────────────────────
/**
 * buildMenuCard({ title, description, sections })
 * sections: [{ header, items: [{ emoji, command, description }] }]
 */
function buildMenuCard({ title, description, sections = [] }) {
    let html = `<b>🐾 ${escapeHtml(title)}</b>\n`;
    if (description) html += `<i>${escapeHtml(description)}</i>\n`;
    html += '\n';

    for (const section of sections) {
        if (section.header) {
            html += `<b>── ${escapeHtml(section.header)} ──</b>\n`;
        }
        for (const item of section.items || []) {
            const emoji = item.emoji || '›';
            html += `${emoji} <code>${escapeHtml(item.command)}</code>`;
            if (item.description) html += ` — ${escapeHtml(item.description)}`;
            html += '\n';
        }
        html += '\n';
    }

    return html.trim();
}

// ─── Session / status card ────────────────────────────────────────────────────
/**
 * buildStatusCard({ phone, status, slots, uptime, nodes })
 */
function buildStatusCard({ phone, status, slots, uptime, nodes }) {
    const statusLine = status === 'connected'
        ? `${STATUS.ok} <b>Connected</b>`
        : `${STATUS.error} <b>Disconnected</b>`;

    return [
        `<b>${STATUS.bot} Pappy Bot V2 — Session Status</b>`,
        `<blockquote>`,
        `📱 <b>Phone:</b> <code>${escapeHtml(String(phone))}</code>`,
        `📡 <b>Status:</b> ${statusLine}`,
        slots  != null ? `🪝 <b>Slots:</b> ${escapeHtml(String(slots))}` : null,
        uptime != null ? `⏱ <b>Uptime:</b> ${escapeHtml(String(uptime))}` : null,
        nodes  != null ? `🌐 <b>Active Nodes:</b> ${escapeHtml(String(nodes))}` : null,
        `</blockquote>`,
    ].filter(Boolean).join('\n');
}

// ─── Paginated help text ──────────────────────────────────────────────────────
/**
 * buildHelpPage(commands, page, pageSize)
 * commands: [{ cmd, desc }]
 */
function buildHelpPage(commands, page = 1, pageSize = 10) {
    const total  = Math.ceil(commands.length / pageSize);
    const slice  = commands.slice((page - 1) * pageSize, page * pageSize);
    let   html   = `<b>📖 Commands — Page ${page}/${total}</b>\n\n`;
    for (const { cmd, desc } of slice) {
        html += `<code>${escapeHtml(cmd)}</code> — ${escapeHtml(desc)}\n`;
    }
    return { html, totalPages: total };
}

// ─── Separator / divider ──────────────────────────────────────────────────────
const DIVIDER = '─'.repeat(28);

module.exports = {
    escapeHtml,
    blockquote,
    expandableBlockquote,
    buildResponse,
    successMsg,
    errorMsg,
    infoMsg,
    warnMsg,
    inlineRow,
    inlineKeyboard,
    channelButton,
    buildMenuCard,
    buildStatusCard,
    buildHelpPage,
    STATUS,
    DIVIDER,
    CHANNEL_URL,
};
