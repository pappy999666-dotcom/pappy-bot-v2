// ══════════════════════════════════════════════════════════════════════════ //
//                        PAPPY-BOT-V2  SETTINGS                            //
//           Renovated from PAPPY-BOT-V2 · @crysnovax/baileys v2.6.9        //
// ══════════════════════════════════════════════════════════════════════════ //

const fs = require('fs');
const chalk = require('chalk');

// ── Owner / Social ──────────────────────────────────────────────────────────
global.ytname    = process.env.YT_NAME       || 'YT: Pappy Bot';
global.socialm   = process.env.GITHUB_USERNAME || 'GitHub: pappy-bot-v2';
global.location  = process.env.LOCATION       || 'Pappy HQ';

// ── Session & Bot Identity ──────────────────────────────────────────────────
global.SESSION_ID  = process.env.SESSION_ID  || '';
global.botname     = process.env.BOT_NAME    || 'PAPPY-BOT-V2';
global.ownernumber = [process.env.OWNER_NUMBER || '923184070915'];
global.ownername   = process.env.OWNER_NAME   || 'Pappy Owner';

// ── Links ────────────────────────────────────────────────────────────────────
global.websitex = process.env.WEBSITE_URL        || 'https://github.com/pappy-bot-v2';
global.wagc     = process.env.WHATSAPP_CHANNEL   || 'https://whatsapp.com/channel/0029VbCSVL9HLHQgReyVeE39';

// ── Theme & Branding ─────────────────────────────────────────────────────────
global.themeemoji = process.env.THEME_EMOJI || '🐾';
global.wm         = process.env.WATERMARK   || 'Pappy Bot Inc.';
global.botscript  = process.env.SCRIPT_LINK || 'https://github.com/pappy-bot-v2';
global.packname   = process.env.PACK_NAME   || 'PAPPY BOT';
global.author     = process.env.AUTHOR_NAME || 'MADE BY PAPPY BOT V2';
global.creator    = (process.env.OWNER_NUMBER || '923184070915') + '@s.whatsapp.net';

// ── Behaviour ────────────────────────────────────────────────────────────────
global.xprefix          = process.env.XPREFIX                || '.';
global.premium          = [process.env.PREMIUM_NUMBER        || '923184070915'];
global.typemenu         = process.env.MENU_TYPE              || 'v2';
global.typereply        = process.env.REPLY_TYPE             || 'v4';
global.autoblocknumber  = process.env.AUTOBLOCK_COUNTRYCODE  || '212';
global.antiforeignnumber= process.env.ANTIFOREIGN_COUNTRYCODE|| '91';
global.antidelete       = process.env.ANTI_DELETE            || 'true';

global.listv = ['•','●','■','✿','▲','➩','➢','➣','➤','✦','✧','△','❀','○','□','♤','♡','◇','♧','々','〆'];

global.tempatDB = process.env.DB_FILE || 'database.json';

global.limit = {
  free:    parseInt(process.env.FREE_LIMIT    || 100),
  premium: parseInt(process.env.PREMIUM_LIMIT || 999),
  vip:     process.env.VIP_LIMIT || 'VIP',
};

global.uang = {
  free:    parseInt(process.env.FREE_UANG    || 10000),
  premium: parseInt(process.env.PREMIUM_UANG || 1000000),
  vip:     parseInt(process.env.VIP_UANG     || 10000000),
};

global.mess = {
  error: process.env.ERROR_MESSAGE || 'Error!',
  nsfw:  process.env.NSFW_MESSAGE  || 'NSFW is disabled in this group.',
  done:  process.env.DONE_MESSAGE  || 'Done ✅',
};

global.bot = { limit: 0, uang: 0 };

global.game = {
  suit:       {},
  menfes:     {},
  tictactoe:  {},
  kuismath:   {},
  tebakbom:   {},
};

// ── Hot-reload this file in dev ───────────────────────────────────────────────
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Updated ${__filename}`));
  delete require.cache[file];
  require(file);
});
