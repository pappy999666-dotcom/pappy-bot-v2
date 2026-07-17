'use strict';
// core/runtimeKernel.js — Minimal kernel stub
// Provides the interface the reference whatsapp.js / telegram.js expect
// without requiring Redis, BullMQ, or the full worker infrastructure.

const DELAYS = [1500, 5000, 10000, 20000, 40000, 60000];
let kernel = null;

function getKernel() {
    if (kernel) return kernel;

    const reconnectTimers  = new Map();
    const reconnectCounts  = new Map();
    const stateMap         = new Map();
    const locks            = new Set();
    const sockets          = new Map();

    const reconnectManager = {
        state: stateMap,
        locks,
        setState(sessionKey, status) {
            stateMap.set(sessionKey, { status, attempts: reconnectCounts.get(sessionKey) || 0 });
        },
        markOpen(sessionKey) {
            reconnectCounts.delete(sessionKey);
            stateMap.set(sessionKey, { status: 'OPEN', attempts: 0 });
            const t = reconnectTimers.get(sessionKey);
            if (t) { clearTimeout(t); reconnectTimers.delete(sessionKey); }
        },
        schedule(sessionKey, fn, reason = '') {
            if (reconnectTimers.has(sessionKey)) return;
            const retries = reconnectCounts.get(sessionKey) || 0;
            const delay = DELAYS[Math.min(retries, DELAYS.length - 1)];
            reconnectCounts.set(sessionKey, retries + 1);
            stateMap.set(sessionKey, { status: 'RECONNECTING', attempts: retries + 1 });
            const t = setTimeout(() => {
                reconnectTimers.delete(sessionKey);
                fn();
            }, delay);
            reconnectTimers.set(sessionKey, t);
        },
        get(sessionKey) {
            return stateMap.get(sessionKey) || { status: 'DISCONNECTED', attempts: 0 };
        },
    };

    const socketManager = {
        register(sessionKey, sock) { sockets.set(sessionKey, sock); },
        remove(sessionKey)         { sockets.delete(sessionKey); },
        get(sessionKey)            { return sockets.get(sessionKey); },
        getAll()                   { return sockets; },
    };

    const presenceManager = {
        start(sessionKey, sock) {
            // Minimal presence: send available once
            setTimeout(() => sock?.sendPresenceUpdate?.('available').catch(() => {}), 3000);
        },
        stop(sessionKey) {},
    };

    const metricsManager   = { record: () => {}, increment: () => {}, get: () => 0 };
    const lifecycleManager = { on: () => {}, emit: () => {}, isShuttingDown: false };
    const cacheManager     = { get: () => null, set: () => {}, del: () => {}, clear: () => {} };
    const sessionIntegrity = { verify: async () => true };

    kernel = {
        reconnectManager,
        socketManager,
        presenceManager,
        metricsManager,
        lifecycleManager,
        cacheManager,
        sessionIntegrity,
        start() { /* no-op — no heavy workers needed */ },
    };

    return kernel;
}

module.exports = { getKernel };
