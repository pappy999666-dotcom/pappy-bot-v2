---
name: Pappy Bot V2 setup
description: Core renovation decisions, blocked packages, multi-session Telegram pairing, and what's done vs remaining
---

## Library upgrade
- Old: `@whiskeysockets/baileys` via `npm:baileys@latest` + `@rodrigogs/baileys-store` (separate)
- New: `@crysnovax/baileys ^2.6.9` — includes `makeInMemoryStore` built-in, no separate store package needed
- `makeWASocket`, `makeInMemoryStore`, `proto`, `useMultiFileAuthState` all export correctly from new lib

**Why:** spec requires @crysnovax/baileys for full 27-event coverage and new send patterns (album, interactive, carousel, newsletter, etc.)

**How to apply:** ALL files that import Baileys must use `@crysnovax/baileys`: `index.js`, `src/message.js`, `PappyV4.js`, `lib/function.js`, `core/whatsapp.js`

## lib/function.js — baileys import fix
- `lib/function.js` line 50 imported `@whiskeysockets/baileys` — must be `@crysnovax/baileys`
- This causes a hard crash on startup if not fixed

## npm overrides required
Add these to `package.json` `"overrides"` or installs will fail with 403:
- `"jsonpath-plus": "^10.2.0"` — old 5.0.7 blocked (Critical CVE), pulled by `javascript-obfuscator`
- `"form-data": "^4.0.0"` — old 2.3.3 blocked, pulled by `request`

**Why:** Replit security firewall blocks packages with Critical CVEs.

## better-sqlite3 — do NOT add to package.json
Needs native compilation (`node-gyp`) which fails in this Replit environment. Skip for Priority 3 (SQLite auth state). Use `useMultiFileAuthState` (file-based) instead.

## GitHub remote
- Repo: https://github.com/pappy999666-dotcom/pappy-bot-v2
- Push using GITHUB_TOKEN secret (belongs to pappy999666-dotcom)
- Original cloned remote (ahmmikun/XLICON-V4-MD) is no longer origin

## Session ID format
- New format: `PAPPY-V2~<megaId>`
- Legacy `XLICON-V4~<megaId>` still accepted (backward compat in `index.js`)

## Events wired (27/27 complete)
Previously missing, now added in `index.js`: `messages.update`, `messages.delete`, `messages.reaction`, `chats.upsert`, `presence.update`. Also added group cache invalidation to existing `groups.update` handler.

## Multi-session Telegram pairing (added)
- Reference repo: https://github.com/pappy999666-dotcom/verbose-fishstick (under `artifacts/api-server/`)
- Architecture: `core/telegram.js` (Telegraf bot) + `core/whatsapp.js` (session manager)
- Session key format: `<telegramId>_<phone>_<slotId>` (e.g. `123456789_923001234567_1`)
- Sessions stored in `sessions/<sessionKey>/` using `useMultiFileAuthState`
- `activeSockets` Map: sessionKey → live WASocket
- `bootAllSessions()` scans `sessions/` on startup, only boots dirs with `creds.registered === true`
- Pairing code flow: user sends /pair <phone> → Telegram → `sock.requestPairingCode()` → code sent back via Telegram DM
- `global.tgBot` set by `core/telegram.js` so `core/whatsapp.js` can send messages back
- Telegraf launched with `dropPendingUpdates: true` (long-polling, no webhook needed)

## DisconnectReason codes in @crysnovax/baileys
Exact numeric values (always use these, never guess):
- 401 = loggedOut → permanent, unregister + notify
- 403 = forbidden → permanent, notify (possible ban)
- 408 = timedOut / connectionLost → retry
- 411 = multideviceMismatch → retry
- 428 = connectionClosed → retry
- 440 = connectionReplaced → permanent, notify
- 500 = badSession → permanent, unregister + notify
- 503 = unavailableService → retry
- 515 = restartRequired → retry
- **405 = NOT in enum — WhatsApp "waiting for pairing code" signal** → ALWAYS retry, never treat as permanent

**Why:** 405 is emitted immediately after `requestPairingCode()` while WhatsApp waits for the code to be entered. Adding 405 to the noRetry list kills the session before the user can enter the code. The correct behavior is to let it silently reconnect (with backoff) until `connection.update` fires with `open` after the code is entered.

## Required secrets
- `TG_BOT_TOKEN` — Telegram bot token from @BotFather
- `OWNER_TG_ID` — Telegram numeric user ID of the owner

## Remaining priorities
- P3: SQLite auth state (blocked by better-sqlite3 native compile issue — defer)
- P4: Interactive UI on menus (.menu as listMessage, .suit/.truth/.dare as native flow buttons)
- P5: New commands (.welcome-flow, .aisteps, .quiz, .livelocation, .privacy, .blocklist, .stickerpack, newsletter, community)
- P6: Community, labels, business profile, USyncBotProfile
