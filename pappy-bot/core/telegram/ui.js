"use strict";

/**
 * Telegram UI helpers — blockquote-aware formatting for Pappy Bot
 */

/**
 * Wrap text in a Telegram HTML blockquote
 */
function blockquote(text) {
    return `<blockquote>${text}</blockquote>`;
}

/**
 * Build a panel with title, body lines, and optional blockquote footer
 */
function panel(title, lines = [], footer = "") {
    const body = lines.filter(Boolean).join("\n");
    return `${title}${body ? `\n\n${body}` : ""}${footer ? `\n\n${blockquote(footer)}` : ""}`;
}

/**
 * Build a status box using pre-formatted block
 */
function statusBox(label, value) {
    return `<pre>┌─ ${label}\n└─ ${value}</pre>`;
}

/**
 * Info panel with blockquote body
 */
function infoPanel(title, content) {
    return `${title}\n\n${blockquote(content)}`;
}

/**
 * Safe edit — swallow errors if message hasn't changed or was deleted
 */
function safeEdit(ctx, text, extra = {}) {
    return ctx.editMessageText(text, extra).catch(() => {});
}

/**
 * Pagination row for inline keyboards
 */
function getPagination(page, totalPages, prefix) {
    const p = Number.isFinite(page) ? page : 0;
    const t = Math.max(1, totalPages);
    const prev = Math.max(0, p - 1);
    const next = Math.min(t - 1, p + 1);

    return [
        { text: "⬅️ Prev", callback_data: `${prefix}:p:${prev}` },
        { text: `${p + 1}/${t}`, callback_data: "ux:noop" },
        { text: "Next ➡️", callback_data: `${prefix}:p:${next}` },
    ];
}

/**
 * Build a pairing code display with blockquote highlight
 */
function pairingCodePanel(phone, code) {
    return [
        `🔐 <b>PAIRING CODE READY</b>`,
        ``,
        `📱 Number: <code>+${phone}</code>`,
        ``,
        blockquote(`Your pairing code:\n\n<b>${code}</b>\n\nOpen WhatsApp → Linked Devices → Link with phone number → enter this code.\n\nCode expires in ~60 seconds.`),
    ].join("\n");
}

/**
 * Build a connected confirmation panel
 */
function connectedPanel(phone) {
    return [
        `✅ <b>WHATSAPP CONNECTED!</b>`,
        ``,
        `📱 <code>+${phone}</code> is now live.`,
        ``,
        blockquote(`What you can do now:\n• Send .menu in any WhatsApp chat\n• Say "pappy" to trigger AI\n• Use .play, .sticker, .img and more`),
    ].join("\n");
}

module.exports = { panel, safeEdit, getPagination, blockquote, statusBox, infoPanel, pairingCodePanel, connectedPanel };
