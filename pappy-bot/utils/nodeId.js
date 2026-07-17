'use strict';
// utils/nodeId.js — Stable node identifier stub
// Returns a consistent ID for this runtime instance.

const os = require('os');
const crypto = require('crypto');

const _hostname = os.hostname();
const NODE_ID = crypto
    .createHash('sha1')
    .update(_hostname + process.pid)
    .digest('hex')
    .slice(0, 12);

module.exports = NODE_ID;
