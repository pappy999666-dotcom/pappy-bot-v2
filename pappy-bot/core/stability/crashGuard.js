'use strict';
const _shutdownHandlers = new Map();
module.exports = {
    install() {
        process.on('uncaughtException',  (err) => console.error('[CrashGuard] uncaughtException:', err.message));
        process.on('unhandledRejection', (err) => console.error('[CrashGuard] unhandledRejection:', err?.message || err));
    },
    registerShutdown(name, fn) { _shutdownHandlers.set(name, fn); },
};
