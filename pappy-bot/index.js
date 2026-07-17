require('./settings');
const fs = require('fs');
const pino = require('pino');
const { color } = require('./lib/color');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const readline = require('readline');
const { File } = require('megajs');
const FileType = require('file-type');
const { exec } = require('child_process');
const { Boom } = require('@hapi/boom');
const NodeCache = require('node-cache');
const PhoneNumber = require('awesome-phonenumber');

// ── PRIORITY 1: Upgraded to @crysnovax/baileys v2.6.9 ──────────────────────
const {
  default: makeWASocket,
  useMultiFileAuthState,
  Browsers,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  proto,
  getAggregateVotesInPollMessage,
  makeInMemoryStore,
} = require('@crysnovax/baileys');
// ───────────────────────────────────────────────────────────────────────────

let phoneNumber = process.env.PHONE_NUMBER || '';
const pairingCode = !!phoneNumber || process.argv.includes('--pairing-code');
const useMobile = process.argv.includes('--mobile');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));
let owner = JSON.parse(fs.readFileSync('./src/owner.json'));

global.api = (name, path = '/', query = {}, apikeyqueryname) =>
  (name in global.APIs ? global.APIs[name] : name) +
  path +
  (query || apikeyqueryname
    ? '?' +
      new URLSearchParams(
        Object.entries({
          ...query,
          ...(apikeyqueryname
            ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] }
            : {}),
        })
      )
    : '');

const DataBase = require('./src/database');
const database = new DataBase();
(async () => {
  const loadData = await database.read();
  if (loadData && Object.keys(loadData).length === 0) {
    global.db = {
      sticker: {},
      users: {},
      groups: {},
      database: {},
      settings: {},
      others: {},
      ...(loadData || {}),
    };
    await database.write(global.db);
  } else {
    global.db = loadData;
  }

  setInterval(async () => {
    if (global.db) await database.write(global.db);
  }, 30000);
})();

