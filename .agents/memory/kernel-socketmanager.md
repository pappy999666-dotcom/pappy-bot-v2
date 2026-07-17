---
name: runtimeKernel socketManager setState
description: The socketManager stub was missing setState() — caused crash during pairing
---

## The problem
core/whatsapp.js calls kernel.socketManager.setState(sessionKey, 'DISCONNECTED') and
kernel.socketManager.setState(sessionKey, 'OPEN') during connection lifecycle.
The runtimeKernel.js stub was missing this method, causing:
  [CrashGuard] unhandledRejection: kernel.socketManager.setState is not a function

## The fix (core/runtimeKernel.js)
Added setState(sessionKey, state) to the socketManager object in the stub.
Also fixed reconnectManager.schedule() to accept object options { reason, delayMs }
instead of only a string reason — whatsapp.js passes objects for reconnect timing.

**Why:** The verbose-fishstick reference uses class-based SocketManager with setState;
the pappy-bot stub omitted it.

**How to apply:** Any time the runtimeKernel stub is updated, verify all methods called
in whatsapp.js are present: register, remove, get, getAll, entries, setState, cleanupZombies.
