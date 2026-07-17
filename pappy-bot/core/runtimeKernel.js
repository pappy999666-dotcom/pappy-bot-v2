'use strict';
// core/runtimeKernel.js — Kernel stub
// Implements the full interface that whatsapp.js / telegram.js expect.

const BASE_DELAYS = [1500, 5000, 10000, 20000, 40000, 60000, 120000];
const MAX_ATTEMPTS = 50;

let kernel = null;

function getKernel() {
    if (kernel) return kernel;

    // ── Reconnect Manager ──────────────────────────────────────────────────────
    const reconnectTimers = new Map();
    const stateMap        = new Map();
    const locks           = new Set();

    const reconnectManager = {
        state: stateMap,
        locks,

        get(sessionKey) {
            return stateMap.get(sessionKey) || { status: 'DISCONNECTED', attempts: 0 };
        },

        setState(sessionKey, status) {
            const s = this.get(sessionKey);
            s.status = status;
            stateMap.set(sessionKey, s);
        },

        markOpen(sessionKey) {
            stateMap.set(sessionKey, { status: 'OPEN', attempts: 0 });
            locks.delete(sessionKey);
            const t = reconnectTimers.get(sessionKey);
            if (t) { clearTimeout(t); reconnectTimers.delete(sessionKey); }
        },

        // Accepts both string reason and object { reason, delayMs }
        schedule(sessionKey, fn, reasonOrOptions = '') {
            if (locks.has(sessionKey)) return false;

            const s = this.get(sessionKey);
            if (s.status === 'DESTROYED' || s.status === 'DEAD') return false;

            const opts = (reasonOrOptions && typeof reasonOrOptions === 'object')
                ? reasonOrOptions
                : { reason: reasonOrOptions };

            s.attempts = (s.attempts || 0) + 1;

            if (s.attempts > MAX_ATTEMPTS) {
                s.status = 'DEAD';
                stateMap.set(sessionKey, s);
                return false;
            }

            locks.add(sessionKey);
            s.status = 'RECONNECTING';
            stateMap.set(sessionKey, s);

            // Use explicit delayMs if provided, otherwise exponential back-off
            const expDelay = BASE_DELAYS[Math.min(s.attempts - 1, BASE_DELAYS.length - 1)];
            const delayMs  = (Number.isFinite(Number(opts.delayMs)) && Number(opts.delayMs) >= 0)
                ? Math.min(120000, Number(opts.delayMs))
                : expDelay;

            const t = setTimeout(() => {
                reconnectTimers.delete(sessionKey);
                locks.delete(sessionKey);
                try { fn(); } catch {}
            }, delayMs);

            reconnectTimers.set(sessionKey, t);
            return true;
        },

        destroy(sessionKey) {
            const s = this.get(sessionKey);
            s.status = 'DESTROYED';
            stateMap.set(sessionKey, s);
            locks.delete(sessionKey);
            const t = reconnectTimers.get(sessionKey);
            if (t) { clearTimeout(t); reconnectTimers.delete(sessionKey); }
        },
    };

    // ── Socket Manager ─────────────────────────────────────────────────────────
    const sockets  = new Map();
    const sockMeta = new Map();

    const socketManager = {
        register(sessionKey, sock) {
            const existing = sockets.get(sessionKey);
            if (existing && existing !== sock) {
                try { existing.ws?.close?.(); } catch {}
            }
            sockets.set(sessionKey, sock);
            sockMeta.set(sessionKey, { state: 'CONNECTING', updatedAt: Date.now() });
            return sock;
        },

        get(sessionKey)  { return sockets.get(sessionKey) || null; },
        getAll()         { return sockets; },
        entries()        { return sockets.entries(); },

        setState(sessionKey, state) {
            const m = sockMeta.get(sessionKey) || { state, updatedAt: Date.now() };
            m.state     = state;
            m.updatedAt = Date.now();
            sockMeta.set(sessionKey, m);
        },

        remove(sessionKey) {
            const sock = sockets.get(sessionKey);
            if (sock) {
                try { sock.ws?.close?.(); } catch {}
                sockets.delete(sessionKey);
            }
            sockMeta.delete(sessionKey);
        },

        cleanupZombies(maxIdleMs = 10 * 60 * 1000) {
            const now = Date.now();
            for (const [sessionKey, m] of sockMeta.entries()) {
                if ((now - Number(m.updatedAt || 0)) > maxIdleMs && m.state !== 'OPEN') {
                    this.remove(sessionKey);
                }
            }
        },
    };

    // ── Presence Manager ───────────────────────────────────────────────────────
    const presenceManager = {
        start(sessionKey, sock) {
            setTimeout(() => sock?.sendPresenceUpdate?.('available').catch(() => {}), 3000);
        },
        stop(sessionKey)  {},
        stopAll()         {},
    };

    // ── Lightweight stubs ──────────────────────────────────────────────────────
    const metricsManager = {
        record: () => {}, increment: () => {}, get: () => 0,
        setGauge: () => {}, inc: () => {}, gauge: () => {},
    };

    const lifecycleManager = {
        on: () => {}, emit: () => {}, isShuttingDown: false,
        addTimeout(name, fn, delayMs) {
            // Minimal: just run the fn after the delay
            setTimeout(() => { try { fn(); } catch {} }, delayMs);
        },
        clearTimeout(name) {},
        async shutdown() {},
    };

    const cacheManager     = { get: () => null, set: () => {}, del: () => {}, clear: () => {} };
    const sessionIntegrity = {
        verify: async () => true,
        validateCredentials: async () => ({ registered: true }),
    };
    const healthMonitor    = { start: () => {}, stop: () => {} };

    kernel = {
        reconnectManager,
        socketManager,
        presenceManager,
        metricsManager,
        lifecycleManager,
        cacheManager,
        sessionIntegrity,
        healthMonitor,
        // Aliases used by some modules
        metrics:   metricsManager,
        lifecycle: lifecycleManager,
        start()    { /* no heavy workers needed */ },
        async shutdown() {},
    };

    return kernel;
}

module.exports = { getKernel };
