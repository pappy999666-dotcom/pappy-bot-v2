# 🐾 PAPPY-BOT-V2

> Renovated WhatsApp multi-device bot — PAPPY-BOT-V2 rebuilt on **@crysnovax/baileys v2.6.9**

## ✨ What's New in V2

| Feature | Before (PAPPY-V4) | After (Pappy V2) |
|---|---|---|
| Baileys library | `@whiskeysockets/baileys` (old) | `@crysnovax/baileys ^2.6.9` |
| Commands | 763 | **850** |
| Categories | 20 | **24** |
| Auto-features | 19 | **31** |
| Event coverage | 4/27 | **27/27** |
| Interactive UI | None | Buttons, Lists, Polls, Albums, Carousels |

## 🚀 Setup on Replit

### 1. Required environment variables

| Variable | Description |
|---|---|
| `SESSION_ID` | Your WhatsApp session — format `PAPPY-V2~<megaId>` |
| `OWNER_NUMBER` | Your WhatsApp number with country code (e.g. `923xxxxxxxxx`) |
| `BOT_NAME` | Display name for the bot (default: `PAPPY-BOT-V2`) |
| `OWNER_NAME` | Your name shown in bot info |
| `PHONE_NUMBER` | Phone number for pairing-code auth (alternative to SESSION_ID) |

All other settings have sensible defaults in `settings.js`.

### 2. Run

The bot starts automatically via the **Start Bot** workflow. It will either:
- Load `session/creds.json` if present
- Download creds from the MEGA link in `SESSION_ID`
- Prompt for a pairing code if `PHONE_NUMBER` is set and no session exists

## 📁 Structure

```
pappy-bot-v2/
├── index.js          # Entry point — makeWASocket + all 27 event handlers
├── start.js          # Process manager (auto-restart)
├── settings.js       # All global config (env-driven)
├── PappyV4.js       # Command handler (850 commands)
├── src/
│   ├── message.js    # Event processors + sock utility methods
│   ├── database.js   # JSON / MongoDB DB abstraction
│   └── premium.js    # Premium user management
├── lib/              # Scrapers, converters, game engine, etc.
├── PappyMedia/      # Pre-loaded sticker/sound/image/video buffers
└── database/         # Persistent JSON data files
```

## 🎛️ Default Prefix

`.` (configurable via `XPREFIX` env var)

## 📋 Command Categories (24)

General · Search · Downloaders · Converter · AI Tools · Anime Actions ·
Anime Media · Stickers & Media · Utility · Owner · Sticker Actions ·
Sound Library · Games & Economy · Group Admin · Group Privacy ·
Bot Settings · Database / Custom Responses · Religion · Newsletter ·
Community · Business · Labels · Status · New (4 added in V2)

## ⚡ 27/27 Events Wired

`connection.update` · `creds.update` · `contacts.update` · `groups.update` ·
`group-participants.update` · `messages.upsert` · `messages.update` ·
`messages.delete` · `messages.reaction` · `chats.upsert` · `presence.update` ·
`call` _(+ 16 more via auto-feature handlers)_

## 🔑 Access Levels

| Level | Who |
|---|---|
| `[ALL]` | Everyone |
| `[FREE]` | Free users — 100 uses/day |
| `[PREMIUM]` | Premium users — 999 uses/day |
| `[ADMIN]` | Group admins |
| `[OWNER]` | Bot owner only |

---

Base: [PAPPY-BOT-V2](https://github.com/pappy/PAPPY-BOT-V2) by Pappy · Library: [@crysnovax/baileys](https://www.npmjs.com/package/@crysnovax/baileys)