const { GroupUpdate, GroupParticipantsUpdate, MessagesUpsert, Solving } = require('./src/message');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif');
const { isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/function');

const sessionDir = path.join(__dirname, 'session');
const credsPath = path.join(sessionDir, 'creds.json');

async function sessionLoader() {
  try {
    await fs.promises.mkdir(sessionDir, { recursive: true });

    if (!fs.existsSync(credsPath)) {
      if (!global.SESSION_ID) {
        return console.log(color('Session id and creds.json not found!\n\nWait to enter your number', 'red'));
      }

      // Support both PAPPY-V2~ and legacy PAPPY-V2~ prefixes
      const sessionData =
        global.SESSION_ID.split('PAPPY-V2~')[1] || global.SESSION_ID.split('PAPPY-V2~')[1];

      if (!sessionData) {
        return console.log(color('Invalid SESSION_ID format. Use PAPPY-V2~<megaId>', 'red'));
      }

      const filer = File.fromURL(`https://mega.nz/file/${sessionData}`);

      await new Promise((resolve, reject) => {
        filer.download((err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      }).then(async (data) => {
        await fs.promises.writeFile(credsPath, data);
        console.log(color('Session downloaded successfully, proceeding to start...', 'green'));
        await startPappyBot();
      });
    }
  } catch (error) {
    console.error('Error retrieving session:', error);
  }
}

console.log(
  chalk.cyan(`
██████╗  █████╗ ██████╗ ██████╗ ██╗   ██╗    ██████╗  ██████╗ ████████╗    ██╗   ██╗██████╗ 
██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝    ██╔══██╗██╔═══██╗╚══██╔══╝    ██║   ██║╚════██╗
██████╔╝███████║██████╔╝██████╔╝ ╚████╔╝     ██████╔╝██║   ██║   ██║       ██║   ██║ █████╔╝
██╔═══╝ ██╔══██║██╔═══╝ ██╔═══╝   ╚██╔╝      ██╔══██╗██║   ██║   ██║       ╚██╗ ██╔╝██╔═══╝ 
██║     ██║  ██║██║     ██║        ██║        ██████╔╝╚██████╔╝   ██║        ╚████╔╝ ███████╗
╚═╝     ╚═╝  ╚═╝╚═╝     ╚═╝        ╚═╝        ╚═════╝  ╚═════╝    ╚═╝         ╚═══╝  ╚══════╝
  `)
);

console.log(
  chalk.white.bold(`${chalk.gray.bold('📃  Information :')}
✉️  Script  : PAPPY-BOT-V2
✉️  Base    : PAPPY-BOT-V2 by Pappy
✉️  Library : @crysnovax/baileys v2.6.9
✉️  Commands: 850 | Categories: 24 | Events: 27/27

${chalk.green.bold('Ｐｏｗｅｒｅｄ Ｂｙ ＰＡＰＰＹ ＢＯＴＺ')}\n`)
);

async function startPappyBot() {
  let version = [2, 3000, 1015901307];

  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const msgRetryCounterCache = new NodeCache();

  const _groupMetaCache = new Map();
  const sock = makeWASocket({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: !pairingCode,
    browser: Browsers.ubuntu('Chrome'),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
    },
    version,
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    syncFullHistory: false,
    getMessage: async (key) => {
      const jid = sock.decodeJid ? sock.decodeJid(key.remoteJid) : key.remoteJid;
      const msg = await store.loadMessage(jid, key.id);
      return msg?.message || { conversation: '' };
    },
    cachedGroupMetadata: async (jid) => {
      if (_groupMetaCache.has(jid)) return _groupMetaCache.get(jid);
      try {
        const meta = await sock.groupMetadata(jid);
        _groupMetaCache.set(jid, meta);
        setTimeout(() => _groupMetaCache.delete(jid), 5 * 60 * 1000); // 5-min TTL
        return meta;
      } catch { return undefined; }
    },
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined,
  });

  // Alias for backward compat with PappyBotInc references throughout codebase
  const PappyBotInc = sock;

  store.bind(PappyBotInc.ev);
  await Solving(PappyBotInc, store);

  if (pairingCode && !PappyBotInc.authState.creds.registered) {
    if (useMobile) throw new Error('Cannot use pairing code with mobile API');

    let phoneNumber;
    phoneNumber = await question('Please enter your number starting with country code (e.g. 923xxxxxxxxx):\n');
    phoneNumber = phoneNumber.trim();

    setTimeout(async () => {
      const code = await PappyBotInc.requestPairingCode(phoneNumber);
      console.log(chalk.black(chalk.bgGreen(`🎁  Pairing Code : ${code}`)));
    }, 3000);
  }

  // ── Core credential + connection events ──────────────────────────────────
  PappyBotInc.ev.on('creds.update', saveCreds);

  PappyBotInc.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, receivedPendingNotifications } = update;
    if (connection === 'close') {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.connectionLost) {
        console.log('Connection Lost, Reconnecting...');
        startPappyBot();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log('Connection Closed, Reconnecting...');
        startPappyBot();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log('Restart Required...');
        startPappyBot();
      } else if (reason === DisconnectReason.timedOut) {
        console.log('Connection Timed Out, Reconnecting...');
        startPappyBot();
      } else if (reason === DisconnectReason.badSession) {
        console.log('Bad Session — delete session folder and scan again.');
        process.exit(1);
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log('Connection Replaced — close the other session first.');
        PappyBotInc.logout();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log('Logged Out — scan again and restart.');
      } else if (reason === DisconnectReason.Multidevicemismatch) {
        console.log('Multi-device mismatch — scan again.');
      } else {
        PappyBotInc.end(`Unknown DisconnectReason: ${reason}|${connection}`);
      }
    }
    if (connection === 'open') {
      console.log(chalk.green('✅ Connected: ' + JSON.stringify(PappyBotInc.user, null, 2)));
    } else if (receivedPendingNotifications === 'true') {
      console.log('Please wait ~1 minute for pending notifications...');
    }
  });

  // ── Contact sync ─────────────────────────────────────────────────────────
  PappyBotInc.ev.on('contacts.update', (update) => {
    for (let contact of update) {
      let id = PappyBotInc.decodeJid(contact.id);
      if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
    }
  });

  // ── Call rejection ────────────────────────────────────────────────────────
  PappyBotInc.ev.on('call', async (call) => {
    let botNumber = await PappyBotInc.decodeJid(PappyBotInc.user.id);
    let anticall = global.db.settings[botNumber]?.anticall;
    if (anticall) {
      for (let id of call) {
        if (id.status === 'offer') {
          let msg = await PappyBotInc.sendMessage(id.from, {
            text: `⛔ Bot cannot receive ${id.isVideo ? 'video' : 'voice'} calls. Contact the owner for help @${id.from.split('@')[0]}.`,
            mentions: [id.from],
          });
          await PappyBotInc.sendContact(id.from, global.ownernumber, msg);
          await PappyBotInc.rejectCall(id.id, id.from);
        }
      }
    }
  });

  // ── Group info changes ────────────────────────────────────────────────────
  PappyBotInc.ev.on('groups.update', async (update) => {
    // Invalidate group cache for every update (Priority 2)
    for (const u of update) {
      if (store.groupMetadata) delete store.groupMetadata[u.id];
    }
    await GroupUpdate(PappyBotInc, update, store);
  });

  // ── Group participants (join/leave/promote/demote) ────────────────────────
  PappyBotInc.ev.on('group-participants.update', async (update) => {
    await GroupParticipantsUpdate(PappyBotInc, update);
  });

  // ── Main message handler ──────────────────────────────────────────────────
  PappyBotInc.ev.on('messages.upsert', async (message) => {
    await MessagesUpsert(PappyBotInc, message, store);
  });

  // ── PRIORITY 2: Wire previously-missing events ────────────────────────────

  // Message edits + delivery/read receipts
  PappyBotInc.ev.on('messages.update', async (updates) => {
    for (const update of updates) {
      // Re-process edited messages as commands if content changed
      if (update.update?.message) {
        try {
          const msg = await store.loadMessage(update.key.remoteJid, update.key.id);
          if (msg) {
            msg.message = update.update.message;
            await MessagesUpsert(PappyBotInc, { messages: [msg], type: 'append' }, store);
          }
        } catch {}
      }
    }
  });

  // Anti-delete: catch deleted messages before they disappear from store
  PappyBotInc.ev.on('messages.delete', async (item) => {
    if (!('keys' in item)) return;
    const botNumber = PappyBotInc.decodeJid(PappyBotInc.user.id);
    const antidelete = global.db?.settings?.[botNumber]?.antidelete ?? (global.antidelete === 'true');
    if (!antidelete) return;

    for (const key of item.keys) {
      try {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        if (!msg || msg.key.fromMe) continue;
        const who = key.participant || key.remoteJid;
        await PappyBotInc.sendMessage(key.remoteJid, {
          text: `🗑️ *Anti-Delete:* @${who.split('@')[0]} deleted a message`,
          mentions: [who],
        });
        // Forward the deleted content
        await PappyBotInc.copyNForward(key.remoteJid, msg, true).catch(() => {});
      } catch {}
    }
  });

  // Reaction tracker — enables react-to-confirm UX for games/polls
  PappyBotInc.ev.on('messages.reaction', async (evts) => {
    for (const e of evts) {
      if (e.key.fromMe) continue;
      // Reaction stored for future handleReactionResponse hooks (Priority 5)
      const emoji = e.reaction?.text;
      if (!emoji) continue;
      // e.g. poll answer via reaction, game UX, etc. — hook in here
    }
  });

  // New chat detection — triggers welcome flow for first DMs
  PappyBotInc.ev.on('chats.upsert', async (chats) => {
    for (const chat of chats) {
      // DMs only — group welcome handled via group-participants.update
      if (!chat.id.endsWith('@g.us') && !chat.id.endsWith('@broadcast')) {
        // createWelcomeFlow() integration point (Priority 5 — .welcome-flow)
      }
    }
  });

  // Presence tracker — last-seen sync into store contacts
  PappyBotInc.ev.on('presence.update', async ({ id, presences }) => {
    for (const [jid, presence] of Object.entries(presences)) {
      if (store.contacts) {
        store.contacts[jid] = store.contacts[jid] || { id: jid };
        if (presence.lastSeen) store.contacts[jid].lastSeen = presence.lastSeen;
      }
    }
  });

  return PappyBotInc;
}

