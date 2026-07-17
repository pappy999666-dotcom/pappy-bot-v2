---
name: PappyV4 command bridge
description: How Telegram-paired WhatsApp sockets get access to the 850 PappyV4 commands
---

## The problem
core/whatsapp.js creates per-user WhatsApp sockets via startWhatsApp().
These sockets route messages through commandRouter.js → plugins/ (only 7 commands).
The 850 commands live in PappyV4.js, accessed via MessagesUpsert() from src/message.js.

## The fix (core/whatsapp.js)
After socket registration (kernel.socketManager.register), call:
1. const v4store = makeInMemoryStore(...)
2. v4store.bind(sock.ev)   ← caches messages for quoted-reply lookups
3. await Solving(sock, v4store)   ← augments sock with decodeJid, getName, copyNForward, etc.
4. sessionStores.set(sessionKey, v4store)

In messages.upsert handler, after engine.triggerMessage(), call:
  await MessagesUpsert(sock, { messages, type }, v4store)

In teardownSocket: sessionStores.delete(sessionKey)

**Why:** MessagesUpsert calls require('../PappyV4')(sock, m, message, store) which has all 850 commands.
Solving() adds the socket helper methods PappyV4 expects (decodeJid, getName, copyNForward, etc.)

**How to apply:** Any time a new socket type is added to core/whatsapp.js, run this bridge setup.
