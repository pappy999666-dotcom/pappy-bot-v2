'use strict';
// lib/richResponse.js — Pappy Bot V2 Rich WhatsApp Response Helpers
// Builds modern interactive messages using @crysnovax/baileys v2.6.9

const { proto, generateWAMessageFromContent, prepareWAMessageMedia } = require('@crysnovax/baileys');
const fs = require('fs');
const path = require('path');

const CHANNEL_JID  = '120363232303807350@newsletter';
const CHANNEL_NAME = 'Pappy Bot V2';
const CHANNEL_URL  = 'https://whatsapp.com/channel/0029VbCSVL9HLHQgReyVeE39';

// ─── Internal: build the channel context block ────────────────────────────────
function _channelContext(mentionedJid = []) {
    return {
        mentionedJid,
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: CHANNEL_JID,
            newsletterName: CHANNEL_NAME,
            serverMessageId: 143,
        },
    };
}

// ─── Interactive text + optional image message ────────────────────────────────
/**
 * sendInteractive(sock, jid, { body, footer, imagePath?, buttons?, mentionedJid?, quoted? })
 * Sends a modern interactive native-flow message.
 */
async function sendInteractive(sock, jid, opts = {}) {
    const {
        body = '',
        footer = `🌐 ${CHANNEL_URL}`,
        imagePath = null,
        buttons = [],
        mentionedJid = [],
        quoted = null,
    } = opts;

    try {
        const headerOpts = imagePath
            ? await prepareWAMessageMedia(
                  { image: fs.readFileSync(imagePath) },
                  { upload: sock.waUploadToServer }
              )
            : { hasMediaAttachment: false };

        const msg = generateWAMessageFromContent(
            jid,
            {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2,
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.create({
                            body: proto.Message.InteractiveMessage.Body.create({ text: body }),
                            footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                hasMediaAttachment: !!imagePath,
                                ...headerOpts,
                            }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                buttons: buttons.length ? buttons : [{}],
                            }),
                            contextInfo: _channelContext(mentionedJid),
                        }),
                    },
                },
            },
            { quoted }
        );

        return sock.relayMessage(jid, msg.message, {});
    } catch (err) {
        // Fallback to plain text if interactive fails
        return sock.sendMessage(jid, { text: body }, { quoted });
    }
}

// ─── Rich list message ────────────────────────────────────────────────────────
/**
 * sendList(sock, jid, { title, description, buttonText, footer, sections, quoted? })
 */
async function sendList(sock, jid, opts = {}) {
    const {
        title = 'Pappy Bot V2',
        description = '',
        buttonText = '📋 Open Menu',
        footer = CHANNEL_URL,
        sections = [],
        quoted = null,
    } = opts;

    try {
        return sock.sendMessage(
            jid,
            {
                listMessage: {
                    title,
                    description,
                    buttonText,
                    listType: 1,
                    sections,
                    footerText: footer,
                },
            },
            { quoted }
        );
    } catch {
        const flat = sections.flatMap((s) => s.rows.map((r) => `• *${r.title}*: ${r.description || ''}`));
        return sock.sendMessage(jid, { text: `*${title}*\n${description}\n\n${flat.join('\n')}` }, { quoted });
    }
}

// ─── Buttons message ──────────────────────────────────────────────────────────
/**
 * sendButtons(sock, jid, { title, content, footer, buttons, quoted? })
 * buttons: [{ buttonId, buttonText: { displayText } }]
 */
async function sendButtons(sock, jid, opts = {}) {
    const {
        title = '',
        content = '',
        footer = CHANNEL_URL,
        buttons = [],
        quoted = null,
        imagePath = null,
    } = opts;

    try {
        const base = imagePath
            ? { image: fs.readFileSync(imagePath), caption: content }
            : { text: content };

        return sock.sendMessage(
            jid,
            {
                ...base,
                title,
                footer,
                buttons,
                headerType: imagePath ? 4 : 1,
            },
            { quoted }
        );
    } catch {
        const labels = buttons.map((b) => `› ${b.buttonText?.displayText || ''}`).join('\n');
        return sock.sendMessage(
            jid,
            { text: `${title ? `*${title}*\n` : ''}${content}\n\n${labels}` },
            { quoted }
        );
    }
}

// ─── Rich text with channel context ──────────────────────────────────────────
/**
 * sendRichText(sock, jid, text, opts?)
 * Sends a plain-text message branded with the channel forwarding context.
 */
async function sendRichText(sock, jid, text, opts = {}) {
    const { quoted = null, mentionedJid = [] } = opts;
    return sock.sendMessage(
        jid,
        {
            text,
            contextInfo: _channelContext(mentionedJid),
        },
        { quoted }
    );
}

// ─── Image + caption with channel context ────────────────────────────────────
async function sendRichImage(sock, jid, imagePath, caption = '', opts = {}) {
    const { quoted = null, mentionedJid = [] } = opts;
    const source = imagePath.startsWith('http')
        ? { url: imagePath }
        : fs.readFileSync(imagePath);

    return sock.sendMessage(
        jid,
        {
            image: source,
            caption,
            contextInfo: _channelContext(mentionedJid),
        },
        { quoted }
    );
}

// ─── Poll message ─────────────────────────────────────────────────────────────
/**
 * sendPoll(sock, jid, { name, values, selectableCount?, quoted? })
 */
async function sendPoll(sock, jid, opts = {}) {
    const { name = 'Vote', values = [], selectableCount = 1, quoted = null } = opts;
    return sock.sendMessage(
        jid,
        { poll: { name, values, selectableCount } },
        { quoted }
    );
}

module.exports = {
    sendInteractive,
    sendList,
    sendButtons,
    sendRichText,
    sendRichImage,
    sendPoll,
    CHANNEL_URL,
    CHANNEL_JID,
    CHANNEL_NAME,
};
