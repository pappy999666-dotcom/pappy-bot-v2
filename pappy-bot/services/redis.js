'use strict';
// services/redis.js — Stub (no Redis in this environment)
// Reference telegram.js does lazy require('../services/redis') inside a try block
// for the wipe-node feature. Exporting a null connection is safe.

module.exports = { connection: null };
