'use strict';
// core/bullEngine.js — Stub (no Redis/BullMQ in this environment)
// Exports the interface reference telegram.js expects; all ops are no-ops.

const logger = require('./logger');

const _noopQueue = {
    add: async () => null,
    getJobCounts: async () => ({ waiting: 0, active: 0, completed: 0, failed: 0 }),
    obliterate: async () => {},
    drain: async () => {},
    isPaused: async () => false,
    pause: async () => {},
    resume: async () => {},
};

const broadcastQueue = _noopQueue;

async function wipeQueue() {
    logger.warn('[BullEngine] wipeQueue called but Redis is not available in this env.');
}

async function getQueueDebugSnapshot() {
    return { queues: [], totalJobs: 0, redisReady: false };
}

function registerCampaign() {}
function isRedisReady() { return false; }

module.exports = { broadcastQueue, wipeQueue, getQueueDebugSnapshot, registerCampaign, isRedisReady };
