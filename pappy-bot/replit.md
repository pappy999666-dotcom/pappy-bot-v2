# Pappy Bot V2

## Project overview

WhatsApp multi-device bot renovated from XLICON-V4-MD. Upgraded to `@crysnovax/baileys ^2.6.9` with 850 commands across 24 categories, 31 auto-features, and full 27/27 event coverage. Multi-session pairing is managed through a Telegram bot.

**Entry point:** `start.js` → `index.js` (process manager with auto-restart)  
**Command handler:** `PappyV4.js` (all 850 commands)  
**Library:** `@crysnovax/baileys ^2.6.9`

## How to run

1. Set `TG_BOT_TOKEN` secret (get from @BotFather on Telegram)
2. Set `OWNER_TG_ID` secret (get from @userinfobot on Telegram)
3. Set `OWNER_NUMBER` secret (e.g. `923xxxxxxxxx`) — WhatsApp number of bot owner
4. Click **Run** — the "Start Bot" workflow installs deps and launches `start.js`
5. DM your Telegram bot → use `/pair <phone>` to link WhatsApp accounts

## Connecting a WhatsApp account

Each user pairs their own WhatsApp through Telegram:
1. DM the Telegram bot and send `/pair 923001234567` (your number with country code)
2. Bot sends an 8-character pairing code
3. Open WhatsApp → Linked Devices → Link with phone number → enter the code
4. Bot confirms connection — send `.menu` on WhatsApp to access all commands

## Required secrets

| Secret | Purpose |
|---|---|
| `TG_BOT_TOKEN` | Telegram bot token from @BotFather |
| `OWNER_TG_ID` | Your Telegram numeric user ID |
| `OWNER_NUMBER` | Bot owner's WhatsApp number (digits only) |

## Optional secrets (backward compat single-session)

| Secret | Purpose |
|---|---|
| `SESSION_ID` | WhatsApp session from MEGA (`PAPPY-V2~<megaId>`) |
| `PHONE_NUMBER` | Alternative: phone number for pairing-code auth |

## Optional env vars (all have defaults)

`BOT_NAME`, `OWNER_NAME`, `XPREFIX`, `MENU_TYPE`, `REPLY_TYPE`,
`ANTI_DELETE`, `AUTOBLOCK_COUNTRYCODE`, `ANTIFOREIGN_COUNTRYCODE`,
`FREE_LIMIT`, `PREMIUM_LIMIT`, `DB_FILE`

## Key files

| File | Purpose |
|---|---|
| `index.js` | Single-session WA socket + all 27 event handlers |
| `core/telegram.js` | Telegraf bot — /pair, /status, /unpair, /sessions, /broadcast |
| `core/whatsapp.js` | Multi-session manager — startWhatsApp(), bootAllSessions(), activeSockets |
| `settings.js` | Global config (env-driven, hot-reloads in dev) |
| `src/message.js` | Serialize helper, utility methods patched onto sock |
| `PappyV4.js` | All command implementations |
| `lib/function.js` | Utility functions — must import from @crysnovax/baileys |
| `sessions/` | Per-user auth state dirs (`<telegramId>_<phone>_1/`) |

## Architecture — multi-session

```
Telegram user → /pair <phone>
  → core/telegram.js (Telegraf bot)
    → core/whatsapp.js startWhatsApp(telegramId, phone)
      → useMultiFileAuthState('sessions/<telegramId>_<phone>_1/')
      → sock.requestPairingCode(phone)
      → pairing code sent back via Telegram DM
      → on 'connection.update' open → confirmation sent
      → messages routed to PappyV4.js via src/message.js handlers
```

On startup: `bootAllSessions()` auto-reconnects all previously paired sessions.

## Telegram bot commands

| Command | Access | Purpose |
|---|---|---|
| `/start` | All | Welcome + instructions |
| `/pair <phone>` | All | Link a WhatsApp number |
| `/status` | All | Show your active sessions |
| `/unpair <phone>` | All | Disconnect a number |
| `/sessions` | Owner | List all active sessions across all users |
| `/broadcast <msg>` | Owner | Send a message via all online sessions |

## Renovation history

### Completed (P1 + P2)
- [x] Library upgraded: `@whiskeysockets/baileys` → `@crysnovax/baileys ^2.6.9`
- [x] All 27 events wired (was 4/27 before)
- [x] Multi-session Telegram pairing (verbose-fishstick pattern)
- [x] `lib/function.js` fixed to import from `@crysnovax/baileys`

### Remaining (P3–P6 — future work)
- [ ] P3: SQLite auth state (blocked — `better-sqlite3` won't compile natively in Replit)
- [ ] P4: Interactive UI — `.menu` as listMessage, game commands as native flow buttons
- [ ] P5: New commands — `.welcome-flow`, `.aisteps`, `.quiz`, `.livelocation`, `.privacy`, `.blocklist`
- [ ] P6: Community, labels, business profile, USyncBotProfile

## User preferences

- Keep existing code structure — do not restructure unless asked
- Maintain backward compat with all original PAPPY-V4 commands