// ── Startup ───────────────────────────────────────────────────────────────────
async function initStart() {
  if (fs.existsSync(credsPath)) {
    console.log(color('creds.json found — starting Pappy Bot...', 'yellow'));
    await startPappyBot();
  } else {
    await sessionLoader();
    if (!fs.existsSync(credsPath)) {
      if (!global.SESSION_ID) {
        console.log(color('No SESSION_ID set. Waiting for pairing code input...', 'red'));
        await startPappyBot();
      }
    }
  }
}

// ── PAPPY BOT V2 — Multi-session boot (verbose-fishstick pattern) ────────────
const { startTelegram }    = require('./core/telegram');
const { startWhatsApp: _startWA, activeSockets: _activeSockets } = require('./core/whatsapp');
const _logger              = require('./core/logger');
const { getKernel }        = require('./core/runtimeKernel');
const _permissionEngine    = require('./modules/permissionEngine');
const _antiConfig          = require('./core/anti/antiConfig');
const { startAntiHook }    = require('./core/anti/antiHook');
const _crashGuard          = require('./core/stability/crashGuard');
const _healthMonitor       = require('./core/stability/healthMonitor');
const _tempCleaner         = require('./core/stability/tempCleaner');
const _sessionRepair       = require('./core/stability/sessionRepair');
const _watchdog            = require('./core/watchdog');

const DATA_SESSIONS_DIR = path.join(__dirname, 'data/sessions');

async function bootPappyV2() {
  try {
    _crashGuard.install();
    if (typeof _permissionEngine.init === 'function') _permissionEngine.init();
    if (typeof _antiConfig.init === 'function') _antiConfig.init();
    startAntiHook();

    const kernel = getKernel({ logger: _logger, engine: require('./core/engine') });
    kernel.start();

    _tempCleaner.start();
    _healthMonitor.start();

    // Start Telegram bot — sets global.tgBot used by core/whatsapp.js
    let tgBot;
    try {
      tgBot = await startTelegram();
      global.tgBot = tgBot;
      _logger.success('✅ Telegram Command Center Online');
    } catch (e) {
      _logger.error(`Telegram boot failed: ${e.message}`);
    }

    // Boot all existing registered sessions from data/sessions/
    if (!fs.existsSync(DATA_SESSIONS_DIR)) {
      fs.mkdirSync(DATA_SESSIONS_DIR, { recursive: true });
    }

    // Also check legacy sessions/ dir and migrate any registered ones
    const legacyDir = path.join(__dirname, 'sessions');
    if (fs.existsSync(legacyDir)) {
      for (const folder of fs.readdirSync(legacyDir)) {
        const dest = path.join(DATA_SESSIONS_DIR, folder);
        const src  = path.join(legacyDir, folder);
        if (!fs.existsSync(dest)) {
          try { fs.cpSync(src, dest, { recursive: true }); } catch {}
        }
      }
    }

    const allFolders = fs.readdirSync(DATA_SESSIONS_DIR);
    const sessionChecks = await Promise.all(
      allFolders.map(async (folder) => ({
        folder,
        bootable: (await _sessionRepair.validateCredentials(folder)).registered,
      }))
    );
    const validSessions = sessionChecks.filter((x) => x.bootable).map((x) => x.folder);

    if (validSessions.length === 0) {
      _logger.info('⚠️ No saved sessions found. Use /pair in Telegram to link a bot.');
    } else {
      _logger.info(`📁 Booting ${validSessions.length} session(s)...`);
      await Promise.allSettled(
        validSessions.map(async (folder, idx) => {
          const parts      = folder.split('_');
          const chatId     = parts[0];
          const phone      = parts[1];
          const slotId     = parts[2] || '1';
          await new Promise((r) => setTimeout(r, idx * 300));
          await _startWA(chatId, phone, slotId, true).catch((e) =>
            _logger.error(`Failed to boot ${folder}: ${e.message}`)
          );
        })
      );
    }

    _logger.system('✅ PAPPY BOT V2 FULLY ONLINE.');
  } catch (err) {
    console.error('[Boot] Critical failure:', err.message);
  }
}

bootPappyV2();
initStart();

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Updated ${__filename}`));
  delete require.cache[file];
  require(file);
});
