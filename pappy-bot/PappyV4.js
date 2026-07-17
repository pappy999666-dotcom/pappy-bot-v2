
// ╔══════════════════════════════════════════════════════════════════════════╗
// ║                        PAPPY  BOT  V2                                  ║
// ║              Multi-Device WhatsApp Automation Engine                   ║
// ║                  @crysnovax/baileys v2.6.9 · 850 cmds                 ║
// ╚══════════════════════════════════════════════════════════════════════════╝
/**
 * PAPPY-BOT-V2
 *
 * @project_name  PAPPY-BOT-V2
 * @version       4.0
 * @description   Multi-functional WhatsApp bot — 850 commands, 24 categories.
 * @author        pappy999666-dotcom
 * @telegram      t.me/pappylung
 * @github        github.com/pappy999666-dotcom
 * @channel       https://whatsapp.com/channel/0029VbCSVL9HLHQgReyVeE39
 * @copyright     © 2024-2026 PAPPY-BOT-V2
 */


// Error handling — use pino-quiet logger, not raw console.error
process.setMaxListeners(500);
//---------------------------------------------------------------------------------------------------------------------------//

//MODULE EXPOERTS AND REQUIREMENTS 
require('./settings');
require('./lib/fetch');
const fs = require('fs');
const os = require('os');
const util = require('util');
const jimp = require('jimp');
const path = require('path');
const fse = require('fs-extra');
const axios = require('axios');
const chalk = require('chalk');
const yts = require('yt-search');
const cron = require('node-cron');
const cheerio = require('cheerio');
const request = require('request');
const fetch = require('node-fetch');
const FileType = require('file-type');
const webp = require('node-webpmux');
const ffmpeg = require('fluent-ffmpeg');
const speed = require('performance-now');
const { performance } = require('perf_hooks');
const moment = require('moment-timezone');
const { exec, spawn, execSync } = require('child_process');
const googleTTS = require('google-tts-api');
const PDFDocument = require("pdfkit");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const fsx = require('fs-extra');
const scp2 = require('./lib/scraper2');
const { fetchChapterPages, searchManga } = require('./lib/mangadl');
const { uploadMedia, handleMediaUpload } = require('./lib/catbox'); 
const jsobfus = require('javascript-obfuscator');
const {translate} = require('@vitalets/google-translate-api');
const { randomBytes } = require('crypto')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, getBinaryNodeChildren, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, downloadContentFromMessage, metaTyping, replayPlanning, buildReasoningSteps, buildSearchSteps, prepareRichResponseMessage, createWelcomeFlow } = require('@crysnovax/baileys');
//---------------------------------------------------------------------------------------------------------------------------//

//Alert Function
let ntnsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
let bad = JSON.parse(fs.readFileSync('./src/badword.json'))
//---------------------------------------------------------------------------------------------------------------------------//

//media
const VoiceNotePappy = JSON.parse(fs.readFileSync('./PappyMedia/database/pappyvn.json'));
const StickerPappy = JSON.parse(fs.readFileSync('./PappyMedia/database/pappysticker.json'));
const ImagePappy = JSON.parse(fs.readFileSync('./PappyMedia/database/pappyimage.json'));
const VideoPappy = JSON.parse(fs.readFileSync('./PappyMedia/database/pappyvideo.json'));
const DocPappy = JSON.parse(fs.readFileSync('./PappyMedia/database/doc.json'));
const ZipPappy = JSON.parse(fs.readFileSync('./PappyMedia/database/zip.json'));
const ApkPappy = JSON.parse(fs.readFileSync('./PappyMedia/database/apk.json'));
//---------------------------------------------------------------------------------------------------------------------------//


//Permission Check Function
const prem = require('./src/premium');
const owner = JSON.parse(fs.readFileSync('./src/owner.json'));
//---------------------------------------------------------------------------------------------------------------------------//


//Uploader & Converter Function
const { TelegraPh, UploadFileUgu } = require('./lib/uploader');
const uploadImage = require('./lib/uploadImage');
const {
    toAudio,
    toPTT,
    toVideo,
    addExifAvatar,
    makeid,
  Telesticker,
  formatBytes,
  formatDuration
} = require('./lib/converter');
const { 
addResponList, 
delResponList, 
isAlreadyResponList, 
isAlreadyResponListGroup, 
sendResponList, 
updateResponList, 
getDataResponList 
} = require('./lib/list');
//---------------------------------------------------------------------------------------------------------------------------//


//Modules Function
const { xvideosSearch, xvideosdl, xnxxdl, xnxxSearch} = require('./lib/scraper3.js');
const { imageToWebp, videoToWebp, writeExif, writeExifImg, writeExifVid } = require('./lib/exif');
const { chatGpt, tiktokDl, ytMp4, ytMp3 } = require('./lib/screaper');
const { gameSlot, gameCasinoSolo, gameMerampok, gameTangkapOr, daily, transferLimit, transferUang, buy, setLimit, setUang } = require('./lib/game');
const { pinterest, wallpaper, wikimedia, quotesAnime, happymod, umma, ringtone, jadwalsholat, styletext } = require('./lib/scraper');
const { formatp, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, webApi, parseMention, generateProfilePicture, getRandom, getGroupAdmins, readFileTxt, readFileJson, getHashedPassword, generateAuthToken, generateToken, batasiTeks, randomText, isEmoji, getAllHTML, fetchBuffer, GIFBufferToVideoBuffer } = require('./lib/function');
//---------------------------------------------------------------------------------------------------------------------------//

// ── pappy-groupstatus plugin ──────────────────────────────────────────────────
let _gsPlugin;
try { _gsPlugin = require('./plugins/pappy-groupstatus'); } catch {}

// Read Database
let vote = db.others.vote = []
const pappyverifieduser = JSON.parse(fs.readFileSync('./src/user.json'));
const premium = JSON.parse(fs.readFileSync('./database/premium.json'));
//---------------------------------------------------------------------------------------------------------------------------//

// Read JSON
//store database
const db_respon_list = JSON.parse(fs.readFileSync('./src/store/list.json'))

global.db = JSON.parse(fs.readFileSync('./database/database.json'))
if (global.db) global.db = {
sticker: {},
			users: {},
			groups: {},
			database: {},
			 settings: {},
			others: {},
...(global.db || {})
}

module.exports = PappyBotInc = async (PappyBotInc, m, chatUpdate, store) => {
	try {
		const {
            type
        } = m
        const botNumber = await PappyBotInc.decodeJid(PappyBotInc.user.id)
        const PappyTheCreator = isOwner = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const body = (m.type === 'conversation') ? m.message.conversation : (m.type == 'imageMessage') ? m.message.imageMessage.caption : (m.type == 'videoMessage') ? m.message.videoMessage.caption : (m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.type === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
		const budy = (typeof m.text == 'string' ? m.text : '')
		const prefix = /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(body) ? body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi)[0] : '.'
		const isCmd = body.startsWith(prefix)
		//prefix 2
        const pric = /^#.¦|\\^/.test(body) ? body.match(/^#.¦|\\^/gi) : xprefix
        const pappyybody = body.startsWith(pric)
        const isCommand = pappyybody ? body.replace(pric, '').trim().split(/ +/).shift().toLowerCase() : ""
		const args = body.trim().split(/ +/).slice(1)
		const getQuoted = (m.quoted || m)
		const quoted = (getQuoted.type == 'buttonsMessage') ? getQuoted[Object.keys(getQuoted)[1]] : (getQuoted.type == 'templateMessage') ? getQuoted.hydratedTemplate[Object.keys(getQuoted.hydratedTemplate)[1]] : (getQuoted.type == 'product') ? getQuoted[Object.keys(getQuoted)[0]] : m.quoted ? m.quoted : m
		const command = PappyTheCreator ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : ''
		const text = q = args.join(' ')
		const mime = (quoted.msg || quoted).mimetype || ''
		const qmsg = (quoted.msg || quoted)
		const sender = m.sender
		const isUser = pappyverifieduser.includes(sender)
		const groupMetadata = m.isGroup ? await PappyBotInc.groupMetadata(m.chat).catch(e => {}) : ''
		const participants = m.isGroup ? await groupMetadata.participants : ''
		if (m.isGroup) {
			m.metadata = await PappyBotInc.groupMetadata(m.chat)
			m.admins = (m.metadata.participants.reduce((a, b) => (b.admin ? a.push({ id: b.id, admin: b.admin }) : [...a]) && a, []))
			m.isAdmin = m.admins.some((b) => b.id === m.sender)
			m.participant = m.key.participant
			m.isBotAdmin = !!m.admins.find((member) => member.id === botNumber)
		}
//---------------------------------------------------------------------------------------------------------------------------//


 // Function to check for emojis, excluding numbers
const containsEmoji = (text) => {
  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F]/gu; // Exclude regular Unicode numbers
  return emojiRegex.test(text);
};
//---------------------------------------------------------------------------------------------------------------------------//


// Function to clean the message content, removing timestamps and keeping numbers
const cleanMessage = (messageText) => {
  // Remove timestamps like "Wed, 01 Jan 2024 00:00:00 GMT" but keep other numbers
  messageText = messageText.replace(/\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+\w{3}\s+\d{1,2}\s+\d{4}\s+\d{2}:\d{2}:\d{2}\s+GMT[^\s]+\s\(.+\)\b/gi, ''); 
  
  return messageText.trim(); // Trim any extra spaces
};
//---------------------------------------------------------------------------------------------------------------------------//


// Access the text message content based on its type
let messageText = '';
if (m.message && m.message.conversation) {
  // For simple text messages
  messageText = m.message.conversation;
} else if (m.message && m.message.extendedTextMessage && m.message.extendedTextMessage.text) {
  // For extended text messages
  messageText = m.message.extendedTextMessage.text;
}
//---------------------------------------------------------------------------------------------------------------------------//


// Clean the message to extract only the relevant text
messageText = cleanMessage(messageText);

// Check if the cleaned message contains emojis
const isEmoji = containsEmoji(messageText);


//  logic for detecting message types
const isMedia = /image|video|sticker|audio/.test(mime);
const isImage = (type == 'imageMessage');
const isVideo = (type == 'videoMessage');
const isAudio = (type == 'audioMessage');
const isViewOnce = (type === 'viewOnceMessage' || type === 'viewOnceMessageV2' || type === 'viewOnceMessageV2Extension');
const isDocument = (type == 'documentMessage');
const isLocation = (type == 'locationMessage');
const isContact = (type == 'contactMessage');
const isSticker = (type == 'stickerMessage');
const isText = (type == 'textMessage');
//---------------------------------------------------------------------------------------------------------------------------//


// Quoted message types
const isQuotedText = type === 'extendedTextMessage';
const isQuotedImage = type === 'extendedTextMessage';
const isQuotedLocation = type === 'extendedTextMessage';
const isQuotedVideo = type === 'extendedTextMessage';
const isQuotedSticker = type === 'extendedTextMessage';
const isQuotedAudio = type === 'extendedTextMessage';
const isQuotedContact = type === 'extendedTextMessage';
const isQuotedDocument = type === 'extendedTextMessage';
//---------------------------------------------------------------------------------------------------------------------------//


        //bug
        const clientId = PappyBotInc.user.id.split(':')[0];
        const senderbot = m.key.fromMe ? PappyBotInc.user.id.split(':')[0] + "@s.whatsapp.net" || PappyBotInc.user.id : m.key.participant || m.key.remoteJid;
        const senderId = senderbot.split('@')[0];
        const isBot = clientId.includes(senderId);
		
		try {
		const isNumber = x => typeof x === 'number' && !isNaN(x)
		const isBoolean = x => typeof x === 'boolean' && Boolean(x)
		let user = global.db.users[m.sender]
		let limitUser = user ? (user.vip ? global.limit.vip : prem.checkPremiumUser(m.sender, premium) ? global.limit.premium : global.limit.free) : prem.checkPremiumUser(m.sender, premium) ? global.limit.premium : global.limit.free
		let uangUser = user ? (user.vip ? global.uang.vip : prem.checkPremiumUser(m.sender, premium) ? global.uang.premium : global.uang.free) : prem.checkPremiumUser(m.sender, premium) ? global.uang.premium : global.uang.free
		if (typeof user !== 'object') global.db.users[m.sender] = {}
		if (user) {
			if (!('vip' in user)) user.afkReason = false
			if (!isNumber(user.afkTime)) user.afkTime = -1
			if (!('afkReason' in user)) user.afkReason = ''
			if (!isNumber(user.limit)) user.limit = limitUser
			if (!('uang' in user)) user.uang = uangUser
			if (!('lastclaim' in user)) user.lastclaim = new Date * 1
			if (!('lastrampok' in user)) user.lastrampok = new Date * 1
		} else {
			global.db.users[m.sender] = {
				vip: false,
				afkTime: -1,
				afkReason: '',
				limit: limitUser,
				uang: uangUser,
				lastclaim: new Date * 1,
				lastrampok: new Date * 1,
			}
		}
//---------------------------------------------------------------------------------------------------------------------------//


    //database values
			let group = global.db.groups[m.chat]
			if (typeof group !== 'object') global.db.groups[m.chat] = {}
			if (group) {
				if (!('ntnsfw' in group)) group.ntnsfw = false
				          if (!('welcome' in group)) group.welcome = false
                  if (!('setinfo' in group)) group.setinfo = false
				          if (!('badword' in group)) group.badword = false
                  if (!('antiforeignnum' in group)) group.antiforeignnum = false
                  if (!('antibot' in group)) group.antibot = false
                  if (!('antiviewonce' in group)) group.antiviewonce = false
                  if (!('antispam' in group)) group.antispam = false
                  if (!('antimedia' in group)) group.media = false
                  if (!('antivirtex' in group)) group.antivirtex = false
                  if (!('antiimage' in group)) group.antiimage = false
                  if (!('antivideo' in group)) group.video = false
                  if (!('antiaudio' in group)) group.antiaudio = false
                  if (!('antipoll' in group)) group.antipoll = false
                  if (!('antisticker' in group)) group.antisticker = false
                  if (!('anticontact' in group)) group.anticontact = false
                  if (!('antilocation' in group)) group.antilocation = false
                  if (!('antidocument' in group)) group.antidocument = false
                  if (!('antilink' in group)) group.antilink = false
                  if (!('antipromotion' in group)) group.antipromotion = false
                  if (!('antidelete' in group)) group.antidelete = false
                  if (!('antiemoji' in group)) group.antiemoji = false 
			} else {
				global.db.groups[m.chat] = {
				  ntsfw: false,
				  welcome: false,
				  setinfo: false,
				  badword: false,
                  antiforeignnum: false,
                  antibot: false,
                  antiviewonce: false,
                  antispam: false,
                  antivirtex: false,
                  antimedia: false,
                  antiimage: false,
                  antivideo: false,
                  antiaudio: false,
                  antipoll: false,
                  antisticker: false,
                  antilocation: false,
                  antidocument: false,
                  anticontact: false,
                  antilink: false,
                  antipromotion: false,
                  antidelete: false,
                  antiemoji: false,
				}
			}
		    let setting = global.db.settings[botNumber]
            if (typeof setting !== 'object') global.db.settings[botNumber] = {}
            if (setting) {
            	if (!('anticall' in setting)) setting.anticall = false
               if (!('antiswview' in setting)) setting.antiswview = false
               if (!('totalhit' in setting)) setting.totalhit = 0
               if (!('totalError' in setting)) setting.totalError = 0
               if (!('online' in setting)) setting.online = false 
               if (!('autosticker' in setting)) setting.autosticker = false 
               if (!('autodownload' in setting)) setting.autodownload = false 
               if (!('autobio' in setting)) setting.autobio = false 
               if (!('autoread' in setting)) setting.autoread = false
               if (!('autorecordtype' in setting)) setting.autorecordtype = false
               if (!('autorecord' in setting)) setting.autorecord = false
               if (!('autotype' in setting)) setting.autotype = false
               if (!('autoblocknum' in setting)) setting.autoblocknum = false
               if (!('onlyindia' in setting)) setting.onlyindia = false
               if (!('onlyindo' in setting)) setting.onlyindo = false
               if (!('onlygrub' in setting)) setting.onlygrub = false
               if (!('onlypc' in setting)) setting.onlypc = false
            } else global.db.settings[botNumber] = {
               anticall: false,
           	antiswview: false,
               totalhit: 0,
               totalError: 0,
               online: false,
               autosticker: false,
               autodownload: false,
               autobio: false,
               autoread: false,
               autoblocknum: false,
               onlyindia: false,
               onlyindo: false,
               onlygrub: false,
               onlypc: false,
               autorecordtype: false,
               autorecord: false,
               autotype: false,               
            }
	} catch (e) {
		throw e;
	}
		
		const isVip = global.db.users[m.sender] ? global.db.users[m.sender].vip : false
		const isPremium = PappyTheCreator || prem.checkPremiumUser(m.sender, premium) || false
		const AntiNsfw = m.isGroup ? global.db.groups[m.chat].ntnsfw : false
		
		function pickRandom(list) {
			return list[Math.floor(list.length * Math.random())]
		}
//---------------------------------------------------------------------------------------------------------------------------//


		// Reset Limit
		cron.schedule('00 00 * * *', () => {
			let user = Object.keys(global.db.users)
			for (let jid of user) {
				const limitUser = global.db.users[jid].vip ? global.limit.vip : prem.checkPremiumUser(jid, premium) ? global.limit.premium : global.limit.free
				global.db.users[jid].limit = limitUser
				console.log('Limit Reseted')
			}
		}, {
			scheduled: true,
			timezone: 'Asia/Karachi'
		})
		
		if (!PappyBotInc.public) {
			if (!m.key.fromMe) return
		}
//---------------------------------------------------------------------------------------------------------------------------//


		//Log
		if (m.message) {
			console.log(chalk.black.bgWhite('[ MESSAGE ]:'),chalk.black.bgGreen(new Date), chalk.black.bgHex('#00EAD3')(budy || m.type) + '\n' + chalk.black(chalk.bgCyanBright('[ FROM ] :'),chalk.bgYellow(m.pushName),chalk.bgHex('#FF449F')(m.sender),chalk.bgBlue('(' + (m.isGroup ? m.pushName : 'Private Chat', m.chat) + ')')));
		}
//---------------------------------------------------------------------------------------------------------------------------//

        
        
// 🚫 Group Only 🚫
               if (!m.isGroup && !PappyTheCreator && db.settings[botNumber].onlygrub) { 
                   if (isCommand) { 
                       return replygcpappy(`👋 *Hello, buddy!* 🌟\n\n📢 *Group Use Only!* 🛑\n\n⚠️ To avoid spam, this bot is only available in group chats.\n\n🛠️ *Need help?* Contact the owner here: wa.me/${ownernumber}`); 
                   } 
               } 

// 🔒 Private Chat Only 🔒
               if (!PappyTheCreator && db.settings[botNumber].onlypc && m.isGroup) { 
                   if (isCommand) { 
                       return replygcpappy(`👋 *Hey there!* 🌟\n\n💬 *Private Chat Required!* 🚫\n\n⛔ To use this bot, please chat with it in a private chat.\n\nIf you have any issues, don't hesitate to reach out!`); 
                   } 
               } 

		
		// Auto Read
		if (db.settings[botNumber].autoread) {
            PappyBotInc.readMessages([m.key]);
        }
        
        // 🔄 Auto Set Bio 🔄
	if (db.settings[botNumber].autobio) {
            PappyBotInc.updateProfileStatus(`🚀 ${botname} is Live! 🎉\n\n           🕒 𝙐𝙥𝙩𝙞𝙢𝙚: 𝘙𝘶𝘯𝘯𝘪𝘯𝘨 𝘍𝘰𝘳 ${runtime(process.uptime())} ⏳\n\n                               ©PAPPY BOT INC ⛩️`).catch(_ => _);
        }

        //auto type
        if (db.settings[botNumber].autotype){
        if (m.message) {
        	let pappypos = ['composing']
            PappyBotInc.sendPresenceUpdate(pappypos, m.chat)
        }
        }
        
        //auto type record
        if (db.settings[botNumber].autorecordtype){
        if (m.message) {
            let pappymix = ['composing', 'recording']
            pappymix2 = pappymix[Math.floor(pappymix.length * Math.random())]
            PappyBotInc.sendPresenceUpdate(pappymix2, m.chat)
        }
        }
        
        //autorecord
        if (db.settings[botNumber].autorecord){
        if (m.message) {
        	let pappypos = ['recording']
            PappyBotInc.sendPresenceUpdate(pappypos, m.chat)
        }
        }
        
        //unavailable
        if (db.settings[botNumber].online) {
        	if (isCmd) {
        	PappyBotInc.sendPresenceUpdate('unavailable', m.chat)
        }
        }
        
        // 🚫 Auto Block Number 🚫
        if (m.sender.startsWith(`${autoblocknumber}`) && db.settings[botNumber].autoblocknum === true) {
            return PappyBotInc.updateBlockStatus(m.sender, 'block');
        }

        if (!m.sender.startsWith('91') && db.settings[botNumber].onlyindia === true) {
            return PappyBotInc.updateBlockStatus(m.sender, 'block');
        }

        if (!m.sender.startsWith('62') && db.settings[botNumber].onlyindo === true) {
            return PappyBotInc.updateBlockStatus(m.sender, 'block');
        } 
        
        if (m.isGroup && !m.sender.startsWith(`${antiforeignnumber}`) && db.groups[m.chat]?.antiforeignnum === true) { 
            if (PappyTheCreator || m.isAdmin || !m.isBotAdmin) return;
            PappyBotInc.sendMessage(m.chat, { text: `🚫 *Sorry buddy!* 😔\n\nYou will be removed because the group admin/owner has enabled *Anti Foreign Number*. Only +${antiforeignnumber} country code is allowed to join the group.` }, {quoted: m});
            await sleep(2000);
            await PappyBotInc.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        }

//---------------------------------------------------------------------------------------------------------------------------//


      //Special type of message  
        async function sendMessageWithChannel(PappyBotInc, m, imagePath, footerText, messageText) {
          try {
            // Prepare the message content with the image and footer
            let msgs = generateWAMessageFromContent(m.chat, {
              viewOnceMessage: {
                message: {
                  "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: messageText
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                      text: footerText
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                      hasMediaAttachment: false,
                      ...await prepareWAMessageMedia({ image: fs.readFileSync(imagePath) }, { upload: PappyBotInc.waUploadToServer })
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                      buttons: [{}],
                    }),
                    contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363232303807350@newsletter' /* update to new channel JID when known */,
                  newsletterName: 'Pappy Bot V2',
                  serverMessageId: 143
                }
                    }       

                  })
                }
              }
            }, { quoted: m });
        
            // Send the message via the client
            await PappyBotInc.relayMessage(m.chat, msgs.message, {});
          } catch (error) {
            console.error('Error sending message with footer:', error);
          }
        }
        
        
        async function sendMessageWithFooter(PappyBotInc, m, imagePath, footerText, messageText) {
          try {
            // Prepare the message content with the image and footer
            let msgs = generateWAMessageFromContent(m.chat, {
              viewOnceMessage: {
                message: {
                  "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: messageText
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                      text: footerText
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                      hasMediaAttachment: false,
                      ...await prepareWAMessageMedia({ image: fs.readFileSync(imagePath) }, { upload: PappyBotInc.waUploadToServer })
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                      buttons: [{}],
                    }),
                    contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                    }       

                  })
                }
              }
            }, { quoted: m });
        
            
            
            // Send the message via the client
            await PappyBotInc.relayMessage(m.chat, msgs.message, {});
          } catch (error) {
            console.error('Error sending message with footer:', error);
          }
        }
        
//---------------------------------------------------------------------------------------------------------------------------//
        
       // 📥 Download Status #ctto
        try {
            const textLower = m.text.toLowerCase();
            if (textLower === 'download' || textLower === 'statusdown' || textLower === 'take' || textLower === 'send') {
                const quotedMessage = m.msg.contextInfo.quotedMessage;
                if (quotedMessage) {
                    if (quotedMessage.imageMessage) {
                        let imageCaption = quotedMessage.imageMessage.caption;
                        let imageUrl = await PappyBotInc.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
                        PappyBotInc.sendMessage(m.chat, { image: { url: imageUrl }, caption: imageCaption });
                        replygcpappy('*🖼️ Stealing & Downloading status...*'); 
                    }
                    if (quotedMessage.videoMessage) {
                        let videoCaption = quotedMessage.videoMessage.caption;
                        let videoUrl = await PappyBotInc.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
                        PappyBotInc.sendMessage(m.chat, { video: { url: videoUrl }, caption: videoCaption });
                        replygcpappy('*🎥 Stealing & Downloading status...*');
                    }
                }
            }
        } catch (error) {
            console.error("⚠️ Error in 'send message' handling:", error);
        }

//---------------------------------------------------------------------------------------------------------------------------//

        //autosticker
        if (db.settings[botNumber].autosticker) {
        	if (m.key.fromMe) return
            if (/image/.test(mime) && !/webp/.test(mime)) {
                let mediac = await quoted.download()
                PappyBotInc.sendImageAsSticker(m.chat, mediac, m, { packname: global.packname, author: global.author })
                console.log(`Auto sticker detected`)
            } else if (/video/.test(mime)) {
                if ((quoted.msg || quoted).seconds > 11) return
                let mediac = await quoted.download()
                PappyBotInc.sendVideoAsSticker(m.chat, mediac, m, { packname: global.packname, author: global.author })
            }
        }
        
        // 🚫 Anti-Bot Protection 🚫
        if (m.isGroup && db.groups[m.chat]?.antibot) {
            if (m.isBaileys && m.fromMe == false) {
                if (m.isAdmin || !m.m.isBotAdmin) {
                    // Admin or Bot Admin, do nothing
                } else {
                    replygcpappy(`*🤖 Another Bot Detected!*\n\n🔒 *Husshhh!* Get away from this group!!!`);
                    return await PappyBotInc.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                }
            }
        }

   
// 🚫 Anti-View Once 🚫
    if (m.isGroup && db.groups[m.chat]?.antiviewonce && (isViewOnce)) {
        if (PappyTheCreator || m.isAdmin || !m.isBotAdmin) {
            // Admin or Bot Admin, do nothing
        } else {
            replygcpappy(`\`\`\`「 📸 View Once Detected 」\`\`\`\n\n⚠️ *Sorry,* but I have to delete it because the admin/owner has activated *Anti-View Once* for this group.`);
            return PappyBotInc.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }});
        }
    }


// 🚫 Anti-Emoji 🚫
if (m.isGroup && db.groups[m.chat]?.antiemoji && (isEmoji)) {
    if (PappyTheCreator || m.isAdmin || !m.isBotAdmin) {
        // Admins or bot creators are allowed to send emojis
    } else {
        replygcpappy(`\`\`\`「 🚫 Emoji Detected 」\`\`\`\n\n⚠️ *Sorry,* but I have to delete it because the admin/owner has activated *Anti-Emoji* for this group.`);
        return PappyBotInc.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }});
    }
}

    
// 🚫 Anti-Promotion 🚫
if (m.isGroup && db.groups[m.chat]?.antipromotion) {
    if (budy.match(`instagram booster|tiktok booster|ml booster|bgmi selling|selling uc|selling diamonds|selling coin|selling id|selling account|selling ids|buy account|sell account|buy id|sell id|instagram followers|tiktok followers|buy panel|sell panel|sell bug bot|buy bug bot|buy bot bug|sell bot bug|adminpanel5kpm|open jasa push member grup|yangmaubuypanelpm|admin panel 10k pm|Hanya menyediakan Jasa Push Member Grup|admin panel 5k pm|yang mau beli panel murah pm|list harga panel by|list harga vps|LIST HARGA VPS|OPEN JASA PUSH MEMBER GRUP|READY|Redy|LIST HARGA PANEL BY|list harga panel|menyediakan|MENYEDIAKAN|OPEN MURBUG|open|OPEN|PANEL READY|PANEL|PANNEL READY|panel|panel ready|pannel ready minat pm|mau panel pm|MAU PANNEL PM|Admin panel ready|ADMIN PANEL READY|Chat aja om ready selalu|OPEN JASA INSTALL|open jasa installMENYEDIAKAN JASA INSTALL`)) {
        if (!m.isBotAdmin) return;
        if (PappyTheCreator) return;
        if (m.isAdmin) return;

        // Delete the promotional message
        await PappyBotInc.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: m.key.participant
            }
        });

        // Notify the user
        PappyBotInc.sendMessage(m.chat, {
            text: `\`\`\`「 🚫 Promotion Detected 」\`\`\`\n\n⚠️ @${m.sender.split("@")[0]} has sent a promotion message and it has been successfully deleted.`,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: m });
    }
}

// 🚫 Respond to Bad Words 🚫
if (m.isGroup && db.groups[m.chat]?.badword) {
    for (let bak of bad) {
        if (budy === bak) {
            // Delete the message with the bad word
            await PappyBotInc.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            });

            // Notify the user about the bad word usage
            PappyBotInc.sendMessage(m.chat, {
                text: `\`\`\`「 🚫 Bad Word Detected 」\`\`\`\n\n⚠️ @${m.sender.split("@")[0]} was using harsh words, and their chat has been deleted.`,
                contextInfo: { mentionedJid: [m.sender] }
            }, { quoted: m });
        }
    }
}

// 🦠 ANTI VIRUS 🦠
if (m.isGroup && db.groups[m.chat].antivirtex) {
    if (
        budy.includes('๒๒๒๒') || 
        budy.includes('ดุ') || 
        budy.includes('ผิดุท้เึางืผิดุท้เึางื') || 
        budy.includes('๑๑๑๑๑๑๑๑๑๑') || 
        budy.includes('৭৭৭৭৭৭৭৭') || 
        budy.includes('   ⃢   ⃢   ⃢  ') || 
        budy.includes('*⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃟ᡃ⃟ᡃ⃟ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃟ᡃ⃟ᡃ⃟ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟') || 
        budy.includes('ผดิทุเ้ึางผืดิทุเ้') || 
        budy.includes('.*࡞ࣰࣰࣰࣲࣲࣲࣲࣩࣩࣩࣩࣶࣶ࣯࣯࣮࣮ࣦ࣯ࣨࣨࣨࣻࣻࣻࣼࣼࣼࣽࣽࣾࣷࣵࣴ࣬࣬࣬ࣤࣤࣧࣧ*') || 
        budy.includes('᥋') || 
        budy.includes('؁') || 
        budy.includes('ٯٯٯٯٯ') 
    ) {
        if (m.isBotAdmin) return replygcpappy('*⚠️ VIRTEX DETECTED*');
        
        console.log(color('[KICK]', 'red'), color('Received a virus text!', 'yellow'));
        
        PappyBotInc.sendText(m.chat, `*📩 MARK AS READ*\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n *Virus sender here👇:* \nwa.me/${sender.split("@")[0]}`);

        if (!m.m.isBotAdmin) return;
        if (PappyTheCreator) return;

        PappyBotInc.groupParticipantsUpdate(m.chat, [sender], 'remove');
        await PappyBotInc.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }});

        PappyBotInc.sendMessage(`${ownernumber}@s.whatsapp.net`, {
            text: `👋 Hi Owner! wa.me/${sender.split("@")[0]} Detected Having Sent Virtex ${isGroup ? `in ${groupName}` : ''}`
        });
    }
}
    
  // 🚫 ANTI MEDIA 🚫
if (m.isGroup && db.groups[m.chat]?.antimedia && isMedia) {
    if (PappyTheCreator || m.isAdmin || !m.isBotAdmin) {		  
        // Admins or bot creators are allowed to send media
    } else {
        replygcpappy(`\`\`\`「 📸 Media Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-media for this group.`);
        return PappyBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

     // 🚫 ANTI MEDIA CHECKS 🚫

// 📸 Anti-image
if (m.isGroup && db.groups[m.chat]?.antiimage && isImage) {
    if (!PappyTheCreator && !m.isAdmin && m.isBotAdmin) {
        replygcpappy(`\`\`\`「 🖼️ Image Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-image for this group.`);
        return PappyBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

// 🎥 Anti-video
if (m.isGroup && db.groups[m.chat]?.antivideo && isVideo) {
    if (!PappyTheCreator && !m.isAdmin && m.isBotAdmin) {
        replygcpappy(`\`\`\`「 🎬 Video Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-video for this group.`);
        return PappyBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

// 🏷️ Anti-sticker
if (m.isGroup && db.groups[m.chat]?.antisticker && isSticker) {
    if (!PappyTheCreator && !m.isAdmin && m.isBotAdmin) {
        replygcpappy(`\`\`\`「 🏷️ Sticker Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-sticker for this group.`);
        return PappyBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

// 🎵 Anti-audio
if (m.isGroup && db.groups[m.chat]?.antiaudio && isAudio) {
    if (!PappyTheCreator && !m.isAdmin && m.isBotAdmin) {
        replygcpappy(`\`\`\`「 🎧 Audio Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-audio for this group.`);
        return PappyBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

// 📊 Anti-poll
if (m.isGroup && db.groups[m.chat]?.antipoll && type === "pollCreationMessage") {
    if (!PappyTheCreator && !m.isAdmin && m.isBotAdmin) {
        replygcpappy(`\`\`\`「 📊 Poll Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-poll for this group.`);
        return PappyBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

// 📍 Anti-location
if (m.isGroup && db.groups[m.chat]?.antilocation && isLocation) {
    if (!PappyTheCreator && !m.isAdmin && m.isBotAdmin) {
        replygcpappy(`\`\`\`「 📍 Location Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-location for this group.`);
        return PappyBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

// 📄 Anti-document
if (m.isGroup && db.groups[m.chat]?.antidocument && isDocument) {
    if (!PappyTheCreator && !m.isAdmin && m.isBotAdmin) {
        replygcpappy(`\`\`\`「 📄 Document Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-document for this group.`);
        return PappyBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

// 📞 Anti-contact
if (m.isGroup && db.groups[m.chat]?.anticontact && isContact) {
    if (!PappyTheCreator && !m.isAdmin && m.isBotAdmin) {
        replygcpappy(`\`\`\`「 📞 Contact Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-contact for this group.`);
        return PappyBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

// 🔗 Anti-link
if (m.isGroup && db.groups[m.chat]?.antilink) {
    if (budy.match('http') && budy.match('https')) {
        const bvl = `\`\`\`「 🔗 Link Detected 」\`\`\`\n\nAdmin has sent a link, admin is free to send any link😇`;
        if (m.isAdmin || m.key.fromMe || PappyTheCreator) return replygcpappy(bvl);
        await PappyBotInc.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: m.key.participant
            }
        });
        PappyBotInc.sendMessage(m.chat, {
            text: `\`\`\`「 🔗 Link Detected 」\`\`\`\n\n@${m.sender.split("@")[0]} has sent a link and successfully deleted.`,
            contextInfo: { mentionedJid: [m.sender] },
            quoted: m
        });
    }
}
 
//---------------------------------------------------------------------------------------------------------------------------//

        
// auto download #ctto
// Auto-download feature
if (db.settings[botNumber].autodownload && !m.key.fromMe) {
  try {
    // Check if the message contains an Instagram link
    if (budy.match(`instagram.com`)) {
      await PappyBotInc.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } });

      // Updated Instagram API
      let anu = await fetchJson(`https://bk9.fun/download/instagram2?url=${encodeURIComponent(budy)}`);
      if (anu.status) {
        // Extract the first video or image from the response
        let videoUrl = anu.BK9[0]?.url || "No video found";
        let thumbnail = anu.BK9[0]?.thumbnail;

        // Send the video
        await PappyBotInc.sendMessage(m.chat, {
          video: { url: videoUrl },
          caption: `Auto Download ✅`,
          thumbnail: { url: thumbnail },
        }, { quoted: m });
      } else {
        await PappyBotInc.sendMessage(m.chat, { text: "Failed to fetch Instagram video." }, { quoted: m });
      }
      await PappyBotInc.sendMessage(m.chat, { react: { text: "☑️", key: m.key } });

    // Check for TikTok links
    } else if (budy.match(`tiktok.com`)) {
      await PappyBotInc.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } });

      let anu = await fetchJson(`https://bk9.fun/download/tiktok?url=${encodeURIComponent(budy)}`);
      if (anu.status) {
        await PappyBotInc.sendMessage(m.chat, {
          video: { url: anu.BK9.BK9 },
          caption: `Auto Download ✅`
        }, { quoted: m });
      } else {
        await PappyBotInc.sendMessage(m.chat, { text: "Failed to fetch TikTok video." }, { quoted: m });
      }
      await PappyBotInc.sendMessage(m.chat, { react: { text: "☑️", key: m.key } });

    // Check for Facebook links
    } else if (budy.match(`facebook.com`)) {
      await PappyBotInc.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } });

      let anu = await fetchJson(`https://bk9.fun/download/fb?url=${encodeURIComponent(budy)}`);
      if (anu.status) {
        await PappyBotInc.sendMessage(m.chat, {
          video: { url: anu.BK9.hd },
          caption: `Auto Download ✅`
        }, { quoted: m });
      } else {
        await PappyBotInc.sendMessage(m.chat, { text: "Failed to fetch Facebook video." }, { quoted: m });
      }
      await PappyBotInc.sendMessage(m.chat, { react: { text: "☑️", key: m.key } });

    // Check for YouTube links
    } else if (budy.match(`youtube.com|youtu.be`)) {
      await PappyBotInc.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } });

      let anu = await fetchJson(`https://bk9.fun/download/youtube2?url=${encodeURIComponent(budy)}`);
      if (anu.status) {
        await PappyBotInc.sendMessage(m.chat, {
          video: { url: anu.BK9.BK9 },
          caption: `Auto Download ✅`
        }, { quoted: m });
      } else {
        await PappyBotInc.sendMessage(m.chat, { text: "Failed to fetch YouTube video." }, { quoted: m });
      }
      await PappyBotInc.sendMessage(m.chat, { react: { text: "☑️", key: m.key } });
    }
  } catch (err) {
    console.error(err);
    await PappyBotInc.sendMessage(m.chat, { react: { text: "✖️", key: m.key } });
  }
}

//---------------------------------------------------------------------------------------------------------------------------//

// Group Settings
		if (m.isGroup) {
			// Mute
			if (m.isGroup && db.groups[m.chat]?.mute && !PappyTheCreator) {
				return
			}

      
			// Anti Delete
			if (m.type == 'protocolMessage' && db.groups[m.chat]?.antidelete) {
				const mess = chatUpdate.messages[0].message.protocolMessage
				if (store.messages && store.messages[m.chat] && store.messages[m.chat].array) {
					const chats = store.messages[m.chat].array.find(a => a.id === mess.key.id);
					chats.msg.contextInfo = { mentionedJid: [chats.key.participant], isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: '*Anti Delete❗*'}, ...chats.key }
					await PappyBotInc.relayMessage(m.chat, { [chats.type]: chats.msg }, {})
				}
			}
		}

//---------------------------------------------------------------------------------------------------------------------------//


		//user db //friend
        if (isCmd && !isUser) {
pappyverifieduser.push(sender)
fs.writeFileSync('./src/user.json', JSON.stringify(pappyverifieduser, null, 2))
}
	
//---------------------------------------------------------------------------------------------------------------------------//



//All games featres here

		// Check Expiry
		prem.expiredCheck(PappyBotInc, premium);
		
		// TicTacToe
let room = Object.values(game.tictactoe).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING');
if (room) {
    let ok;
    let isWin = false;
    let isTie = false;
    let isSurrender = false;

    if (!/^([1-9]|(me)?giveup|surr?ender|off|skip)$/i.test(m.text)) return;

    isSurrender = !/^[1-9]$/.test(m.text);
    if (m.sender !== room.game.currentTurn) {
        if (!isSurrender) return true;
    }

    if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
        replygcpappy({
            '-3': '🚫 The game is over',
            '-2': '❌ Invalid',
            '-1': '⚠️ Invalid Position',
            0: '⚠️ Invalid Position',
        }[ok]);
        return true;
    }

    if (m.sender === room.game.winner) isWin = true;
    else if (room.game.board === 511) isTie = true;

    let arr = room.game.render().map(v => {
        return {
            X: '❌',
            O: '⭕',
            1: '1️⃣',
            2: '2️⃣',
            3: '3️⃣',
            4: '4️⃣',
            5: '5️⃣',
            6: '6️⃣',
            7: '7️⃣',
            8: '8️⃣',
            9: '9️⃣',
        }[v];
    });

    if (isSurrender) {
        room.game._currentTurn = m.sender === room.game.playerX;
        isWin = true;
    }

    let winner = isSurrender ? room.game.currentTurn : room.game.winner;
    if (isWin) {
        global.db.users[m.sender].limit += 3;
        global.db.users[m.sender].uang += 3000;
    }

    let str = `🏆 *Room ID:* ${room.id}\n\n${arr.slice(0, 3).join('')}\n${arr.slice(3, 6).join('')}\n${arr.slice(6).join('')}\n\n${isWin ? `🎉 @${winner.split('@')[0]} *Wins!*` : isTie ? `💔 *Game Over*` : `🔄 *Turn* ${['❌', '⭕'][1 * room.game._currentTurn]} (@${room.game.currentTurn.split('@')[0]})`}\n❌: @${room.game.playerX.split('@')[0]}\n⭕: @${room.game.playerO.split('@')[0]}\n\n📝 *Type* *surrender* to give up and admit defeat`;

    if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat) {
        room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat;
    }

    if (room.x !== room.o) await PappyBotInc.sendMessage(room.x, { text: str, mentions: parseMention(str) }, { quoted: m });
    await PappyBotInc.sendMessage(room.o, { text: str, mentions: parseMention(str) }, { quoted: m });

    if (isTie || isWin) {
        delete game.tictactoe[room.id];
    }
}

// Suit PvP
let roof = Object.values(game.suit).find(roof => roof.id && roof.status && [roof.p, roof.p2].includes(m.sender));
if (roof) {
    let win = '';
    let tie = false;

    if (m.sender == roof.p2 && /^(acc(ept)?|accept|yes|okay?|reject|no|later|nop(e.)?yes|y)/i.test(m.text) && m.isGroup && roof.status == 'wait') {
        if (/^(reject|no|later|n|nop(e.)?yes)/i.test(m.text)) {
            replygcpappy(`🔴 @${roof.p2.split`@`[0]} *rejected the suit*,\n❌ *suit cancelled*`);
            delete game.suit[roof.id];
            return true;
        }
        roof.status = 'play';
        roof.asal = m.chat;
        clearTimeout(roof.waktu);
        replygcpappy(`🎊 The suit has been sent to chat\n\n👤 @${roof.p.split`@`[0]} and @${roof.p2.split`@`[0]}\n\n✏️ *Please select a suit in the respective chat* https://wa.me/${botNumber.split`@`[0]}`);
        
        if (!roof.pilih) PappyBotInc.sendMessage(roof.p, { text: `🔄 *Please select* \n\n🪨 Rock\n📄 Paper\n✂️ Scissors` }, { quoted: m });
        if (!roof.pilih2) PappyBotInc.sendMessage(roof.p2, { text: `🔄 *Please select* \n\n🪨 Rock\n📄 Paper\n✂️ Scissors` }, { quoted: m });
        
        roof.waktu_milih = setTimeout(() => {
            if (!roof.pilih && !roof.pilih2) replygcpappy(`🚫 Both players have no intention of playing,\n❌ *Suit cancelled*`);
            else if (!roof.pilih || !roof.pilih2) {
                win = !roof.pilih ? roof.p2 : roof.p;
                replygcpappy(`❌ @${(roof.pilih ? roof.p2 : roof.p).split`@`[0]} didn't choose a suit, the game ends`);
            }
            delete game.suit[roof.id];
            return true;
        }, roof.timeout);
    }

    let jwb = m.sender == roof.p;
    let jwb2 = m.sender == roof.p2;
    let g = /scissors/i;
    let b = /rock/i;
    let k = /paper/i;
    let reg = /^(scissors|rock|paper)/i;

    if (jwb && reg.test(m.text) && !roof.pilih && !m.isGroup) {
        roof.pilih = reg.exec(m.text.toLowerCase())[0];
        roof.text = m.text;
        replygcpappy(`✅ You have chosen *${m.text}* ${!roof.pilih2 ? `\n⏳ Waiting for the opponent to choose` : ''}`);
        if (!roof.pilih2) PappyBotInc.sendMessage(roof.p2, { text: '_The opponent has already chosen_\n⚠️ *Now it is your turn*' });
    }

    if (jwb2 && reg.test(m.text) && !roof.pilih2 && !m.isGroup) {
        roof.pilih2 = reg.exec(m.text.toLowerCase())[0];
        roof.text2 = m.text;
        replygcpappy(`✅ You have chosen *${m.text}* ${!roof.pilih ? `\n⏳ Waiting for the opponent to choose` : ''}`);
        if (!roof.pilih) PappyBotInc.sendMessage(roof.p, { text: '_The opponent has already chosen_\n⚠️ *Now it is your turn*' });
    }

    let stage = roof.pilih;
    let stage2 = roof.pilih2;

    if (roof.pilih && roof.pilih2) {
        clearTimeout(roof.waktu_milih);
        
        if (b.test(stage) && g.test(stage2)) win = roof.p;
        else if (b.test(stage) && k.test(stage2)) win = roof.p2;
        else if (g.test(stage) && k.test(stage2)) win = roof.p;
        else if (g.test(stage) && b.test(stage2)) win = roof.p2;
        else if (k.test(stage) && b.test(stage2)) win = roof.p;
        else if (k.test(stage) && g.test(stage2)) win = roof.p2;
        else if (stage == stage2) tie = true;

        global.db.users[roof.p == win ? roof.p : roof.p2].limit += tie ? 0 : 3;
        global.db.users[roof.p == win ? roof.p : roof.p2].uang += tie ? 0 : 3000;

        PappyBotInc.sendMessage(roof.asal, { text: `🏆 *Suit Results* ${tie ? '\n🔄 *SERIES*' : ''}\n\n👤 @${roof.p.split`@`[0]} (${roof.text}) ${tie ? '' : roof.p == win ? `🥇 *Win* \n` : `❌ *Lost* \n`}\n👤 @${roof.p2.split`@`[0]} (${roof.text2}) ${tie ? '' : roof.p2 == win ? `🥇 *Win* \n` : `❌ *Lost* \n`}\n\n💰 *Winner Gets*\n*Present:* Money (3000) & Limit (3)`.trim(), mentions: [roof.p, roof.p2] }, { quoted: m });

        delete game.suit[roof.id];
    }
}

        // Guess Bomb
		let pilih = '🌀', bomb = '💣';
		if (m.sender in game.tebakbom) {
			if (!/^[1-9]|10$/i.test(body) && !isCmd) return !0;
			if (game.tebakbom[m.sender].petak[parseInt(body) - 1] === 1) return !0;
			if (game.tebakbom[m.sender].petak[parseInt(body) - 1] === 2) {
				game.tebakbom[m.sender].board[parseInt(body) - 1] = bomb;
				game.tebakbom[m.sender].pick++;
				PappyBotInc.sendMessage(m.chat, {react: {text: '❌', key: m.key}})
				game.tebakbom[m.sender].bomb--;
				game.tebakbom[m.sender].nyawa.pop();
				let brd = game.tebakbom[m.sender].board;
				if (game.tebakbom[m.sender].nyawa.length < 1) {
					global.db.users[m.sender].limit -= 1
					await replygcpappy(`*THE GAME IS OVER*\nYou were hit by a bomb\n\n ${brd.join('')}\n\n*Selected :* ${game.tebakbom[m.sender].pick}\n_Limit Reduction : 1_`);
					PappyBotInc.sendMessage(m.chat, {react: {text: '😂', key: m.key}})
					delete game.tebakbom[m.sender];
				} else await replygcpappy(`*SELECT A NUMBER*\n\nYou were hit by a bomb\n ${brd.join('')}\n\nSelected: ${game.tebakbom[m.sender].pick}\nRemaining life: ${game.tebakbom[m.sender].nyawa}`);
				return !0;
			}
			if (game.tebakbom[m.sender].petak[parseInt(body) - 1] === 0) {
				game.tebakbom[m.sender].petak[parseInt(body) - 1] = 1;
				game.tebakbom[m.sender].board[parseInt(body) - 1] = pilih;
				game.tebakbom[m.sender].pick++;
				game.tebakbom[m.sender].lolos--;
				let brd = game.tebakbom[m.sender].board;
				if (game.tebakbom[m.sender].lolos < 1) {
					global.db.users[m.sender].limit += 3
					global.db.users[m.sender].uang += 3000
					await replygcpappy(`*YOU ARE GREAT ಠ⁠ᴥ⁠ಠ*\n\n${brd.join('')}\n\n*Selected :* ${game.tebakbom[m.sender].pick}\n*Remaining life :* ${game.tebakbom[m.sender].nyawa}\n*Bomb :* ${game.tebakbom[m.sender].bomb}\n*Present :* Money(3000) & Limit(3)`);
					delete game.tebakbom[m.sender];
				} else replygcpappy(`*SELECT A NUMBER*\n\n${brd.join('')}\n\nSelected : ${game.tebakbom[m.sender].pick}\nRemaining life : ${game.tebakbom[m.sender].nyawa}\nBomb : ${game.tebakbom[m.sender].bomb}`)
			}
		}
		
		// Math
		if (game.kuismath.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
			kuis = true
			jawaban = game.kuismath[m.sender.split('@')[0]].jawaban
			const difficultyMap = { 'noob': 1, 'easy': 2, 'medium': 3, 'hard': 4, 'extreme': 5, 'impossible': 6, 'impossible2': 7 };
			let hasilLimit = difficultyMap[game.kuismath[m.sender.split('@')[0]].mode]
			if (isNaN(budy)) return
			if (budy.toLowerCase() == jawaban) {
				global.db.users[m.sender].limit += hasilLimit
				global.db.users[m.sender].uang += hasilLimit * 1000
				await replygcpappy(`🎮 Math Quiz  🎮\n\nCorrect answer 🎉\nYou Get a Limit *${hasilLimit}*\n\nWant to play again? Send ${prefix}math mode`)
				delete game.kuismath[m.sender.split('@')[0]]
			} else replygcpappy('*Wrong answer!*')
		}
		
		// Menfes
		if (!m.isGroup) {
			if (game.menfes[m.sender] && m.key.remoteJid !== 'status@broadcast') {
				if (!/^del(menfe(s|ss)|confe(s|ss))$/i.test(command)) {
					m.msg.contextInfo = { isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: `*Order From ${game.menfes[m.sender].nama ? game.menfes[m.sender].nama : 'Somebody'}*`}, key: { remoteJid: '0@s.whatsapp.net', fromMe: false, participant: '0@s.whatsapp.net' }}
					const pesan = m.type === 'conversation' ? { extendedTextMessage: { text: m.msg, contextInfo: { isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: `*Order From ${game.menfes[m.sender].nama ? game.menfes[m.sender].nama : 'Somebody'}*`}, key: { remoteJid: '0@s.whatsapp.net', fromMe: false, participant: '0@s.whatsapp.net' }}}} : { [m.type]: m.msg }
					await PappyBotInc.relayMessage(game.menfes[m.sender].tujuan, pesan, {});
				}
			}
		}



//game features end here    
//---------------------------------------------------------------------------------------------------------------------------//




//reply features
		// AFK
let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
for (let jid of mentionUser) {
    let user = global.db.users[jid];
    if (!user) continue;
    let afkTime = user.afkTime;
    if (!afkTime || afkTime < 0) continue;
    let reason = user.afkReason || '';
    replygcpappy(`🚫 *Don't tag him!*\n🕒 He's AFK ${reason ? 'with reason: *' + reason + '*' : '*with no reason*'}\n⏳ During: *${clockString(new Date - afkTime)}*`.trim());
}
if (global.db.users[m.sender].afkTime > -1) {
    let user = global.db.users[m.sender];
    replygcpappy(`✅ @${m.sender.split('@')[0]} *berhenti AFK*${user.afkReason ? ' *after* ' + user.afkReason : ''}\n⏳ During: *${clockString(new Date - user.afkTime)}*`);
    user.afkTime = -1;
    user.afkReason = '';
}



		//reply
        async function replygcpappy(teks) {
            if (typereply === 'v1') {
               m.reply(teks)

            } else if (typereply === 'v2') {
                PappyBotInc.sendMessage(m.chat, {
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            title: botname,
                            body: ownername,
                            previewType: "PHOTO",
                            thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
                            sourceUrl: wagc
                        }
                    },
                    text: teks
                }, {
                    quoted: m
                });

            } else if (typereply === 'v3') {
               PappyBotInc.sendMessage(m.chat, {
                  text: teks,
                  contextInfo: {
                     externalAdReply: {
                        showAdAttribution: true,
                        title: botname,
                        body: ownername,
                        thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
                        sourceUrl: websitex,
                        mediaType: 1,
                        renderLargerThumbnail: true
                     }
                  }
               }, { quoted: m })

            } else if (typereply === 'v4') {
                replygcpappy2(teks)
            }
        }

        
//fake reply with channel link embedded
async function replygcpappy2(txt) {
const pappynewrep = {      
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterName: 'Pappy Bot V2',
newsletterJid: "120363232303807350@newsletter",
},
externalAdReply: {  
showAdAttribution: true,
title: botname,
body: ownername,
thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
sourceUrl: websitex
},
},
text: txt,
}
return PappyBotInc.sendMessage(m.chat, pappynewrep, {
quoted: m,
})
}

//---------------------------------------------------------------------------------------------------------------------------//

//premium
        async function replyprem(teks) {
    replygcpappy(`🚨 *This feature is for premium users only!*\n💬 *Contact the owner* to become a premium user!`);
}


//script replier
        async function sendPappyBotIncMessage(chatId, message, options = {}){
    let generate = await generateWAMessage(chatId, message, options)
    let type2 = getContentType(generate.message)
    if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo
    if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo
    return await PappyBotInc.relayMessage(chatId, generate.message, { messageId: generate.key.id })
}
//---------------------------------------------------------------------------------------------------------------------------//


//theme sticker reply
        const PappyStickWait = () => {
        let PappyStikRep = fs.readFileSync('./PappyMedia/theme/sticker_reply/wait.webp')
        PappyBotInc.sendMessage(m.chat, { sticker: PappyStikRep }, { quoted: m })
        }
        const PappyStickAdmin = () => {
        let PappyStikRep = fs.readFileSync('./PappyMedia/theme/sticker_reply/admin.webp')
        PappyBotInc.sendMessage(m.chat, { sticker: PappyStikRep }, { quoted: m })
        }
        const PappyStickBotAdmin = () => {
        let PappyStikRep = fs.readFileSync('./PappyMedia/theme/sticker_reply/botadmin.webp')
        PappyBotInc.sendMessage(m.chat, { sticker: PappyStikRep }, { quoted: m })
        }
        const PappyStickOwner = () => {
        let PappyStikRep = fs.readFileSync('./PappyMedia/theme/sticker_reply/owner.webp')
        PappyBotInc.sendMessage(m.chat, { sticker: PappyStikRep }, { quoted: m })
        }
        const PappyStickGroup = () => {
        let PappyStikRep = fs.readFileSync('./PappyMedia/theme/sticker_reply/group.webp')
        PappyBotInc.sendMessage(m.chat, { sticker: PappyStikRep }, { quoted: m })
        }
        const PappyStickPrivate = () => {
        let PappyStikRep = fs.readFileSync('./PappyMedia/theme/sticker_reply/private.webp')
        PappyBotInc.sendMessage(m.chat, { sticker: PappyStikRep }, { quoted: m })
        }
  
//theme sticker reply end here        
//---------------------------------------------------------------------------------------------------------------------------//


//time
const xday = moment.tz('Asia/Karachi').locale('en-IN').format('dddd');
const xdate = moment.tz('Asia/Karachi').locale('en-IN').format('DD/MM/YYYY');
const xtime = moment().tz('Asia/Karachi').locale('en-IN').format('HH:mm:ss');
const time2 = moment().tz('Asia/Karachi').format('HH:mm:ss')  
if(time2 < "23:59:00"){
var pappyytimewisher = `Good Night 🌌`
 }
 if(time2 < "19:00:00"){
var pappyytimewisher = `Good Evening 🌃`
 }
 if(time2 < "18:00:00"){
var pappyytimewisher = `Good Evening 🌃`
 }
 if(time2 < "15:00:00"){
var pappyytimewisher = `Good Afternoon 🌅`
 }
 if(time2 < "11:00:00"){
var pappyytimewisher = `Good Morning 🌄`
 }
 if(time2 < "05:00:00"){
var pappyytimewisher = `Good Morning 🌄`
 } 

//---------------------------------------------------------------------------------------------------------------------------//

//theme txt
let setv = pickRandom(global.listv)

//autoreply
for (let BhosdikaPappy of VoiceNotePappy) {
if (budy === BhosdikaPappy) {
let audiobuffy = fs.readFileSync(`./PappyMedia/audio/${BhosdikaPappy}.mp3`)
PappyBotInc.sendMessage(m.chat, { audio: audiobuffy, mimetype: 'audio/mp4', ptt: true }, { quoted: m })     
}
}
for (let BhosdikaPappy of StickerPappy){
if (budy === BhosdikaPappy){
let stickerbuffy = fs.readFileSync(`./PappyMedia/sticker/${BhosdikaPappy}.webp`)
PappyBotInc.sendMessage(m.chat, { sticker: stickerbuffy }, { quoted: m })
}
}
for (let BhosdikaPappy of ImagePappy){
if (budy === BhosdikaPappy){
let imagebuffy = fs.readFileSync(`./PappyMedia/image/${BhosdikaPappy}.jpg`)
PappyBotInc.sendMessage(m.chat, { image: imagebuffy }, { quoted: m })
}
}
for (let BhosdikaPappy of VideoPappy){
if (budy === BhosdikaPappy){
let videobuffy = fs.readFileSync(`./PappyMedia/video/${BhosdikaPappy}.mp4`)
PappyBotInc.sendMessage(m.chat, { video: videobuffy }, { quoted: m })
}
}

//reply features end here
//---------------------------------------------------------------------------------------------------------------------------//



//send features
const sendapk = (teks) => {
PappyBotInc.sendMessage(m.chat, { document: teks, mimetype: 'application/vnd.android.package-archive'}, {quoted:m})
}
for (let BhosdikaPappy of ApkPappy) {
if (budy === BhosdikaPappy) {
let buffer = fs.readFileSync(`./PappyMedia/apk/${BhosdikaPappy}.apk`)
sendapk(buffer)
}
}

const sendzip = (teks) => {
PappyBotInc.sendMessage(m.chat, { document: teks, mimetype: 'application/zip'}, {quoted:m})
}
for (let BhosdikaPappy of ZipPappy) {
if (budy === BhosdikaPappy) {
let buffer = fs.readFileSync(`./PappyMedia/zip/${BhosdikaPappy}.zip`)
sendzip(buffer)
}
}

const senddocu = (teks) => {
PappyBotInc.sendMessage(m.chat, { document: teks, mimetype: 'application/pdf'}, {quoted:m})
}
for (let BhosdikaPappy of DocPappy) {
if (budy === BhosdikaPappy) {
let buffer = fs.readFileSync(`./PappyMedia/doc/${BhosdikaPappy}.pdf`)
senddocu(buffer)
}
}



async function obfus(query) {
    return new Promise((resolve, reject) => {
        try {
        const obfuscationResult = jsobfus.obfuscate(query,
        {
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            numbersToExpressions: true,
            simplify: true,
            stringArrayShuffle: true,
            splitStrings: true,
            stringArrayThreshold: 1
        }
        )
        const result = {
            status: 200,
            author: `${ownername}`,
            result: obfuscationResult.getObfuscatedCode()
        }
        resolve(result)
    } catch (e) {
        reject(e)
    }
    })
}

//send features end here
//---------------------------------------------------------------------------------------------------------------------------//




// Response Addlist
if (m.isGroup && isAlreadyResponList(m.chat, body.toLowerCase(), db_respon_list)) {
var get_data_respon = getDataResponList(m.chat, body.toLowerCase(), db_respon_list)
if (get_data_respon.isImage === false) {
PappyBotInc.sendMessage(m.chat, { text: sendResponList(m.chat, body.toLowerCase(), db_respon_list) }, {
quoted: m
})
} else {
PappyBotInc.sendMessage(m.chat, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
quoted: m
})
} 
}



// Respon Cmd with media
if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.sticker)) {
let hash = global.db.sticker[m.msg.fileSha256.toString('base64')]
let { text, mentionedJid } = hash
let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
    userJid: PappyBotInc.user.id,
    quoted: m.quoted && m.quoted.fakeObj
})
messages.key.fromMe = areJidsSameUser(m.sender, PappyBotInc.user.id)
messages.key.id = m.key.id
messages.pushName = m.pushName
if (m.isGroup) messages.participant = m.sender
let msg = {
    ...chatUpdate,
    messages: [proto.WebMessageInfo.fromObject(messages)],
    type: 'append'
}
PappyBotInc.ev.emit('messages.upsert', msg)
} 

//---------------------------------------------------------------------------------------------------------------------------//




switch(isCommand) {



//---------------------------------------------------------------------------------------------------------------------------//


//█▀▀ █▀▀ ▄▀▄ █▀█ █▀▀ █▄█   █▀▀ █▀█ █▄ ▄█ █▄ ▄█ ▄▀▄ █▀▄ █▄ █ █▀▀ 
//▄██ ██▄ █▀█ █▀▄ █▄▄ █ █   █▄▄ █▄█ █ ▀ █ █ ▀ █ █▀█ █▄▀ █ ▀█ ▄██ 

case 'google': {
  if (!q) return replygcpappy(`❗ Example : ${prefix + command} ${botname}`);

  await PappyStickWait();
  const axios = require('axios');

  try {
    const searchUrl = `https://aemt.uk.to/googlesearch?query=${encodeURIComponent(text)}`;
    const response = await axios.get(searchUrl);

    if (!response.data.result || response.data.result.length === 0) {
      return replygcpappy(`❌ *No results found for* "${text}".`);
    }

    // P4: Send as interactive listMessage with section rows
    const results = response.data.result.slice(0, 10);
    const rows = results.map((g, i) => ({
      rowId: g.link,
      title: (g.title || `Result ${i + 1}`).substring(0, 60),
      description: (g.description || g.link).substring(0, 72),
    }));

    await PappyBotInc.sendMessage(m.chat, {
      listMessage: {
        title: `🔍 Google: ${text}`,
        description: `Found ${response.data.result.length} results`,
        buttonText: 'Open Results',
        listType: 1,
        sections: [{ title: `Top ${rows.length} Results`, rows }]
      }
    }, { quoted: m });

  } catch (err) {
    console.error('Error fetching Google search results:', err.message);
    return replygcpappy('⚠️ *Error*: Could not fetch results. Please try again later.');
  }
}
break;

case 'weather':{
  if (!text) return replygcpappy('What location?')
  await PappyStickWait()                
              let wdata = await axios.get(
                  `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`
              );
              let textw = "";
              textw += `🌍 *Weather Report for ${text}*\n\n`;
              textw += `🌤️ *Weather:* ${wdata.data.weather[0].main}\n`;
              textw += `🌥️ *Description:* ${wdata.data.weather[0].description}\n`;
              textw += `🌡️ *Avg Temp:* ${wdata.data.main.temp}°C\n`;
              textw += `🤗 *Feels Like:* ${wdata.data.main.feels_like}°C\n`;
              textw += `🌬️ *Pressure:* ${wdata.data.main.pressure} hPa\n`;
              textw += `💧 *Humidity:* ${wdata.data.main.humidity}%\n`;
              textw += `🍃 *Wind Speed:* ${wdata.data.wind.speed} m/s\n`;
              textw += `🗺️ *Latitude:* ${wdata.data.coord.lat}\n`;
              textw += `🗺️ *Longitude:* ${wdata.data.coord.lon}\n`;
              textw += `🏳️ *Country:* ${wdata.data.sys.country}\n`;
              
             PappyBotInc.sendMessage(
                  m.chat, {
                      text: textw,
                  }, {
                      quoted: m,
                  }
             )
             }
             break
        


case 'wikipedia': case 'wiki': {
  if (!text) return await replygcpappy('❗ Enter what you want to search for on Wikipedia');

  try {
      // Fetch Wikipedia page content
      const link = await axios.get(`https://en.wikipedia.org/wiki/${text}`);
      const $ = cheerio.load(link.data);

      // Extract title and summary
      let wik = $('#firstHeading').text().trim();
      let resulw = $('#mw-content-text > div.mw-parser-output').find('p').text().trim();

      // Create a message body with the title and summary
      let message = `▢ *Wikipedia Search Result* 🧐\n\n`;
      message += `‣ *Title*: ${wik} 📚\n\n`;
      message += `${resulw} 📖\n`;

      // Send the response message
      await replygcpappy(message);

  } catch (e) {
      console.error(e);
      await replygcpappy('⚠️ No results found or failed to fetch data. Try again later!');
  }
}
break;


case 'yts': case 'ytsearch': {
  if (!text) return await replygcpappy(`*Example :* ${prefix + command} title`);
await PappyStickWait()
  try {
      let yts = require("yt-search");
      let search = await yts(text);
      let videos = search.all;
      console.log(videos);

      if (!videos || videos.length === 0) {
          return await replygcpappy('❌ No video found');
      }

      // Prepare the combined message for up to 10 videos
      let message = `*Search Results for: ${text}*\n\n`;
      const numVideos = Math.min(videos.length, 10);  // Send up to 10 videos, or fewer if there are less than 10

      for (let i = 0; i < numVideos; i++) {
          const video = videos[i];
          message += `\n📹 *Title:* _${video.title}_\n` +
                     `⏳ *Duration:* _${video.timestamp}_ _(${video.seconds} seconds)_\n` +
                     `🗓️ *Uploaded:* _${video.ago}_\n` +
                     `👀 *Views:* _${video.views.toLocaleString()}_ _views_\n` +
                     `👤 *Author:* _${video.author.name}_\n` +
                     `🔗 *URL:* ${video.url}\n`;
      }

      // Send the combined message with all the details
      await replygcpappy(message);

  } catch (e) {
      console.error(e);
      await replygcpappy('⚠️ Error: Something went wrong while fetching video details.');
  }
}
break;


case 'apksearch': {
  if (!text) return replygcpappy(`Example: ${prefix + command} whatsapp`);
await PappyStickWait()
  try {
    var js = await fetch(`https://dikaardnt.com/api/search/apk?q=${q}`);
    var json = await js.json();

    // Check if the API response status is false (indicating error)
    if (!json.status) {
      // Construct a message to notify the user
      const errorMsg = `
❗ *Error:* ${json.message}

💬 For access, contact the owner:
- *Full Contact:* ${json.owner.fullContact}
- *WhatsApp:* ${json.owner.whatsapp}
- *Telegram:* ${json.owner.telegram}
      `;
      return replygcpappy(errorMsg); // Send error message to the user
    }

    // Proceed with normal processing if API call is successful
    var capt = `
❗ *Note:* Bot will give random results. If the results do not match what you want, please try again using ${prefix + command} ${text}

💼 *Title:* ${json[0].package}
🔗 *Link:* ${json[0].url}
👤 *Developer:* ${json[0].developer}
⭐ *Rating:* ${json[0].rating}
    `;

    if (json[0].thumbnail) {
      const imageUrl = json[0].thumbnail; // Use the thumbnail URL from the API response
      await PappyBotInc.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: capt,
        mentions: [m.sender]
      });
    } else {
      // If no thumbnail is available, just send the message without image
      replygcpappy(capt);
    }

  } catch (error) {
    console.error("Error:", error);
    return replygcpappy(`❗ *Error:* Unable to fetch data at this time. Please try again later.`);
  }
}
break;

case 'happymod':{
  if (!q) return replygcpappy(`Example ${prefix+command} Sufway surfer mod`)
  await PappyStickWait()
  let kat = await scp2.happymod(q)
  replygcpappy(util.format(kat))
  }
  break



case 'stickersearch': {
  if (!text) return replygcpappy(`Example: ${m.prefix + command} kururmi`);
await PappyStickWait()
  var js = await fetch(`https://dikaardnt.com/api/search/sticker?q=${q}`);
  var json = await js.json();

  let response = `
❗ *Note:* Bot will give random results. If the results don't match what you want, please try again using ${prefix + command} ${text}

💼 *Title:* ${json[0].title}
🔗 *Link:* ${json[0].url}
⭐ *Total Results:* ${json[0].total}
  `;

  if (json[0].url) {
    const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png'; // URL for the image to send
    await PappyBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: response,
      mentions: [m.sender]
    });
  } else {
    replygcpappy(`No results found for ${text}. Please try another search.`);
  }
}
break;

case 'searchsoundcloud': {
  if (!text) return replygcpappy(`*• Example:* ${prefix + command} metamorphosis`);

  const fetchSoundCloudResults = async (query) => {
    const apiUrl = `https://bk9.fun/search/soundcloud?q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        console.error(`API response not OK: ${response.status} ${response.statusText}`);
        throw new Error('API response not OK');
      }
      const json = await response.json();
      return json.status && json.BK9 && json.BK9.length > 0 ? json.BK9 : null;
    } catch (error) {
      console.error(`Error fetching from ${apiUrl}:`, error);
    }
    return null;
  };

  try {
    await PappyStickWait();
    const query = text.trim();
    const results = await fetchSoundCloudResults(query);

    if (!results) {
      return replygcpappy('❌ Failed to fetch SoundCloud results. Please try again.');
    }

    let soundCloudText = `🎵 *SoundCloud Results for* _"${query}"_:\n\n`;
    results.forEach((track, index) => {
      soundCloudText += `🔊 *Title:* ${track.title}\n🔗 *Link:* ${track.link}\n\n`;
    });

    // Send the formatted text without generateWAMessageFromContent
    return replygcpappy(soundCloudText);

  } catch (e) {
    return replygcpappy("`*Error*`");
  }
}
break;


case 'imdb':
if (!text) return replygcpappy(`_Name a Series or movie`)
await PappyStickWait()
            let fids = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${text}&plot=full`)
            let imdbt = ""
            console.log(fids.data)
            imdbt += "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n" + " ``` IMDB SEARCH```\n" + "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n"
            imdbt += "🎬Title      : " + fids.data.Title + "\n"
            imdbt += "📅Year       : " + fids.data.Year + "\n"
            imdbt += "⭐Rated      : " + fids.data.Rated + "\n"
            imdbt += "📆Released   : " + fids.data.Released + "\n"
            imdbt += "⏳Runtime    : " + fids.data.Runtime + "\n"
            imdbt += "🌀Genre      : " + fids.data.Genre + "\n"
            imdbt += "👨🏻‍💻Director   : " + fids.data.Director + "\n"
            imdbt += "✍Writer     : " + fids.data.Writer + "\n"
            imdbt += "👨Actors     : " + fids.data.Actors + "\n"
            imdbt += "📃Plot       : " + fids.data.Plot + "\n"
            imdbt += "🌐Language   : " + fids.data.Language + "\n"
            imdbt += "🌍Country    : " + fids.data.Country + "\n"
            imdbt += "🎖️Awards     : " + fids.data.Awards + "\n"
            imdbt += "📦BoxOffice  : " + fids.data.BoxOffice + "\n"
            imdbt += "🏙️Production : " + fids.data.Production + "\n"
            imdbt += "🌟imdbRating : " + fids.data.imdbRating + "\n"
            imdbt += "✅imdbVotes  : " + fids.data.imdbVotes + ""
           PappyBotInc.sendMessage(m.chat, {
                image: {
                    url: fids.data.Poster,
                },
                caption: imdbt,
            }, {
                quoted: m,
            })
            break
        
      
            case 'wanumber': case 'nowa': case 'searchno': case 'searchnumber': {
              if (!text) return replygcpappy(`📱 Provide Number with last number x\n\nExample: ${prefix + command} 91690913721x`);
            
              var inputnumber = text.split(" ")[0];
              await PappyStickWait();
              replygcpappy(`🔍 Searching for WhatsApp account in the given range...`);
            
              function countInstances(string, word) {
                  return string.split(word).length - 1;
              }
            
              var number0 = inputnumber.split('x')[0];
              var number1 = inputnumber.split('x')[countInstances(inputnumber, 'x')] ? inputnumber.split('x')[countInstances(inputnumber, 'x')] : '';
              var random_length = countInstances(inputnumber, 'x');
              var randomxx;
            
              if (random_length == 1) {
                  randomxx = 10;
              } else if (random_length == 2) {
                  randomxx = 100;
              } else if (random_length == 3) {
                  randomxx = 1000;
              }
            
              var text66 = `*==[ List of WhatsApp Numbers ]==*\n\n`;
              var nobio = `\n*Bio:* || \nHey there! I am using WhatsApp.📲\n`;
              var nowhatsapp = `\n*Numbers with no WhatsApp account within provided range.*❌\n`;
            
              for (let i = 0; i < randomxx; i++) {
                  var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
                  var status1 = nu[Math.floor(Math.random() * nu.length)];
                  var status2 = nu[Math.floor(Math.random() * nu.length)];
                  var status3 = nu[Math.floor(Math.random() * nu.length)];
                  var dom4 = nu[Math.floor(Math.random() * nu.length)];
                  var random21;
            
                  if (random_length == 1) {
                      random21 = `${status1}`;
                  } else if (random_length == 2) {
                      random21 = `${status1}${status2}`;
                  } else if (random_length == 3) {
                      random21 = `${status1}${status2}${status3}`;
                  } else if (random_length == 4) {
                      random21 = `${status1}${status2}${status3}${dom4}`;
                  }
            
                  var anu = await PappyBotInc.onWhatsApp(`${number0}${i}${number1}@s.whatsapp.net`);
                  var anuu = anu.length !== 0 ? anu : false;
            
                  try {
                      try {
                          var anu1 = await PappyBotInc.fetchStatus(anu[0].jid);
                      } catch {
                          var anu1 = '401';
                      }
                      if (anu1 == '401' || anu1.status.length == 0) {
                          nobio += `wa.me/${anu[0].jid.split("@")[0]} 💬\n`;
                      } else {
                          text66 += `🪀 *Number:* wa.me/${anu[0].jid.split("@")[0]}\n 🎗️*Bio:* ${anu1.status}\n🧐*Last update:* ${moment(anu1.setAt).tz('Asia/Karachi').format('HH:mm:ss DD/MM/YYYY')}\n\n`;
                      }
                  } catch {
                      nowhatsapp += `${number0}${i}${number1} ❌\n`;
                  }
              }
            
              replygcpappy(`${text66}${nobio}${nowhatsapp}`);
            }
            break;
            
            case 'friend':
              case 'searchfriend':{
              await PappyStickWait()
              let teman = pickRandom(pappyverifieduser)
              setTimeout(() => {
              }, 1000)
              setTimeout(() => {
              replygcpappy('Managed to Get One Person')
              }, 5000)
              setTimeout(() => {
              PappyBotInc.sendMessage(m.chat, {text: `Here @${teman.split("@")[0]}`, mentions: [teman]}, { quoted : m })
              }, 9000)
              }
              break


              case 'lyrics': {
                if (!text) return replygcpappy(`What lyrics are you looking for? 🎶\nExample usage: ${prefix}lyrics Thunder`);
              
                await PappyStickWait();
                const { lyrics, lyricsv2 } = require('@bochilteam/scraper');
              
                try {
                  const result = await lyricsv2(text).catch(async () => await lyrics(text));
                  const pappylirik = `
              🎵 *Title:* ${result.title}
              🎤 *Author:* ${result.author}
              🔗 *URL:* ${result.link}
              
              📝 *Lyrics:*
              ${result.lyrics}
              `.trim();
              
                  // If there is an image URL in the result, we can send the lyrics with the image
                  if (result.thumbnail) {
                    await PappyBotInc.sendMessage(m.chat, { image: { url: result.thumbnail }, caption: pappylirik }, { quoted: m });
                  } else {
                    replygcpappy(pappylirik);
                  }
                } catch (error) {
                  console.error(error);
                  replygcpappy(`Lyrics for "${text}" not found! 😞`);
                }
              }
              break;



              case 'pixiv': {
    if (!text) return replygcpappy(`Example: ${prefix + command} furina,10`); // Example usage
    
    const [query, limit] = text.split(','); // Split the input by comma
    let numImages = parseInt(limit) || 5; // Default to 5 if no number is provided
    numImages = Math.min(numImages, 30); // Ensure the number does not exceed 30

    try {
        const res = await axios.get(`https://ironman.koyeb.app/ironman/search/pixiv?q=${encodeURIComponent(query)}`);
        if (!res.data || res.data.length === 0) return replygcpappy('Not found!');
        
        const selectedImages = res.data.sort(() => 0.5 - Math.random()).slice(0, numImages); // Get the specified number of images
        for (const url of selectedImages) {
            await PappyBotInc.sendMessage(
                m.chat,
                { 
                    image: { url }, 
                    caption: `🖼️ *Pixiv Search Result for:* "${query}"` 
                },
                { quoted: m }
            );
        }
    } catch (e) {
        console.log(e.message);
        replygcpappy('Not found!');
    }
}
break;
        
              
//---------------------------------------------------------------------------------------------------------------------------//


// █▀▀ █ █ █▄ █  █▀▀ █▀█ █▄ ▄█ █▄ ▄█ ▄▀▄ █▄ █ █▀▄ █▀▀ 
// █▀  █▄█ █ ▀█  █▄▄ █▄█ █ ▀ █ █ ▀ █ █▀█ █ ▀█ █▄▀ ▄██ 


case 'define': {
  if (!q) return replygcpappy(`❓ What would you like to define?`);
   try {
       const targetFine = await axios.get(`http://api.urbandictionary.com/v0/define?term=${q}`);
       if (!targetFine || !targetFine.data.list.length) return replygcpappy('No definition found.');

       const definition = targetFine.data.list[0].definition.replace(/\[|\]/g, "");
       const example = targetFine.data.list[0].example.replace(/\[|\]/g, "");
       const reply = `
📖 *Word:* ${q}
💬 *Definition:* ${definition}
✍️ *Example:* ${example}`;

       // Image URL to use
       const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';


       // Send the message with the image and the reply text
       await PappyBotInc.sendMessage(m.chat, {
           image: { url: imageUrl },
           caption: reply,
           mentions: [m.sender]
       });
   } catch (err) {
       console.error('Error:', err);
       replygcpappy(`*${q}* isn't a valid text.`);
   }
}
break;

case 'readmore': {
	let [l, r] = text.split`|`
    if (!l) l = ''
    if (!r) r = ''
    PappyBotInc.sendMessage(m.chat, {text: l + readmore + r}, {quoted: m})
}
break;


case 'yomamajoke': {
  try {
      // Fetch a yo mama joke from the API
      let res = await fetch(`https://yomamaindra.onrender.com/jokes`);

      if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
      }

      let json = await res.json();

      // Extract the joke from the response
      let yoMamaJoke = `${json.joke}`;

      // Image URL to use
      const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

     
      // Send the message with the image and caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: `*Yo Mama Joke 😂:*\n\n${yoMamaJoke}`,
          footer: 'PAPPY-BOT-V2'
      });
  } catch (error) {
      console.error('API Fetch Error:', error);
      await PappyBotInc.sendText(m.chat, "An error occurred while fetching the joke. Please try again.");
  }
}
break;
      
      
      
  case 'fact': {
  try {
      // Fetch a random fact from the API
      const { data } = await axios.get(`https://nekos.life/api/v2/fact`);
      
      // Define the fact text with the theme emoji
      let factText = `${themeemoji} *Fact:* ${data.fact}\n`;

      // Image URL to use
      const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

    
      // Send the message with the image and caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: factText,
          footer: botname
      });
  } catch (error) {
      console.error('Error fetching fact:', error);
      await PappyBotInc.sendText(m.chat, "An error occurred while fetching the fact. Please try again.");
  }
}
break;


case 'soulmate': {
  if (!m.isGroup) return PappyStickGroup(); // Ensure it's a group
  let member = participants.map(u => u.id);
  let me = m.sender;
  let jodoh = member[Math.floor(Math.random() * member.length)];

  // Image URL to use
  const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

  try {
     
      // Send the message with the image, caption, and mention the users
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: `👫Your Soulmate Is\n\n@${me.split('@')[0]}\n\n❤️\n\n@${jodoh.split('@')[0]}`,
          mentions: [me, jodoh] // Mentions both users
      });
  } catch (error) {
      console.error('Error fetching or sending image:', error);
      replygcpappy('Failed to send image. Please try again later.');
  }
  }            
  break;

      
      
      case 'couple': {
  if (!m.isGroup) return PappyStickGroup(); // Ensure it's a group

  // Get all participants in the group
  let member = participants.map(u => u.id);
  let orang = member[Math.floor(Math.random() * member.length)]; // Random member for one partner
  let jodoh = member[Math.floor(Math.random() * member.length)]; // Random member for the other partner

  // Image URL to use
  const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

  try {
      // Send the message with the image, caption, and mention the users
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: `💏Couple\n\n@${orang.split('@')[0]}\n\n❤️\n\n@${jodoh.split('@')[0]}\n\nCieeee, What's Going On❤️💖👀`,
          mentions: [orang, jodoh] // Mentions both users
      });
  } catch (error) {
      console.error('Error sending message:', error);
      await PappyBotInc.sendMessage(m.chat, { text: 'Failed to send message. Please try again later.' });
  }
  }
  break;



case 'stupidcheck': case 'uncleancheck': 
case 'hotcheck': case 'smartcheck': 
case 'greatcheck': case 'evilcheck': 
case 'dogcheck': case 'coolcheck': 
case 'waifucheck': {
    // Ensure someone is tagged
    if (!m.mentionedJid || m.mentionedJid.length === 0) {
        return replygcpappy(`Please mention someone to check! Example: ${prefix + command} @Pappy`);
    }

    // Generate a random percentage
    const randomScore = Math.floor(Math.random() * 100) + 1;

    // Get the first mentioned user
    let mentionedUser = m.mentionedJid[0];

    // Create the message text
    const messageText = `
*${command.replace('check', ' Check')}* 🌟

👤 Name: *@${mentionedUser.split('@')[0]}*
📊 Score: *${randomScore}%*
`.trim();

    // Image URL to use
    const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

    try {
        // Send the message with the image
        await PappyBotInc.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: messageText,
            mentions: [mentionedUser]
        });
    } catch (error) {
        console.error('Error sending image:', error);
        replygcpappy('Failed to send image. Please try again later.');
    }
}
break;


case 'gaycheck':
case 'awesomecheck':
case 'cutecheck':
case 'lesbicheck':
case 'lesbiancheck':
case 'hornycheck':
case 'prettycheck':
case 'lovelycheck':
case 'uglycheck':
case 'handsomecheck': {
    // Ensure someone is tagged
    if (!m.mentionedJid || m.mentionedJid.length === 0) {
        return replygcpappy(`Please mention someone to check! Example: ${prefix + command} @Pappy`);
    }

    // Generate a random percentage
    const gan = Array.from({ length: 100 }, (_, i) => i + 1);
    const teng = gan[Math.floor(Math.random() * gan.length)];

    // Get the first mentioned user
    let pappyshimts = m.mentionedJid[0];

    // Create the message text
    const messageText = `
*${command.replace('check', ' Check')}* 🌟

👤 Name: *@${pappyshimts.split('@')[0]}*
📊 Score: *${teng}%*
`.trim();

    // Image URL to use (this can be customized)
    const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

    try {
        // Send the message with the image URL
        await PappyBotInc.sendMessage(m.chat, {
            image: { url: imageUrl }, // Directly use the URL for the image
            caption: messageText, // Custom message with check result and mentioned user
            mentions: [pappyshimts] // Mentions the mentioned user
        });
    } catch (error) {
        console.error('Error sending image:', error);
        replygcpappy('Failed to send image. Please try again later.');
    }
}
break;


  
      case 'charactercheck': {
        if (!m.mentionedJid || m.mentionedJid.length === 0) {
            return replygcpappy(`Please tag someone! Example: ${prefix + command} @Pappy`);
        }
    
        const traits = [
            'Compassionate', 
            'Generous', 
            'Grumpy', 
            'Forgiving', 
            'Obedient', 
            'Good', 
            'Simp', 
            'Kind-Hearted', 
            'Patient', 
            'UwU', 
            'Top, anyway', 
            'Helpful'
        ];
        const randomTrait = traits[Math.floor(Math.random() * traits.length)];
    
        const mentionedUser = m.mentionedJid[0];
        const username = mentionedUser.split('@')[0];
    
        const messageText = `
*Character Check* 🕵️‍♂️✨
    
👤 Name: *@${username}*
📜 Trait: *${randomTrait}*
        `.trim();
    
        const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png'; // Replace with your desired image URL
    
        try {
            // Send the message with the image URL
            await PappyBotInc.sendMessage(m.chat, {
                image: { url: imageUrl },
                caption: messageText,
                mentions: [mentionedUser],
            });
        } catch (error) {
            console.error('Error sending image:', error);
            replygcpappy('Failed to send image. Please try again later.');
        }
    }
    break;

  case 'beautifulcheck': {
    // Ensure someone is tagged
    if (!m.mentionedJid || m.mentionedJid.length === 0) {
        return replygcpappy(`Please tag someone! Example: ${prefix + command} @Pappy`);
    }

    // Generate a random percentage
    const percentage = Math.floor(Math.random() * 101); // Random number between 0 and 100

    // Get the first mentioned user
    const mentionedUser = m.mentionedJid[0];
    const username = mentionedUser.split('@')[0];

    // Create the response message
    const messageText = `
*Beautiful Check* 🌸

👤 Name: *@${username}*
📊 Score: *${percentage}%*
    `.trim();

    // Image URL to use (this can be customized)
    const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png'; // Replace with your desired image URL

    try {
        // Send the message with the image and mentions
        await PappyBotInc.sendMessage(m.chat, {
            image: { url: imageUrl }, // Directly use the URL for the image
            caption: messageText, // Custom message with check result and mentioned user
            mentions: [mentionedUser] // Mentions the mentioned user
        });
    } catch (error) {
        console.error('Error sending image:', error);
        replygcpappy('Failed to send image. Please try again later.');
    }
}
break;

case 'pick': {
  // Check if the message is in a group and if there's text provided
  if (!m.isGroup) return PappyStickGroup();
  if (!text) return replygcpappy(`What do you want to pick? 🤔\nExample: ${prefix + command} idiot 😜`);

  // Get group metadata and participants
  const groupMetadata = await PappyBotInc.groupMetadata(m.chat).catch(() => {}) || "";
  const participants = groupMetadata ? groupMetadata.participants : [];
  let member = participants.map((u) => u.id);

  // Get a random member
  let pappyshimts = member[Math.floor(Math.random() * member.length)];

  // Image URL to use
  const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

  try {
     
      // Send the message with the image, text, and mention
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: `The most *${text}* here is *@${pappyshimts.split("@")[0]}* 😜✨`,
          mentions: [pappyshimts] // Ensure that the user is mentioned in the message
      });
  } catch (error) {
      console.error('Error fetching or sending image:', error);
      replygcpappy('Failed to send image. Please try again later.');
  }
}
break;


case 'pickupline': {
  try {
      // Fetch the pickup line from the API
      let res = await fetch(`https://api.popcat.xyz/pickuplines`);
      if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
      }
      
      let json = await res.json();
      let pickupLine = `*Here's a pickup line for you 😘💖:*\n\n${json.pickupline} 😂❤️`;

      // Image URL to use
      const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

     
      // Send the message with the image, caption, and footer
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: pickupLine,
          footer: 'PAPPY-BOT-V2'
      });
  } catch (error) {
      console.error('Error in pickupline command:', error);
      replygcpappy('Failed to fetch a pickup line. Please try again later.');
  }
}
break;


case 'quotes': {
  // Fetch the quote from the API
  const quotepappyy = await axios.get('https://favqs.com/api/qotd');
  const quoteText = quotepappyy.data.quote.body;
  const quoteAuthor = quotepappyy.data.quote.author;

  // Prepare the quote text as a caption
  const textquotes = `💬 *Quote:* ${quoteText}\n\n👤 *Author:* ${quoteAuthor}`;

  // Image URL to use
  const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

  // Send the quote with the image directly from the URL
  await PappyBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: textquotes,
      quoted: m
  });
}
break;



case 'can': {
  if (!text) return replygcpappy(`❓ Ask a question\n\nExample: ${prefix + command} Can I dance?`);

  let bisa = [`✅ Can`, `❌ Can't`, `🚫 Cannot`, `💯 Of Course You Can!!!`];
  let keh = bisa[Math.floor(Math.random() * bisa.length)];

  let jawab = `*Can ${text}*\nAnswer: ${keh} 🤩`;

  // Image URL to use
  const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

  try {
      // Send the message with the image and the answer
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: jawab, // Custom message with the question and answer
          mentions: [m.sender] // Mentions the user who asked
      });
  } catch (error) {
      console.error('Error fetching or sending image:', error);
      replygcpappy('❗ Failed to send image. Please try again later.');
  }
}
break;


case 'is': {
if (!text) return replygcpappy(`❓ Ask a question\n\nExample: ${prefix + command} Is she a virgin?`);

let apa = [`✅ Yes`, `❌ No`, `🤔 It Could Be`, `✔️ That's right`];
let kah = apa[Math.floor(Math.random() * apa.length)];

let jawab = `*Is ${text}*\nAnswer: ${kah} 😎`;

// Image URL to use
const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

try {
    // Send the message with the image and the answer
    await PappyBotInc.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: jawab, // Custom message with the question and answer
        mentions: [m.sender] // Mentions the user who asked
    });
} catch (error) {
    console.error('Error fetching or sending image:', error);
    replygcpappy('❗ Failed to send image. Please try again later.');
}
}
break;

case 'when': {
if (!text) return replygcpappy(`❓ Ask a question\n\nExample: ${prefix + command} will I get married?`);

let kapan = [
    '5 More Days ⏳', '10 More Days ⏳', '15 More Days ⏳', '20 More Days ⏳', '25 More Days ⏳', '30 More Days ⏳',
    '35 More Days ⏳', '40 More Days ⏳', '45 More Days ⏳', '50 More Days ⏳', '55 More Days ⏳', '60 More Days ⏳',
    '65 More Days ⏳', '70 More Days ⏳', '75 More Days ⏳', '80 More Days ⏳', '85 More Days ⏳', '90 More Days ⏳', 
    '100 More Days ⏳', '5 Months More 🗓️', '10 Months More 🗓️', '15 Months More 🗓️', '20 Months More 🗓️', 
    '25 Months More 🗓️', '30 Months More 🗓️', '35 Months More 🗓️', '40 Months More 🗓️', '45 Months More 🗓️', 
    '50 Months More 🗓️', '55 Months More 🗓️', '60 Months More 🗓️', '65 Months More 🗓️', '70 Months More 🗓️', 
    '75 Months More 🗓️', '80 Months More 🗓️', '85 Months More 🗓️', '90 Months More 🗓️', '100 Months More 🗓️', 
    '1 More Year 📅', '2 More Years 📅', '3 More Years 📅', '4 More Years 📅', '5 More Years 📅', 'Tomorrow ⏰', 
    'The Day After Tomorrow ⏰'
];

let koh = kapan[Math.floor(Math.random() * kapan.length)];
let jawab = `*When ${text}*\nAnswer: ${koh} 🤔`;

// Image URL to use
const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

try {
    // Send the message with the image and the answer
    await PappyBotInc.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: jawab, // Custom message with the question and answer
        mentions: [m.sender] // Mentions the user who asked
    });
} catch (error) {
    console.error('Error fetching or sending image:', error);
    replygcpappy('❗ Failed to send image. Please try again later.');
}
}
break;


case 'what': {
if (!text) return replygcpappy(`❓ Ask a question\n\nExample: ${prefix + command} is your name?`);

let lel = [`👩‍❤️‍👨 Ask Your GF`, `🤷‍♂️ I Don’t Know`, `👨‍👩‍👧 I Don’t Know, Ask Your Father`];
let kah = lel[Math.floor(Math.random() * lel.length)];
let jawab = `*What ${text}* ❓\nAnswer: ${kah} 🤔`;

// Image URL to use
const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

try {
    await PappyBotInc.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: jawab,
        mentions: [m.sender]
    });
} catch (error) {
    console.error('Error fetching or sending image:', error);
    replygcpappy('❗ Failed to send image. Please try again later.');
}
}
break;

case 'where': {
if (!text) return replygcpappy(`❓ Ask a question\n\nExample: ${prefix + command} is your name?`);

let wherelol = [`🏞️ In the mountain`, `🌕 On Mars`, `🌙 On the moon`, `🌳 In the jungle`, `👩‍👧 I don’t know, ask your mom`, `🤷‍♂️ It could be somewhere`];
let kah = wherelol[Math.floor(Math.random() * wherelol.length)];
let jawab = `*Where ${text}* ❓\nAnswer: ${kah} 🤔`;

// Image URL to use
const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

try {
    await PappyBotInc.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: jawab,
        mentions: [m.sender]
    });
} catch (error) {
    console.error('Error fetching or sending image:', error);
    replygcpappy('❗ Failed to send image. Please try again later.');
}
}
break;

case 'how': {
if (!text) return replygcpappy(`❓ Ask a question\n\nExample: ${prefix + command} to date a girl?`);

let gimana = [`🤔 Ummm...`, `😅 It’s Difficult Bro`, `🚫 Sorry, the bot can’t answer`, `🔍 Try searching on Google`, `😱 Holy cow! Really?`, `😴 I’m too dizzy to answer`, `🙁 Oh, I see :(`, `⏳ Be patient, boss`, `🙄 Really, dude?`];
let kah = gimana[Math.floor(Math.random() * gimana.length)];
let jawab = `*How ${text}* ❓\nAnswer: ${kah} 🤔`;

// Image URL to use
const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

try {
    await PappyBotInc.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: jawab,
        mentions: [m.sender]
    });
} catch (error) {
    console.error('Error fetching or sending image:', error);
    replygcpappy('❗ Failed to send image. Please try again later.');
}
}
break;
    
case 'rate': {
if (!text) return replygcpappy(`❓ Example: ${prefix + command} my profile`);

let ra = Array.from({ length: 100 }, (_, i) => i + 1); // Array of numbers from 1 to 100
let kah = ra[Math.floor(Math.random() * ra.length)];
let jawab = `*Rate ${text}* 💯\nAnswer: ${kah}% 🏆`;

// Image URL to use
const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

try {

    // Send the message with the image and the answer
    await PappyBotInc.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: jawab, // Custom message with the rating
        mentions: [m.sender] // Mentions the user who asked
    });
} catch (error) {
    console.error('Error fetching or sending image:', error);
    replygcpappy('❗ Failed to send image. Please try again later.');
}
}
break;

case 'checkme': {
  const args = text.split(" ");
  const bet = `${sender}`;

  const sifat = ['🤔 Fine','😡 Unfriendly','👎 Chapri','💔 Nibba/nibbi','😤 Annoying','💀 Dilapidated','😡 Angry person','😊 Polite','🙄 Burden','💯 Great','🤮 Cringe','🤥 Liar'];
  const hoby = ['🍳 Cooking','💃 Dancing','🎮 Playing','🎮 Gaming','🎨 Painting','🤝 Helping Others','🍿 Watching anime','📚 Reading','🚴‍♂️ Riding Bike','🎤 Singing','💬 Chatting','😂 Sharing Memes','✍️ Drawing','💸 Eating Parents Money','🎲 Playing Truth or Dare','🤫 Staying Alone'];
  const bukcin = [...Array(100).keys()].map(i => String(i + 1));
  const arp = bukcin.slice();
  const cakep = ['✅ Yes','❌ No','😖 Very Ugly','😍 Very Handsome'];
  const wetak = ['💖 Caring','💎 Generous','😡 Angry person','😔 Sorry','🤲 Submissive','😊 Fine','🙇‍♂️ Im sorry','🧡 Kind Hearted','😌 Patient','🥰 UwU','🔥 Top','🤗 Helpful'];
  const baikk = bukcin.slice();
  const bhuruk = bukcin.slice();
  const cerdhas = bukcin.slice();
  const berhani = bukcin.slice();
  const mengheikan = bukcin.slice();

  const sipat = sifat[Math.floor(Math.random() * sifat.length)];
  const biho = hoby[Math.floor(Math.random() * hoby.length)];
  const bhucin = bukcin[Math.floor(Math.random() * bukcin.length)];
  const senga = arp[Math.floor(Math.random() * arp.length)];
  const chakep = cakep[Math.floor(Math.random() * cakep.length)];
  const watak = wetak[Math.floor(Math.random() * wetak.length)];
  const baik = baikk[Math.floor(Math.random() * baikk.length)];
  const burug = bhuruk[Math.floor(Math.random() * bhuruk.length)];
  const cerdas = cerdhas[Math.floor(Math.random() * cerdhas.length)];
  const berani = berhani[Math.floor(Math.random() * berhani.length)];
  const takut = mengheikan[Math.floor(Math.random() * mengheikan.length)];

  const profile = `
*≡═《𝗖𝗵𝗲𝗰𝗸 𝗽𝗿𝗼𝗳𝗶𝗹𝗲 𝗳𝗼𝗿 @${bet.split('@')[0]}》═≡*
*🤖 Bot Name: PAPPY-BOT-V2*

*🧑‍🤝‍🧑 𝗡𝗮𝗺𝗲:* ${m.pushName}
*⚡ 𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿𝗶𝘀𝘁𝗶𝗰:* ${sipat}
*🎨 𝗛𝗼𝗯𝗯𝘆:* ${biho}
*💖 𝗦𝗶𝗺𝗽𝗹𝗲𝗻𝗲𝘀𝘀 (Simp):* ${bhucin}%
*💥 𝗚𝗿𝗲𝗮𝘁𝗻𝗲𝘀𝘀:* ${senga}%
*🌟 𝗛𝗮𝗻𝗱𝘀𝗼𝗺𝗲:* ${chakep}
*💬 𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿:* ${watak}
*🌱 𝗚𝗼𝗼𝗱 𝗠𝗼𝗿𝗮𝗹𝘀:* ${baik}%
*😈 𝗕𝗮𝗱 𝗠𝗼𝗿𝗮𝗹𝘀:* ${burug}%
*🧠 𝗜𝗻𝘁𝗲𝗹𝗹𝗶𝗴𝗲𝗻𝗰𝗲:* ${cerdas}%
*🔥 𝗖𝗼𝘂𝗿𝗮𝗴𝗲:* ${berani}%
*😱 𝗔𝗳𝗿𝗮𝗶𝗱:* ${takut}%

*≡═《𝗖𝗵𝗲𝗰𝗸 𝗽𝗿𝗼𝗽𝗲𝗿𝘁𝗶𝗲𝘀》═≡*
`;

const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';
await PappyBotInc.sendMessage(m.chat, {
  image: { url: imageUrl }, // Directly use the URL for the image
  caption: profile, // Custom message with check result and mentioned user
  mentions: [bet] // Mentions the mentioned user
});
}
break;

case 'sound1':
case 'sound2':
case 'sound3':
case 'sound4':
case 'sound5':
case 'sound6':
case 'sound7':
case 'sound8':
case 'sound9':
case 'sound10':
case 'sound11':
case 'sound12':
case 'sound13':
case 'sound14':
case 'sound15':
case 'sound16':
case 'sound17':
case 'sound18':
case 'sound19':
case 'sound20':
case 'sound21':
case 'sound22':
case 'sound23':
case 'sound24':
case 'sound25':
case 'sound26':
case 'sound27':
case 'sound28':
case 'sound29':
case 'sound30':
case 'sound31':
case 'sound32':
case 'sound33':
case 'sound34':
case 'sound35':
case 'sound36':
case 'sound37':
case 'sound38':
case 'sound39':
case 'sound40':
case 'sound41':
case 'sound42':
case 'sound43':
case 'sound44':
case 'sound45':
case 'sound46':
case 'sound47':
case 'sound48':
case 'sound49':
case 'sound50':
case 'sound51':
case 'sound52':
case 'sound53':
case 'sound54':
case 'sound55':
case 'sound56':
case 'sound57':
case 'sound58':
case 'sound59':
case 'sound60':
case 'sound61':
case 'sound62':
case 'sound63':
case 'sound64':
case 'sound65':
case 'sound66':
case 'sound67':
case 'sound68':
case 'sound69':
case 'sound70':
case 'sound71':
case 'sound72':
case 'sound73':
case 'sound74':
case 'sound75':
case 'sound76':
case 'sound77':
case 'sound78':
case 'sound79':
case 'sound80':
case 'sound81':
case 'sound82':
case 'sound83':
case 'sound84':
case 'sound85':
case 'sound86':
case 'sound87':
case 'sound88':
case 'sound89':
case 'sound90':
case 'sound91':
case 'sound92':
case 'sound93':
case 'sound94':
case 'sound95':
case 'sound96':
case 'sound97':
case 'sound98':
case 'sound99':
case 'sound100':
case 'sound101':
case 'sound102':
case 'sound103':
case 'sound104':
case 'sound105':
case 'sound106':
case 'sound107':
case 'sound108':
case 'sound109':
case 'sound110':
case 'sound111':
case 'sound112':
case 'sound113':
case 'sound114':
case 'sound115':
case 'sound116':
case 'sound117':
case 'sound118':
case 'sound119':
case 'sound120':
case 'sound121':
case 'sound122':
case 'sound123':
case 'sound124':
case 'sound125':
case 'sound126':
case 'sound127':
case 'sound128':
case 'sound129':
case 'sound130':
case 'sound131':
case 'sound132':
case 'sound133':
case 'sound134':
case 'sound135':
case 'sound136':
case 'sound137':
case 'sound138':
case 'sound139':
case 'sound140':
case 'sound141':
case 'sound142':
case 'sound143':
case 'sound144':
case 'sound145':
case 'sound146':
case 'sound147':
case 'sound148':
case 'sound149':
case 'sound150':
case 'sound151':
case 'sound152':
case 'sound153':
case 'sound154':
case 'sound155':
case 'sound156':
case 'sound157':
case 'sound158':
case 'sound159':
case 'sound160':
case 'sound161':
PappyBotInc_dev = await getBuffer(`https://github.com/pappy999666-dotcom/Tiktokmusic-API/raw/master/tiktokmusic/${command}.mp3`)
await PappyBotInc.sendMessage(m.chat, { audio: PappyBotInc_dev, mimetype: 'audio/mp4', ptt: true }, { quoted: m })     
break


//---------------------------------------------------------------------------------------------------------------------------//


//█▀█ █▀▀ ▄▀▄ █▀▀ ▀█▀ ▀█▀ █▀█ █▄ █   █▀▀ █▀█ █▄ ▄█ █▄ ▄█ ▄▀▄ █▀▄ █▄ █ █▀▀ 
//█▀▄ ██▄ █▀█ █▄▄  █  ▄█▄ █▄█ █ ▀█   █▄▄ █▄█ █ ▀ █ █ ▀ █ █▀█ █▄▀ █ ▀█ ▄██ 


case 'hug': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/hug`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} hugged themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} hugged @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'cry': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/cry`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} cried themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} cried @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'kill': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/kill`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} killed themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} killed @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'pat': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/pat`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} patted themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} patted @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'lick': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/lick`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} licked themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} licked @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'kiss': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/kiss`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} kissed themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} kissed @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'bite': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/cry`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} bit themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} bit @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'yeet': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/yeet`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} yeeted themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} yeeted @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'bully': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/bully`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} bullied themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} bullied @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'bonk': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/bonk`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} bonked themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} bonked @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'wink': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/wink`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} winked themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} winked @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'poke': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/poke`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} poked themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} poked @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'nom': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/nom`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} nommed themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} nommed @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'slap': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/slap`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} slapped themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} slapped @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'smile': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/smile`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} smiled themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} smiled @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'wave': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/wave`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} waved themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} waved @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'awoo': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/awoo`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} awooed themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} awooed @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'blush': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/blush`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} blushed themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} blushed @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'smug': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/smug`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} smugged themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} smugged @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'glomp': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/glomp`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} glomped themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} glomped @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'happy': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/happy`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} happied themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} happied @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'dance': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/dance`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} danced themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} danced @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'cringe': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/cringe`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} cringed themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} cringed @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'cuddle': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/cuddle`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} cuddled themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} cuddled @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'highfive': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/awoo`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} highfived themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} highfived @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'handhold': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/handhold`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} handheld themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} handheld @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
                case 'spank': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://nekos.life/api/v2/img/spank`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} spanked themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} spanked @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'feed': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://nekos.life/api/v2/img/feed`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} fed themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} fed @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
                case 'tickle': {

        if (!m.isGroup) return PappyStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcpappy(`Tag or reply to a person`)
        var pat = await fetchJson(`https://nekos.life/api/v2/img/tickle`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} tickled themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} tickled @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          PappyBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        

//---------------------------------------------------------------------------------------------------------------------------//


//█▀▄ █▀█ █ █ █ █▄ █ █   █▀█ ▄▀▄ █▀▄   █▀▀ █▀█ █▄ ▄█ █▄ ▄█ ▄▀▄ █▀▄ █▄ █ █▀▀ 
//█▄▀ █▄█ ▀▄▀▄▀ █ ▀█ █▄▄ █▄█ █▀█ █▄▀   █▄▄ █▄█ █ ▀ █ █ ▀ █ █▀█ █▄▀ █ ▀█ ▄██ 


case 'itunes': {
  if (!text) return replygcpappy('Please provide a song name 🎶');
await PappyStickWait()
  try {
    let res = await fetch(`https://api.popcat.xyz/itunes?q=${encodeURIComponent(text)}`);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    let json = await res.json();
    console.log('JSON response:', json);

    let songInfo = 
    `*Song Information* 🎵\n
• *Name:* ${json.name}\n
• *Artist:* ${json.artist}\n
• *Album:* ${json.album}\n
• *Release Date:* ${json.release_date}\n
• *Price:* ${json.price} 💲\n
• *Length:* ${json.length} ⏳\n
• *Genre:* ${json.genre}\n
• *URL:* ${json.url}`;

    // Check if thumbnail is present, then send it with songInfo as caption
    if (json.thumbnail) {
      let imageMessage = await prepareWAMessageMedia({ image: { url: json.thumbnail } }, { upload: PappyBotInc.waUploadToServer });
      await PappyBotInc.sendMessage(m.chat, { image: { url: json.thumbnail }, caption: songInfo }, { quoted: m });
    } else {
      replygcpappy(songInfo);
    }
  } catch (error) {
    console.error(error);
    replygcpappy('An error occurred while fetching the song details 😞');
  }
}
break;

case 'play':
case 'song': {
  try {
    if (!text) return replygcpappy(`🎵 *Example:* ${prefix + command} anime whatsapp status`);

    await PappyStickWait(); // Notify the user of processing

    // Perform a search using yts
    const yts = require("yt-search");
    let search = await yts(text);

    if (!search || search.videos.length === 0) {
      return replygcpappy('❌ *No video found.* Please try with a different keyword.');
    }

    // Get the first video from the search results
    let video = search.videos[0];

    // Use the new API to fetch the audio details
    const apiUrl = `https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(video.url)}`;
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.status || !response.data.data || !response.data.data.dl) {
      return replygcpappy('🚫 *Error fetching audio from the URL.* Please try again later.');
    }

    // Extract details from the API response
    const { title, dl } = response.data.data;

    // Prepare message with audio details
    const audioDetails = `🎶 *Title:* _${title}_\n` +
                         `🔗 *Link:* _${video.url}_`;

    // Send audio details
    await replygcpappy(audioDetails);

    // Notify user that the audio is being downloaded
    await replygcpappy('📥 *Downloading audio...*');

    // Send audio message
    await PappyBotInc.sendMessage(m.chat, {
      audio: { url: dl },
      mimetype: 'audio/mpeg', // Correct MIME type for MP3 audio
      fileName: `${title}.mp3` // Set a file name
    }, { quoted: m });

  } catch (error) {
    console.error("Error in play2/song2 command:", error);
    replygcpappy("⚠️ *An error occurred while processing your request.* Please try again.");
  }
}
break;



     
case 'play2':
case 'song2': {
  try {
    if (!text) return replygcpappy(`🎵 *Example:* ${prefix + command} anime whatsapp status`);

    await PappyStickWait(); // Notify the user of processing

    // Perform a search using yts
    const yts = require("yt-search");
    let search = await yts(text);

    if (!search || search.videos.length === 0) {
      return replygcpappy('❌ *No video found.* Please try with a different keyword.');
    }

    // Get the first video from the search results
    let video = search.videos[0];

    // Use the new API to fetch the audio details
    const apiUrl = `https://bk9.fun/download/ytmp3?url=${encodeURIComponent(video.url)}`;
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.status || !response.data.BK9 || !response.data.BK9.downloadUrl) {
      return replygcpappy('🚫 *Error fetching audio from the URL.* Please try again later.');
    }

    // Extract details from the API response
    const audioData = response.data.BK9.downloadUrl.find(item => item.quality === '128'); // Prefer 128 kbps quality
    if (!audioData) {
      return replygcpappy('⚠️ *Could not find a suitable audio quality.*');
    }

    const { link, title, thumbnail, durationLabel } = audioData;

    // Prepare message with audio details
    const audioDetails = `🎶 *Title:* _${title}_\n` +
                         `⏳ *Duration:* _${durationLabel}_\n` +
                         `🔗 *Link:* _${video.url}_`;

    // Send audio details
    await replygcpappy(audioDetails);

    // Notify user that the audio is being downloaded
    await replygcpappy('📥 *Downloading audio...*');

    // Send audio message
    await PappyBotInc.sendMessage(m.chat, {
      audio: { url: link },
      mimetype: 'audio/mpeg', // Correct MIME type for MP3
      fileName: `${title}.mp3`
    }, { quoted: m });

  } catch (error) {
    console.error("Error in play/song command:", error);
    replygcpappy("⚠️ *An error occurred while processing your request.* Please try again.");
  }
}
break;



case 'spotify': {
  if (!text) return replygcpappy(`🎶 *Where is the Song Name?*\n_Example:_\n${prefix}${command} Rap God`);

  await PappyStickWait(); // Notify the user that the process is ongoing

  try {
    // Fetch Spotify metadata and download link
    const apiUrl = `https://api.neastooid.xyz/api/downloader/spotifydl?url=${encodeURIComponent(text)}`;
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.success || !response.data.metadata || !response.data.link) {
      return replygcpappy('❌ *No results found on Spotify.* Please check the link or try again later.');
    }

    // Extract metadata and download link
    const metadata = response.data.metadata;
    const downloadLink = response.data.link;

    // Prepare the response message with song information
    const songInfo = `🎧 *S P O T I F Y - D L* 🎧

✨ *Title:* ${metadata.title}
🎤 *Artist(s):* ${metadata.artists}
📀 *Album:* ${metadata.album}
🗓️ *Release Date:* ${metadata.releaseDate}`;

    // Send the song information to the user
    await PappyBotInc.sendMessage(m.chat, { text: songInfo }, { quoted: m });

    // Send the Spotify song as an audio message with external ad reply
    await PappyBotInc.sendMessage(m.chat, {
      audio: { url: downloadLink },
      mimetype: 'audio/mpeg',
      contextInfo: {
        externalAdReply: {
          title: metadata.title,
          body: `🎶 *By:* ${metadata.artists}`,
          thumbnailUrl: metadata.cover, // Album cover as the thumbnail
          sourceUrl: text, // The original Spotify link
          mediaType: 2,
          showAdAttribution: true,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    await PappyBotInc.sendMessage(m.chat, {
      text: '❌ *An error occurred while fetching Spotify data.* Please try again later.',
    }, { quoted: m });
  }
}
break;
        				


//FOR LOCAL HOST USERS ( TERMUX, UBUNTU AND LINUX )
case 'ytplay': case 'ytsong': {
  if (!text) return replygcpappy(`Example: ${prefix + command} anime whatsapp status`);
  try {
      const xeonplaymp3 = require('./lib/ytdl');
      const yts = require("youtube-yts");
      const search = await yts(text);
      const anup3k = search.videos[0];
      const pl = await xeonplaymp3.mp3(anup3k.url);

      await PappyBotInc.sendMessage(m.chat, {
          audio: fs.readFileSync(pl.path),
          fileName: `${anup3k.title}.mp3`,
          mimetype: 'audio/mp4',
          ptt: true,
          contextInfo: {
              externalAdReply: {
                  title: anup3k.title,
                  body: botname,
                  thumbnailUrl: pl.meta.image,
                  sourceUrl: anup3k.url,
                  mediaType: 2,
                  renderLargerThumbnail: true
              }
          }
      }, { quoted: m });

      await fs.unlinkSync(pl.path);
  } catch (err) {
      console.error('Error processing play/song command:', err);
      replygcpappy(`Music not found.`);
  }
}
break;




case 'ytmp3': case 'ytaudio': case 'ytplayaudio': {
  if (!text) return replygcpappy(`📌 *Example:* ${prefix + command} youtube_url`);
  if (!text.includes('youtu')) return replygcpappy('❌ *The URL does not contain results from YouTube!*');
  
  try {
      const hasil = await ytMp3(text); // Use the primary ytMp3 function
      PappyStickWait();
      
      await PappyBotInc.sendMessage(m.chat, {
          audio: { url: hasil.result },
          mimetype: 'audio/mpeg',
          contextInfo: {
              externalAdReply: {
                  title: hasil.title,
                  body: hasil.channel,
                  previewType: 'PHOTO',
                  thumbnailUrl: hasil.thumb,
                  mediaType: 1,
                  renderLargerThumbnail: true,
                  sourceUrl: text
              }
          }
      }, { quoted: m });

      replygcpappy(`🎧 *Now Playing:* ${hasil.title}\n` +
                    `🎬 *Channel:* ${hasil.channel}\n` +
                    `📅 *Uploaded On:* ${hasil.uploadDate}\n` +
                    `💾 *Size:* ${hasil.size}\n\n` +
                    `🔻 *Enjoy the music!* 🔻`);
  } catch (err) {
      console.error('❌ Error downloading audio:', err); // Log any errors
      replygcpappy('⚠️ *Error:* Could not download the audio.');
  }
}
break;



case 'ytmp4': case 'ytvideo': case 'ytplayvideo': {
  if (!text) return replygcpappy(`📌 *Example:* ${prefix + command} youtube_url`);
  if (!text.includes('youtu')) return replygcpappy('❌ *The URL does not contain results from YouTube!*');
  
  try {
      const hasil = await ytMp4(text); // Use the primary ytMp4 function
      PappyStickWait();

      // Extract and format additional data
      const views = hasil.views ? hasil.views.toLocaleString() : "0";
      const likes = hasil.likes ? hasil.likes.toLocaleString() : "0";
      const dislikes = hasil.dislike ? hasil.dislike.toLocaleString() : "0";

      await PappyBotInc.sendMessage(m.chat, {
          video: { url: hasil.result },
          caption: `🎥 *Title:* ${hasil.title}\n` +
                   `📜 *Description:* ${hasil.desc || 'No description'}\n` +
                   `📺 *Channel:* ${hasil.channel}\n` +
                   `👁️ *Views:* ${views}\n` +
                   `👍 *Likes:* ${likes}\n` +
                   `👎 *Dislikes:* ${dislikes}\n` +
                   `📆 *Uploaded On:* ${hasil.uploadDate}\n\n` +
                   `💻 *SERVER:* KALI LINUX\n` +
                   `🔻 *DOWNLOADED BY PAPPY-V4 🔻*\n\n` +
                   `✨ *Enjoy your video!* ✨`
      }, { quoted: m });
  } catch (err) {
      console.error('❌ Error downloading video:', err); // Log any errors
      replygcpappy('⚠️ *Error:* Could not download the video.');
  }
}
break;


//---------------------------------------------------------------------------------------------------------------------------//


case 'yta': {
  if (!text) {
    return replygcpappy(`❗ *Example:* ${prefix + command} youtube_url`);
  }

  if (!text.includes('youtu')) {
    return replygcpappy('❌ *The URL does not contain results from YouTube!*');
  }

  await PappyStickWait(); // Show loading indicator

  try {
    // Fetch data from the new API
    const response = await axios.get(`https://bk9.fun/download/ytmp3?url=${encodeURIComponent(text)}`);
    const data = response.data;

    if (!data.status || !data.BK9.downloadUrl || data.BK9.downloadUrl.length === 0) {
      return replygcpappy('⚠️ *Error fetching audio from the URL.*');
    }

    // Get the highest quality audio link
    const bestQualityAudio = data.BK9.downloadUrl[data.BK9.downloadUrl.length - 1];

    // Send the audio directly
    await PappyBotInc.sendMessage(m.chat, {
      audio: { url: bestQualityAudio.link },
      mimetype: 'audio/mpeg',
      fileName: `${bestQualityAudio.title}.mp3`
    }, { quoted: m });

  } catch (error) {
    console.error('Error processing YTA command:', error);
    return replygcpappy('❌ *An error occurred while processing your request.*');
  }
}
break;


case 'ytv': {
  if (!text) {
    return replygcpappy(`❌ *Example:* ${prefix + command} youtube_url`);
  }
  if (!text.includes('youtu')) {
    return replygcpappy('⚠️ *The URL does not contain results from YouTube!*');
  }

  await PappyStickWait(); // Show loading indicator

  try {
    // Fetch video details from the updated API
    const response = await axios.get(`https://btch.us.kg/download/ytdl?url=${encodeURIComponent(text)}`);
    const data = response.data;

    if (!data.status || !data.result) {
      return replygcpappy('⚠️ *Error fetching video from the URL.*');
    }

    // Extract video details
    const videoDetails = data.result;
    const videoTitle = videoDetails.title;
    const videoLink = videoDetails.url;
    const videoThumbnail = videoDetails.thumbnail || ''; // Optional: thumbnail if provided in API response
    const videoDuration = videoDetails.duration;
    const videoViews = videoDetails.views;
    const videoChannel = videoDetails.channel;

    // Create a caption with video details
    const caption = `*_DOWNLOADED BY PAPPY BOT V2 MD_*\n\n` +
      `🎬 *Title*: _${videoTitle}_\n` +
      `🔗 *YouTube URL*: _${videoLink}_\n` +
      `⏳ *Duration*: _${videoDuration}_\n` +
      `👀 *Views*: _${videoViews}_\n` +
      `📺 *Channel*: _${videoChannel}_\n` +
      `✨ *Enjoy your video!* 🎥\n🔥 *Powered by Pappy Bot* 💻`;

    // Send the video to the chat
    await PappyBotInc.sendMessage(m.chat, {
      video: { url: videoDetails.mp4 },
      caption: caption,
      thumbnail: videoThumbnail ? { url: videoThumbnail } : undefined
    }, { quoted: m });

  } catch (error) {
    console.error('Error in ytv2 command:', error);
    replygcpappy('⚠️ *An error occurred while processing the video.*');
  }
}
break;


case 'yta2': {
    if (!text) return replygcpappy(`❌ *Example:* ${prefix + command} youtube_url`);
    if (!text.includes('youtu')) return replygcpappy('⚠️ *The URL does not contain results from YouTube!*');
    PappyStickWait();

    try {
        const apiUrl = `${global.api}downloader/yt-audio?apikey=${global.id}&url=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl);
        const hasil = response.data;

        // Check if audio URL is available
        if (!hasil.result || !hasil.result.audio) {
            throw new Error('❌ *No audio download link found.*');
        }

        const audioLink = hasil.result.audio;
        const caption = `*_DOWNLOADED BY PAPPY BOT V2 MD_*\n\n🎵 *Title*: _${hasil.result.title}_\n✨ *Enjoy your audio!* 🎶\n🔥 *Powered by Pappy Bot* 💻`;

        // Send caption to the user
        await replygcpappy(caption);

        // Send the audio using the correct variable `audioLink`
        await PappyBotInc.sendMessage(m.chat, {
            audio: { url: audioLink },
            mimetype: 'audio/mp4' // Adjust mimetype if necessary
        }, { quoted: m });
    } catch (error) {
        console.error('Error in yta2 command:', error);
        replygcpappy('⚠️ *An error occurred while processing the audio.*');
    }
}
break;


case 'ytv2': {
  try {
    if (args.length < 1 || !isUrl(text)) {
      return replygcpappy(`❌ *Where is the link?* \n\nExample: ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag`);
    }

    await PappyStickWait(); // Show loading indicator

    // API endpoint with the provided YouTube URL
    const apiUrl = `https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(text)}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("❌ *Failed to fetch from API.*");
    }

    const apiResponse = await response.json();

    if (!apiResponse.status || !apiResponse.data || !apiResponse.data.dl) {
      throw new Error("❌ *Failed to retrieve video from API response.*");
    }

    // Extract video details from API response
    const { title, dl: videoUrl } = apiResponse.data;

    // Create a caption
    const caption = `🎬 *Downloaded by Pappy v4 MD*\n\n` +
      `🎥 *Title*: _${title}_\n` +
      `✨ *Enjoy your video!* 🎉\n🔥 *Powered by Pappy Bot* 💻`;

    // Send the video
    await PappyBotInc.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: caption,
    }, { quoted: m });

  } catch (error) {
    console.error('Error in ytv2 command:', error);
    replygcpappy("❌ *An error occurred while processing your request.* Please try again later.");
  }
}
break;

case 'likee': case 'likeedl': {
  if (!text) {
    return replygcpappy(`❌ *Example:* ${prefix + command} likee_video_url`);
  }

  await PappyStickWait(); // Show loading indicator

  try {
    // Fetch video details from the Likee API
    const response = await axios.get(`https://bk9.fun/download/likee?url=${encodeURIComponent(text)}`);
    const data = response.data;

    if (!data.status || !data.BK9) {
      return replygcpappy('⚠️ *Error fetching Likee video from the URL.*');
    }

    const videoDetails = data.BK9;
    const videoTitle = videoDetails.title;
    const videoThumbnail = videoDetails.thumbnail || '';
    const videoWithWatermark = videoDetails.withWatermark;
    const videoWithoutWatermark = videoDetails.withoutwatermark;

    const caption = `*_DOWNLOADED BY PAPPY BOT V2 MD_*\n\n` +
      `🎬 *Title*: _${videoTitle}_\n` +
      `📺 *Watch Video*: _${text}_\n` +
      `✨ *Enjoy your video!* 🎥\n🔥 *Powered by Pappy Bot* 💻`;

    // Send the video (choose watermark-free or watermark version)
    await PappyBotInc.sendMessage(m.chat, {
      video: { url: videoWithoutWatermark },
      caption: caption,
      thumbnail: videoThumbnail ? { url: videoThumbnail } : undefined
    }, { quoted: m });

  } catch (error) {
    console.error('Error in likeedl command:', error);
    replygcpappy('⚠️ *An error occurred while processing the Likee video.*');
  }
}
break;

case 'capcut': case 'capcutdl': {
  if (!text) {
    return replygcpappy(`❌ *Example:* ${prefix + command} capcut_video_url`);
  }

  await PappyStickWait(); // Show loading indicator

  try {
    // Fetch video details from the CapCut API
    const response = await axios.get(`https://bk9.fun/download/capcut?url=${encodeURIComponent(text)}`);
    const data = response.data;

    if (!data.status || !data.BK9) {
      return replygcpappy('⚠️ *Error fetching CapCut video from the URL.*');
    }

    const videoDetails = data.BK9;
    const videoTitle = videoDetails.title;
    const videoDescription = videoDetails.description || 'No description available';
    const videoUsage = videoDetails.usage || '0';
    const videoThumbnail = videoDetails.thumbnail || '';
    const videoUrl = videoDetails.video;

    const caption = `*_DOWNLOADED BY PAPPY BOT V2 MD_*\n\n` +
      `🎬 *Title*: _${videoTitle}_\n` +
      `📝 *Description*: _${videoDescription}_\n` +
      `✨ *Usage*: _${videoUsage}_\n` +
      `📺 *Watch Video*: _${text}_\n` +
      `✨ *Enjoy your video!* 🎥\n🔥 *Powered by Pappy Bot* 💻`;

    // Send the video from CapCut
    await PappyBotInc.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: caption,
      thumbnail: videoThumbnail ? { url: videoThumbnail } : undefined
    }, { quoted: m });

  } catch (error) {
    console.error('Error in capcutdl command:', error);
    replygcpappy('⚠️ *An error occurred while processing the CapCut video.*');
  }
}
break;


case 'img': case 'image': case 'picture': {
  if (!text) return replygcpappy(`*• Example:* ${prefix + command} luffy one piece,10`);
await PappyStickWait()
  try {
      // Split the input text to get the search term and the amount
      let [searchTerm, amount] = text.split(',').map(item => item.trim());
      // Default to 1 if no amount is provided
      amount = amount ? parseInt(amount) : 1;

      // Limit the maximum number of images to 30
      if (amount > 30) {
          amount = 30;
          replygcpappy('⚠️ *Maximum limit is 30 images.* Sending 30 images.');
      } else if (amount <= 0 || isNaN(amount)) {
          return replygcpappy('❌ *Invalid number of images.* Please enter a number between 1 and 30.');
      }

      // List of new API URLs for fetching images
      const apiUrls = [
          'https://aemt.uk.to/googleimage?query=',
          'https://meitang.xyz/googleimage?query=',
          'https://btch.us.kg/googleimage?query=',
          'https://api.tioo.eu.org/googleimage?query=',
          'https://api.tioprm.eu.org/googleimage?query='
      ];

      // Select a random API URL
      const randomApiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)];

      // Fetch the image URLs from the selected API
      let response = await fetch(randomApiUrl + encodeURIComponent(searchTerm));

      // Check if the response is okay
      if (!response.ok) {
          return replygcpappy('❌ *Failed to fetch the images.* Please try again.');
      }

      // Parse the response JSON
      let data = await response.json();
      if (!data.result || data.result.length === 0) {
          return replygcpappy('❌ *No images found for the given query.*');
      }

      // Select a random set of images from the fetched URLs
      let imageUrls = [];
      for (let i = 0; i < amount; i++) {
          let randomImageUrl = data.result[Math.floor(Math.random() * data.result.length)];
          imageUrls.push(randomImageUrl);
      }

      // P4: Send as native album if ≤ 10 images; otherwise send individually
      if (amount <= 10 && imageUrls.length >= 2) {
          try {
              const albumItems = imageUrls.map((url, idx) => ({
                  image: { url },
                  caption: idx === 0 ? `🖼️ *${searchTerm}* — ${imageUrls.length} images` : undefined
              }));
              await PappyBotInc.sendMessage(m.chat, { album: albumItems }, { quoted: m });
          } catch {
              for (let imageUrl of imageUrls) {
                  await PappyBotInc.sendMessage(m.chat, { image: { url: imageUrl }, caption: `🖼️ ${searchTerm}` }, { quoted: m }).catch(() => {});
              }
          }
      } else {
          for (let imageUrl of imageUrls) {
              try {
                  let imgResponse = await fetch(imageUrl);
                  if (imgResponse.status === 403) { continue; }
                  await PappyBotInc.sendMessage(m.chat, {
                      image: { url: imageUrl },
                      caption: `🖼️ *Image Result* 🎨\n\n✨ _Here is the result of: ${searchTerm}_ 🔍`
                  }, { quoted: m });
              } catch (error) { continue; }
          }
      }

  } catch (e) {
      console.error('⚠️ Error fetching the images:', e);
      return replygcpappy("❗ *Error fetching the images.* Please try again.");
  }
}
break;

case 'gimage': case 'googleimg': case 'imggoogle': {
  if (!text) return replygcpappy(`*• Example:* ${prefix + command} a girl 👧`);
await PappyStickWait()
  try {
      // List of new API URLs
      const apiUrls = [
          'https://aemt.uk.to/googleimage?query=',
          'https://meitang.xyz/googleimage?query=',
          'https://btch.us.kg/googleimage?query=',
          'https://api.tioo.eu.org/googleimage?query=',
          'https://api.tioprm.eu.org/googleimage?query='
      ];

      // Randomly select an API URL
      const apiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)] + encodeURIComponent(text);

      // Fetch the image from the selected API
      let response = await fetch(apiUrl);

      // Check if the response is okay
      if (!response.ok) {
          return replygcpappy('❌ *Failed to fetch the image.* Please try again. 🔄');
      }

      // Get the image URL from the response
      let data = await response.json();

      if (!data.result || data.result.length === 0) {
          return replygcpappy('❌ *No images found.* Please try again with a different search term. 🔄');
      }

      // Select a random image from the result
      let imageUrl = data.result[Math.floor(Math.random() * data.result.length)];

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: `🌟 *Google Image Search* 🌟\n\n_*Here is the result for: ${text}*_ 📸✨`
      }, { quoted: m });

  } catch (e) {
      console.error(e);
      return replygcpappy('❗ *Error fetching the image.* Please try again. ⚠️');
  }
}
break;


case 'live-wallpaper': {
  try {
    if (!text) return replygcpappy(`Example: ${prefix + command} cat`);

    // Show loading indicator
    await PappyStickWait();

    // Make API request to fetch live wallpapers
    const axios = require('axios');
    const response = await axios.get(`https://pappymd-live-wallpapers.vercel.app/api/search?q=${encodeURIComponent(text)}&page=1&limit=10`);

    const { wallpapers } = response.data;

    if (!wallpapers || wallpapers.length === 0) {
      return replygcpappy('❌ No live wallpapers found for your search.');
    }

    // Select a random wallpaper from the results
    const wallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];

    // Prepare message details
    const wallpaperDetails = `🖼️ *Title:* _${wallpaper.title}_\n` +
                             `🔗 *Link:* _${wallpaper.url}_\n`;

    // Send the wallpaper thumbnail and details
    await PappyBotInc.sendMessage(m.chat, {
      image: { url: wallpaper.thumbnail },
      caption: wallpaperDetails
    }, { quoted: m });

    // Send the live wallpaper video
    await PappyBotInc.sendMessage(m.chat, {
      video: { url: wallpaper.video_url },
      caption: '🎥 Here is your live wallpaper!'
    }, { quoted: m });

  } catch (error) {
    console.error("Error in live-wallpaper command: ", error);
    replygcpappy("⚠️ An error occurred while processing your request.");
  }
}
break;
           

case 'tiktok': case 'tiktokdown': case 'ttdown': case 'ttdl': case 'tt': case 'ttmp4': case 'ttvideo': case 'tiktokmp4': case 'tiktokvideo': {
  if (!text) return replygcpappy(`Example: ${prefix + command} url_tiktok`)
  if (!text.includes('tiktok.com')) return replygcpappy('Url Tidak Mengandung Result Dari Tiktok!')
  const hasil = await tiktokDl(text);
  PappyStickWait()
  if (hasil.size_nowm) {
    await PappyBotInc.sendFileUrl(m.chat, hasil.data[1].url, `*📍Title:* ${hasil.title}\n*⏳Duration:* ${hasil.duration}\n*🎃Author:* ${hasil.author.nickname} (@${hasil.author.fullname})`, m)
  } else {
    for (let i = 0; i < hasil.data.length; i++) {
      await PappyBotInc.sendFileUrl(m.chat, hasil.data[i].url, `*🚀Image:* ${i+1}`, m)
    }
  }
}
break


case 'ttmp3': case 'tiktokmp3': case 'ttaudio': case 'tiktokaudio': {
  if (!text) return replygcpappy(`Example: ${prefix + command} url_tiktok`)
  if (!text.includes('tiktok.com')) return replygcpappy('Url Tidak Mengandung Result Dari Tiktok!')
  const hasil = await tiktokDl(text);
  PappyStickWait()
  await PappyBotInc.sendMessage(m.chat, {
    audio: { url: hasil.music_info.url },
    mimetype: 'audio/mpeg',
    contextInfo: {
      externalAdReply: {
        title: 'TikTok • ' + hasil.author.nickname,
        body: hasil.stats.likes + ' suka, ' + hasil.stats.comment + ' komentar. ' + hasil.title,
        previewType: 'PHOTO',
        thumbnailUrl: hasil.cover,
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: text
      }
    }
  }, { quoted: m });
}
break


case 'instagram': case 'insta': case 'ig': case 'igvideo': case 'igvid': {
  if (!text) {
    return replygcpappy('❗ *You need to provide the URL of an Instagram video.*');
  }

  try {
    PappyStickWait(); // Show loading indicator

    // New API URL for Instagram video download
    const apiUrl = `https://api.neastooid.xyz/api/downloader/igdl?url=${encodeURIComponent(text)}`;
    const res = await fetch(apiUrl);
    const api_response = await res.json();

    // Validate API response
    if (!api_response.success || !api_response.data || !api_response.data[0] || !api_response.data[0].url) {
      return replygcpappy('❌ *No media found or invalid response from the API.*');
    }

    // Extract the video URL from the response
    const videoUrl = api_response.data[0].url;
    const thumbnail = api_response.data[0].thumbnail;
    
    // Caption for the video
    const cap = `✨ *Enjoy your video!* 🎥\n🔥 *Powered by Pappy Bot* 💻`;

    // Send the Instagram video message
    await PappyBotInc.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: cap,
      thumbnail: { url: thumbnail }, // Optionally include a thumbnail
    }, { quoted: m });

  } catch (error) {
    // Handle fetch or processing errors
    return replygcpappy(`⚠️ *An error occurred:* ${error.message}`);
  }
}
break;
        
case 'instagramimg': case 'instaimg': case 'igimage': case 'igimg': {
  if (!text) {
    return replygcpappy('❗ *You need to provide the URL of an Instagram post.*');
  }

  try {
    PappyStickWait();

    // New API URL for Instagram image download
    const apiUrl = `https://bk9.fun/download/instagram2?url=${encodeURIComponent(text)}`;
    const res = await fetch(apiUrl);
    const api_response = await res.json();

    // Validate API response
    if (!api_response || !api_response.status || !api_response.BK9 || api_response.BK9.length === 0) {
      return replygcpappy('❌ *No media found or invalid response from the API.*');
    }

    // Extract image URLs from the response
    const imageLinks = api_response.BK9.map(item => item.url);
    const cap = '*🎉 Thank you for using pappy v4!*'; // Optional caption for the images

    // Loop through each image and send them
    for (const imageUrl of imageLinks) {
      await PappyBotInc.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: cap
      }, { quoted: m });
    }

  } catch (error) {
    // Handle fetch or processing errors
    return replygcpappy(`⚠️ *An error occurred:* ${error.message}`);
  }
}
break;


case 'fb':
    case 'facebook':
    case 'facebookvid': {
      if (!text) {
        return replygcpappy(`📌 Please provide a Facebook video link.\n\nExample:\n*${prefix + command}* https://www.facebook.com/share/v/HVm2yjse1usgfF4T`);
      }
    
      try {
        PappyStickWait();
        // Fetch video data from the API
        const response = await fetch(`https://bk9.fun/download/videodownloader?input=${encodeURIComponent(text)}`);
        const data = await response.json();
    
        if (!data || !data.status || !data.video || !data.video.videoInfo || data.video.videoInfo.length === 0) {
          return replygcpappy('❌ No video found or invalid response from API.');
        }
    
        // Prefer HD video, fallback to SD
        const video = data.video.videoInfo.find(v => v.quality.toLowerCase().includes('hd')) ||
                      data.video.videoInfo.find(v => v.quality.toLowerCase().includes('sd'));
    
        if (!video) {
          return replygcpappy('❌ No HD or SD video found.');
        }
    
        const caption = `
 🎥 *Facebook Video Download* 🎥
    
📺 *Info*: ${data.video.info || "Not provided"}
⏳ *Duration*: ${data.video.duration || "Unknown"}
📹 *Quality*: ${video.quality}
💾 *Format*: ${video.format}
✨ *Enjoy your video!* 🎥\n🔥 *Powered by Pappy Bot* 💻    

    `.trim();
    
        // Send the video with the caption
        await PappyBotInc.sendMessage(m.chat, {
          video: { url: video.downloadLink },
          caption,
        }, { quoted: m });
    
      } catch (error) {
        console.error(error);
        return replygcpappy('❌ An error occurred while processing your request. Please try again later.');
      }
    }
    break;
                    
                             
    case 'twitter':
  case 'twitterdl': {
    if (!args[0]) {
      return replygcpappy(`📌 Example:\n*${prefix + command}* https://twitter.com/username/status/1234567890123456789`);
    }

    if (!isUrl(args[0]) || !args[0].includes('twitter.com')) {
      return replygcpappy('❌ Invalid Twitter link!');
    }

    try {
      // Fetch data from the new Twitter downloader API
      const response = await axios.get(`https://api.siputzx.my.id/api/d/twitter?url=${encodeURIComponent(args[0])}`);

      if (!response.data || !response.data.status) {
        return replygcpappy('❌ Unable to fetch data from the link. Please try again later.');
      }

      const { downloadLink, videoDescription, imgUrl } = response.data.data;

      // Prepare a response message
      const message = `
🎥 *Twitter Video Download* 🎥

📄 *Description:* ${videoDescription || "No description provided"}

🔗 *Download Link:* ${downloadLink}

✨ *Enjoy your video!* 🎥\n🔥 *Powered by Pappy Bot* 💻

`;

      // Send the message with the video download link
      await replygcpappy(message);

      // Send the video itself in the chat
      await PappyBotInc.sendMessage(m.chat, {
        video: { url: downloadLink },
        mimetype: 'video/mp4',
        caption: message
      }, { quoted: m });

    } catch (error) {
      console.error(error);
      replygcpappy('❌ *An error occurred while processing your request.*\nMake sure the link is valid and try again.');
    }
  }
  break;
                  
      case 'threads': {
        try {
          // URL of the Threads API endpoint
          const threadsApiUrl = 'https://api.nexoracle.com/downloader/threads?apikey=free_key@maher_apis&url=https://www.threads.net/t/Cujx6ryoYx6/?igshid=NTc4MTIwNjQ2YQ==';
          
          // Fetching the data from the Threads API
          let res = await fetch(threadsApiUrl);
          let apiResponse = await res.json();
      
          // Check if the response is valid and contains the required data
          if (apiResponse.status === 200 && apiResponse.result) {
            const { username, profile, downloadLink } = apiResponse.result;
      
            // Ensure both profile and download link are available
            if (profile && downloadLink) {
              // Check the file type of the downloadLink (image or video)
              const fileExtension = downloadLink.split('.').pop().toLowerCase();
              
              // If the download link is a video or image, send the corresponding type
              if (fileExtension === 'mp4' || fileExtension === 'mov') {
                // If it's a video, send the video file
                await PappyBotInc.sendMessage(m.chat, {
                  video: { url: downloadLink },
                  caption: `🎥 *Username:* ${username}\n📸 *Profile Image:* ${profile}`,
                }, { quoted: m });
              } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                // If it's an image, send the image
                await PappyBotInc.sendMessage(m.chat, {
                  image: { url: downloadLink },
                  caption: `📸 *Username:* ${username}\n📸 *Profile Image:* ${profile}`,
                }, { quoted: m });
              } else {
                // Handle if the file format is unrecognized
                return replygcpappy('❌ *Unrecognized file format for the download link.*');
              }
      
            } else {
              return replygcpappy('❌ *Missing profile or download link.*');
            }
            
          } else {
            return replygcpappy('❌ *Failed to fetch thread content.*');
          }
      
        } catch (error) {
          console.error('Error fetching thread data:', error.message);
          return replygcpappy('❌ *An error occurred while fetching thread content.*');
        }
      }
      break;
                
          
       
      case 'bilibili': {
        if (!isPremium) return replyprem(mess.premium);
        if (!text) return replygcpappy(`Example : ${prefix + command} https://www.bilibili.com/video/BV1cy4y1k7A2`);
        await PappyStickWait();
        try {
          // Fetch video information from the Bilibili API
          const response = await axios.get(`https://api.nexoracle.com/downloader/bilibili?apikey=free_key@maher_apis&url=${encodeURIComponent(text)}`);
      
          if (response.status !== 200 || !response.data.result || !response.data.result.medias || response.data.result.medias.length === 0) {
            return replygcpappy('❌ No video found. Please check the URL and try again.');
          }
      
          const video = response.data.result.medias.find(media => media.videoAvailable) || response.data.result.medias[0];
          const videoUrl = video.url;
      
          // Prepare message with video details
          const caption = `📹 *Bilibili Video Downloaded*\n\n📂 Title: ${response.data.result.title}\n📅 Duration: ${response.data.result.duration}\n👤 Uploader: ${response.data.result.uploader}`;
      
          // Send video message
          await PappyBotInc.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: caption
          }, { quoted: m });
      
        } catch (error) {
          console.error('Failed to fetch video:', error);
          replygcpappy('❌ An error occurred while fetching the video. Please try again later.');
        }
      }
      break;
      
      
      
      
      
      case 'dailymotion': {
        if (!isPremium) return replyprem(mess.premium);
        if (!text) return replygcpappy(`Example : ${prefix + command} https://dai.ly/x9492ja`);
        await PappyStickWait();
        try {
          // Ensure global.api is an absolute URL
          const apiUrl = new URL(`${global.api}downloader/dailymotion?apikey=${global.id}&url=${encodeURIComponent(text)}`);
      
          // Fetch video information from Dailymotion API
          const response = await fetch(apiUrl.toString());
          const json = await response.json();
      
          // Check if the response contains video data
          if (!json || !json.result || json.result.length === 0) {
            return replygcpappy('❌ Failed to fetch video. Please try again.');
          }
      
          // Access the first result
          const videoInfo = json.result[0];
      
          // Choose the best quality video available from formats
          const bestQualityVideo = videoInfo.formats.find(format => format.format_id === 'hls-1080') || 
                                   videoInfo.formats.find(format => format.format_id === 'hls-720') || 
                                   videoInfo.formats[videoInfo.formats.length - 1]; // fallback to the lowest
      
          const videoUrl = bestQualityVideo.url;
      
          // Send a reaction to indicate the start of the download
          await PappyBotInc.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } });
      
          // Send the video
          await PappyBotInc.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: `📹 *Dailymotion Video Downloaded*\n\n📂 Title: ${videoInfo.title}\n📅 Duration: ${videoInfo.duration_string}\n🌐 Source: ${videoInfo.source}`
          }, { quoted: m });
      
          // Send a reaction to indicate the download is complete
          await PappyBotInc.sendMessage(m.chat, { react: { text: "☑️", key: m.key } });
      
        } catch (err) {
          console.error(err);
          await PappyBotInc.sendMessage(m.chat, { react: { text: "✖️", key: m.key } });
          replygcpappy('❌ An error occurred while fetching the video. Please try again later.');
        }
      }
      break;
       
      case 'apk': {
        if (!text) return replygcpappy(`*[❗] Please provide the APK Name you want to download.*`);
        await PappyStickWait();
      
        try {
          // Fetch APK data from the new API
          let apiUrl = `https://bk9.fun/download/apk?id=${encodeURIComponent(text)}`;
          let response = await fetch(apiUrl);
          let data = await response.json();
      
          if (data.status !== true) {
            return replygcpappy(`*[❗] No results found for the APK Name you provided.*`);
          }
      
          let apkData = data.BK9;
      
          // Ensure size is a valid string before parsing it
          let sizeMB = 0;
          if (apkData.size && typeof apkData.size === 'string') {
            sizeMB = parseFloat(apkData.size.replace(' MB', ''));
          }
      
          if (sizeMB > 200) {
            return await PappyBotInc.sendMessage(m.chat, { text: '*[⛔] The file is too large.*' }, { quoted: m });
          }
      
          // Send the APK file
          await PappyBotInc.sendMessage(
            m.chat,
            {
              document: { url: apkData.dllink },
              mimetype: 'application/vnd.android.package-archive',
              fileName: apkData.name + '.apk',
              caption: `✨ *APK Details* ✨\n\n📱 *App Name:* ${apkData.name}\n🔄 *Last Updated:* ${apkData.lastup}\n📦 *Package Name:* ${apkData.package}\n\n🔥 *Get the latest version now! 🔥`
            },
            { quoted: m }
          );
        } catch (error) {
          console.error(error);
          return replygcpappy(`*[❗] An error occurred. Please try again later.*`);
        }
      }
      break;
      
      
      case 'mega': {
        try {
          if (!text) return replygcpappy(`${prefix + command} https://mega.nz/file/ovJTHaQZ#yAbkrvQgykcH_NDKQ8eIc0zvsN7jonBbHZ_HTQL6lZ8`);
          const { File } = require('megajs');
          const file = File.fromURL(text);
          await file.loadAttributes();
          if (file.size >= 300000000) return replygcpappy('Error: File size is too large (Maximum Size: 300MB)');
      
          const downloadingMessage = `🌩️ *Downloading file... Please wait.*`;
          replygcpappy(downloadingMessage);
      
          const caption = `🎉 *_Download Complete!_* 🎉\n\n📂 *File Name:* ${file.name}\n📊 *Size:* ${formatBytes(file.size)}\n\n✅ *Enjoy your download!* ✅`;

      
          const data = await file.downloadBuffer();
          const fileExtension = path.extname(file.name).toLowerCase();
          const mimeTypes = {
            ".mp4": "video/mp4",
            ".pdf": "application/pdf",
            ".zip": "application/zip",
            ".rar": "application/x-rar-compressed",
            ".7z": "application/x-7z-compressed",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
          };
          let mimetype = mimeTypes[fileExtension] || "application/octet-stream";
      
          await PappyBotInc.sendMessage(m.chat, { document: data, mimetype: mimetype, fileName: file.name, caption: caption }, { quoted: m });
        } catch (error) {
          return replygcpappy(`Error: ${error.message}`);
        }
      }
      break;
      
      case 'mediafire': {
        if (!args[0]) return replygcpappy(`🚫 *Enter the MediaFire link next to the command*`);
        if (!args[0].match(/mediafire/gi)) return replygcpappy(`❌ *Link incorrect. Please provide a valid MediaFire link*`);
      
        await PappyStickWait();
      
        // Construct the API URL
        const apiUrl = `https://api.vreden.my.id/api/mediafiredl?url=${encodeURIComponent(args[0])}`;
      
        // Notify the user that the download is starting
        replygcpappy(`⏳ *Downloading file, please wait...*`);
      
        try {
          // Fetch the API response
          const res = await fetch(apiUrl);
          const api_response = await res.json();
      
          // Check if the response is valid
          if (api_response.status === 200 && api_response.result.length > 0) {
            const { nama, mime, size, link } = api_response.result[0];
      
            // MIME types mapping for extensions
            const mimeTypes = {
              "mp4": "video/mp4",
              "pdf": "application/pdf",
              "zip": "application/zip",
              "rar": "application/x-rar-compressed",
              "7z": "application/x-7z-compressed",
              "jpg": "image/jpeg",
              "jpeg": "image/jpeg",
              "png": "image/png",
            };
      
            // Get mimetype from file extension
            const mimetype = mimeTypes[mime] || "application/octet-stream";
      
            // Caption with file details
            const caption = `
              ≡ *📂 MEDIAFIRE FILE DETAILS*
              
              ▢ *📄 Filename:* ${nama}
              ▢ *📏 Size:* ${size}
              ▢ *🗂️ Extension:* ${mime}
            `.trim();
      
            // Send the file
            await PappyBotInc.sendMessage(m.chat, {
              document: { url: link },
              fileName: nama,
              mimetype: mimetype,
            }, { quoted: m });
      
            // Notify the user that the download is complete
            return replygcpappy(`✅ *Download complete!* 🎉\n\n${caption}`);
          }
      
          // Handle invalid or empty response
          return replygcpappy(`❌ *Failed to fetch the download link. Please try again later.*`);
      
        } catch (error) {
          console.error(`❌ Error during MediaFire download: ${error.message}`);
          return replygcpappy(`⚠️ *Failed to download the file. Please try again later.*`);
        }
      }
      break;
            
      case 'mediafire2': {
        if (!args[0]) return replygcpappy(`🚫 *Please provide a MediaFire link next to the command!*`);
        if (!args[0].match(/mediafire/gi)) return replygcpappy(`❌ *Invalid link! Please provide a valid MediaFire link.*`);
      
        await PappyStickWait();
      
        // Construct the API URL
        const apiUrl = `https://bk9.fun/download/mediafire?url=${encodeURIComponent(args[0])}`;
      
        try {
          // Notify the user that the process is starting
          replygcpappy(`⏳ *Fetching file details, please wait...*`);
      
          // Fetch the API response
          const res = await fetch(apiUrl);
          const api_response = await res.json();
      
          // Check if the response is valid and contains the link
          if (api_response.status && api_response.BK9 && api_response.BK9.link) {
            const { link, name, mime, size, uploaded } = api_response.BK9;
      
            // Mime types mapping
            const mimeTypes = {
              "mp4": "video/mp4",
              "pdf": "application/pdf",
              "zip": "application/zip",
              "rar": "application/x-rar-compressed",
              "7z": "application/x-7z-compressed",
              "jpg": "image/jpeg",
              "jpeg": "image/jpeg",
              "png": "image/png",
            };
      
            // Get mimetype from file extension, defaulting to "application/octet-stream"
            const mimetype = mimeTypes[mime] || "application/octet-stream";
      
            const caption = `
              📂 *📥 MEDIAFIRE FILE DETAILS*
              
              📄 *Filename:* ${name || "Unknown"}
              📏 *Size:* ${size || "Unknown"}
              🗂️ *Extension:* ${mime || "Unknown"}
              📅 *Uploaded On:* ${uploaded || "Unknown"}
            `.trim();
      
            // Send the file
            await PappyBotInc.sendMessage(m.chat, {
              document: { url: link },
              fileName: name || "file",
              mimetype: mimetype,
            }, { quoted: m });
      
            // Notify the user that the download is complete
            return replygcpappy(`✅ *Download Complete!* 🎉\n\n${caption}`);
          }
      
          // Handle cases where the response does not contain the expected data
          return replygcpappy(`❌ *Failed to fetch the download link. Please check the link or try again later.*`);
      
        } catch (error) {
          console.error('⚠️ Error fetching MediaFire data:', error.message);
          return replygcpappy(`⚠️ *An error occurred while processing your request. Please try again later.*`);
        }
      }
      break;
      
      case 'soundcloud': {
        if (!text) return replygcpappy(`*Where is the Song Name?*\n_Example:_\n${prefix}${command} Metamorphosis`);
        
        await PappyStickWait();
      
        try {
          // Construct the API URL
          const apiUrl = `https://btch.us.kg/soundcloud?url=${encodeURIComponent(text)}`;
      
          // Fetch the SoundCloud song details
          let api = await fetchJson(apiUrl);
      
          // Log the API response for debugging
          console.log('SoundCloud API Response:', api);
      
          if (!api || api.status !== true || !api.result) {
            console.error('API response is invalid or no results found:', api);
            await PappyBotInc.sendMessage(m.chat, '❌ No results found on SoundCloud. Please try again with a different query.', { quoted: m });
            return;
          }
      
          // Extract song details from the response
          const { title, url, author, imageURL } = api.result;
      
          // Prepare the response message with song information
          const songInfo = `*🎵 S O U N D C L O U D 🎵*\n\n` +
                           `• 🎵 *Title*: ${title}\n` +
                           `• 🎤 *Artist*: ${author.username}\n` +
                           `• 🔗 *Download Link*: [Click Here](${url})`;
      
          // Send the song info to the user
          await PappyBotInc.sendMessage(m.chat, { text: songInfo }, { quoted: m });
      
          // Check if the download URL exists and is valid
          if (!url || !url.startsWith('https://')) {
            console.error('Invalid download URL:', url);
            await PappyBotInc.sendMessage(m.chat, '❌ No valid download link found. Please try again.', { quoted: m });
            return;
          }
      
          // Log the download URL for debugging
          console.log('Download URL:', url);
      
          // Fetch the audio file
          const audioResponse = await fetch(url);
          if (!audioResponse.ok) {
            throw new Error(`Failed to fetch audio. Status: ${audioResponse.status}`);
          }
      
          const audioBuffer = await audioResponse.buffer();
          if (!audioBuffer || audioBuffer.length === 0) {
            await PappyBotInc.sendMessage(m.chat, '❌ Failed to fetch audio. The file might be empty or inaccessible.', { quoted: m });
            return;
          }
      
          // Send the SoundCloud song as an audio message with additional context (external ad reply)
          await PappyBotInc.sendMessage(m.chat, {
            audio: { buffer: audioBuffer },
            mimetype: 'audio/mpeg',
            contextInfo: {
              externalAdReply: {
                title: `🎵 - sᴏᴜɴᴅᴄʟᴏᴜᴅ -`,
                body: title,
                thumbnailUrl: imageURL, // Use the song's thumbnail image
                sourceUrl: url, // URL to the download link
                mediaType: 2,
                showAdAttribution: true,
                renderLargerThumbnail: true
              }
            }
          }, { quoted: m });
      
        } catch (error) {
          console.error('Error fetching SoundCloud data:', error.message);
          await PappyBotInc.sendMessage(m.chat, { text: '❌ An error occurred while fetching the SoundCloud data. Please try again later.' }, { quoted: m });
        }
      }
      break;
       
        
      case 'git': case 'gitclone':
        if (!args[0]) return replygcpappy(`Where is the link?\nExample :\n${prefix}${command} https://github.com/pappy999666-dotcom/PappyMedia`)
        if (!isUrl(args[0]) && !args[0].includes('github.com')) return replygcpappy(`Link invalid!!`)
        await PappyStickWait()        
        let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
            let [, user, repo] = args[0].match(regex1) || []
            repo = repo.replace(/.git$/, '')
            let url = `https://api.github.com/repos/${user}/${repo}/zipball`
            let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
            PappyBotInc.sendMessage(m.chat, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: m }).catch((err) => replygcpappy(mess.error))
        break


                
        case 'gdrive': {
          if (!args[0]) return replygcpappy(`❌ *Please provide a Google Drive link!*`);
        
          await PappyStickWait();
        
          try {
            // Fetch Google Drive file details using the new API
            const apiUrl = `https://api.siputzx.my.id/api/d/gdrive?url=${encodeURIComponent(args[0])}`;
            let res = await fetch(apiUrl);
            let apiResponse = await res.json();
        
            if (apiResponse.status !== true || !apiResponse.data) {
              return replygcpappy('❌ *Failed to fetch data from Google Drive link.* Please check the URL and try again.');
            }
        
            // Extract file details from the API response
            const { name: fileName, download: downloadUrl, link } = apiResponse.data;
            const fileSize = "Unknown"; // You can update this if your API provides file size
        
            // Determine the MIME type and file type based on the file extension
            let fileExtension = fileName.split('.').pop().toLowerCase();
            let mimeTypes = {
              'mp4': 'video/mp4',
              'pdf': 'application/pdf',
              'zip': 'application/zip',
              'rar': 'application/x-rar-compressed',
              '7z': 'application/x-7z-compressed',
              'jpg': 'image/jpeg',
              'jpeg': 'image/jpeg',
              'png': 'image/png',
              'gif': 'image/gif',
              'doc': 'application/msword',
              'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'txt': 'text/plain',
            };
            let mimetypeDetected = mimeTypes[fileExtension] || 'application/octet-stream';
        
            // Send file based on MIME type
            if (mimetypeDetected.includes('image')) {
              // Send as an image
              await PappyBotInc.sendMessage(m.chat, {
                image: { url: downloadUrl },
                caption: `🖼 *Image Name:* ${fileName}\n🗂 *Size:* ${fileSize}\n📥 *Download Link:* ${downloadUrl}`,
                mimetype: mimetypeDetected,
              });
            } else if (mimetypeDetected.includes('video')) {
              // Send as a video
              await PappyBotInc.sendMessage(m.chat, {
                video: { url: downloadUrl },
                caption: `🎬 *Video Name:* ${fileName}\n🗂 *Size:* ${fileSize}\n📥 *Download Link:* ${downloadUrl}`,
                mimetype: mimetypeDetected,
              });
            } else if (mimetypeDetected.includes('application')) {
              // Send as a document (for file types like PDF, DOC, etc.)
              await PappyBotInc.sendMessage(m.chat, {
                document: { url: downloadUrl },
                fileName: fileName,
                mimetype: mimetypeDetected,
                caption: `📄 *File Name:* ${fileName}\n🗂 *Size:* ${fileSize}\n📥 *Download Link:* ${downloadUrl}`,
              });
            } else {
              // Default for other file types (this could be further customized)
              await PappyBotInc.sendMessage(m.chat, {
                document: { url: downloadUrl },
                fileName: fileName,
                mimetype: mimetypeDetected,
                caption: `📂 *File Name:* ${fileName}\n🗂 *Size:* ${fileSize}\n📥 *Download Link:* ${downloadUrl}`,
              });
            }
          } catch (error) {
            console.error('Error fetching Google Drive data:', error.message);
            return replygcpappy('❌ *An error occurred while processing the link. Please check the URL and try again.*');
          }
        }
        break;
        

        case 'pinterest': 
case 'pin': {
  if (!text) {
    return replygcpappy(`❗ *Example:* ${prefix + command} goku or goku,5`);
  }

  const [query, count] = text.split(',');
  const imageCount = count ? Math.min(parseInt(count), 20) : 1; // Limit to 20 images

  PappyStickWait();

  try {
    // Fetch Pinterest images based on the query
    const searchApiUrl = `https://btch.us.kg/pinterest?query=${encodeURIComponent(query)}`;
    const searchResponse = await axios.get(searchApiUrl);

    if (searchResponse.data.result && searchResponse.data.result.length > 0) {
      const imageUrls = searchResponse.data.result.slice(0, imageCount); // Get requested number of images

      // Loop through the image URLs and send them
      for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];

        // Check if the image URL is valid by sending a HEAD request
        try {
          const headResponse = await axios.head(imageUrl);

          // If the URL is valid, send the image
          if (headResponse.status === 200) {
            await PappyBotInc.sendMessage(m.chat, {
              image: { url: imageUrl },
              caption: `🎉 *Image ${i + 1} from your Pinterest query: ${query}*`
            }, { quoted: m });
          } else {
            console.log(`⚠️ Invalid URL: ${imageUrl}`);
          }
        } catch (err) {
          console.log(`⚠️ Failed to access URL: ${imageUrl}`);
        }
      }
    } else {
      return replygcpappy("⚠️ *No images found for the provided query.*");
    }
  } catch (error) {
    console.error(error);
    return replygcpappy("❌ *An error occurred while fetching data from Pinterest.*");
  }
}
break;



        case 'pinterestdl': 
        case 'pindl': {
          if (!text) {
            return replygcpappy(`❗ *Example:* ${prefix + command} pinterest_url`);
          }
        
          const pinterestUrl = text.trim();
        
          PappyStickWait();
        
          try {
            // Fetch the download details for the Pinterest link (image or video)
            const downloadApiUrl = `https://btch.us.kg/download/pindl?url=${encodeURIComponent(pinterestUrl)}`;
            const response = await axios.get(downloadApiUrl);
        
            if (response.data.status === true && response.data.result.success) {
              const mediaType = response.data.result.data.media_type;
              const downloadUrl = mediaType === 'image' ? response.data.result.data.image : response.data.result.data.video;
        
              if (downloadUrl) {
                if (mediaType === 'video/mp4') {
                  // Send video message if it's a video
                  await PappyBotInc.sendMessage(m.chat, {
                    video: { url: downloadUrl },
                    caption: `🎉 *Video from your Pinterest link*`
                  }, { quoted: m });
                } else {
                  // Send image message if it's an image
                  await PappyBotInc.sendMessage(m.chat, {
                    image: { url: downloadUrl },
                    caption: `🎉 *Image from your Pinterest link*`
                  }, { quoted: m });
                }
              } else {
                return replygcpappy("⚠️ *No media found for the provided Pinterest URL.*");
              }
            } else {
              return replygcpappy("⚠️ *Failed to fetch media from Pinterest.*");
            }
          } catch (error) {
            console.error(error);
            return replygcpappy("❌ *An error occurred while fetching data from Pinterest.*");
          }
        }
        break;
        
        
        case 'ringtone': {
          if (!text) return replygcpappy(`Example: ${prefix + command} black rover`)
          let anu = await ringtone(text)
          let result = pickRandom(anu)
          await PappyBotInc.sendMessage(m.chat, { audio: { url: result.audio }, fileName: result.title + '.mp3', mimetype: 'audio/mpeg' }, { quoted: m })
        }
        break
        
          
      case 'autodownload': case 'autodl': {
        if (!PappyTheCreator) return PappyStickOwner();
    await PappyStickWait()
        if (q == 'on') {
            db.settings[botNumber].autodownload = true;
            return replygcpappy(`Successfully changed Auto Download to ${q} ✅`);
        } else if (q == 'off') {
            db.settings[botNumber].autodownload = false;
            return replygcpappy(`Successfully changed Auto Download to ${q} ❌`);
        } else {
           
            const replyMessage = `Hi ${m.pushName},\n\nPlease choose to *${command}*:\n\n`
                + `✅ *Enable Auto Download*\n❌ *Disable Auto Download*`;
    
            return replygcpappy(replyMessage);
        }
    }
    break;
    
          
			

//-------------------------------------------------------------------------------------------------------------//


// ▀▀ ▄▀▄ █▄ ▄█ █▀▀   █▀▀ █▀█ █▄ ▄█ █▄ ▄█ ▄▀▄ █▄ █ █▀▄ █▀▀ 
//█▄█ █▀█ █ ▀ █ ██▄   █▄▄ █▄█ █ ▀ █ █ ▀ █ █▀█ █ ▀█ █▄▀ ▄██ 


case 'truthordare': case 'tod': {
  // P4: native flow buttons — pick Truth or Dare
  await PappyBotInc.sendMessage(m.chat, {
    text: `🎭 *Truth or Dare?*\n\nChoose your challenge @${m.sender.split('@')[0]}!`,
    mentions: [m.sender],
    buttons: [
      { nativeFlow: { id: `${prefix}truth`, text: '🎭 Truth' } },
      { nativeFlow: { id: `${prefix}dare`,  text: '🔥 Dare'  } },
    ]
  }, { quoted: m });
}
break;

case 'truth': {
  // Set up image URL
  const imageUrl = 'https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg';


  // Truth questions array
 const truths = [
      "Have you ever liked anyone? How long?",
      "If you could make a friend in any group, who would you pick?",
      "What's your biggest fear?",
      "Have you ever liked someone and felt they liked you back?",
      "Have you ever stolen money from family?",
      "What's the name of your friend's ex you secretly liked?",
      "What makes you happy when sad?",
      "Have you experienced unrequited love?",
      "What's your most embarrassing moment?",
      "What's your proudest achievement this year?",
      "What's the weirdest thing you've done when alone?",
      "Have you ever cheated on a test?",
      "What is something you've done that you're ashamed of?",
      "Have you ever been caught lying?",
      "What is your most ridiculous nickname?",
      "If you could switch lives with someone for a day, who would it be?",
      "What's the worst gift you've ever received?",
      "Have you ever shared a secret you promised to keep?",
      "What's your biggest insecurity?",
      "Have you ever broken something and blamed someone else?",
      "What's a secret you've kept from your parents?",
      "What would you do if you had only 24 hours to live?",
      "What's the most trouble you've gotten into at school?",
      "What's the worst date you've ever had?",
      "What's something you've never told your best friend?",
      "What's a talent you wish you had?",
      "Have you ever pretended to be sick to skip school?",
      "If you had to date someone in this room, who would it be?",
      "What's a lie you've told to impress someone?",
      "Have you ever stalked someone on social media?",
      "If you had a superpower, what would it be?",
      "Have you ever cried watching a movie? Which one?",
      "What’s the most childish thing you still do?",
      "Have you ever laughed at something inappropriate?",
      "What’s your guilty pleasure?",
      "If you were invisible, what’s the first thing you’d do?",
      "Have you ever lied to get out of trouble?",
      "Who do you admire the most, and why?",
      "What’s the meanest thing you’ve done to someone?",
      "Do you have any hidden talents?",
      "Have you ever lied in a game of Truth or Dare?",
      "What’s one secret you’ve kept from everyone?",
      "Have you ever had a crush on a teacher?",
      "What’s the silliest thing you’re afraid of?",
      "What’s the worst thing you’ve done when you were mad?",
      "Who was your first kiss?",
      "Have you ever cheated in a relationship?",
      "What’s the most expensive thing you’ve broken?",
      "What’s the worst rumor you spread or heard?",
      "Have you ever been jealous of a friend?",
      "What’s something you regret doing or saying?"
  ];

  // Randomly select a truth question
  const selectedTruth = truths[Math.floor(Math.random() * truths.length)];

  // Send the truth message
  const truthMessage = `🎭 *Truth* Challenge 🎭\n\n${selectedTruth}`;

  await PappyBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: truthMessage,
      footer: 'PAPPY-BOT-V2',
      quoted: m
  });
}
break;

case 'dare': {
  // Set up image URL
  const imageUrl = 'https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg';


  // Dare challenges array
  const dares = [
      "Eat 2 tablespoons of rice without side dishes.",
      "Call your crush and say 'I miss you.'",
      "Only reply with emojis for 24 hours.",
      "Shout *I love my crush* in public.",
      "Send your contact list screenshot.",
      "Act possessed in a funny way.",
      "Rename yourself to *I AM GOOFY* for 24 hours.",
      "Put a silly photo of yourself as your profile picture.",
      "Shout 'I am amazing!' in a voice note.",
      "Send a message to your ex saying you miss them.",
      "Text your last contact with just 'Hey!' repeatedly.",
      "Do 20 jumping jacks and record yourself.",
      "Text a random person and confess a fake secret.",
      "Talk in an accent for the next hour.",
      "Post a cringy photo on social media.",
      "Let the person next to you text anyone from your phone.",
      "Draw a funny mustache on your face and take a selfie.",
      "Say the alphabet backward.",
      "Walk outside and wave at strangers.",
      "Talk like a baby for the next 10 minutes.",
      "Share a funny meme with the last person you texted.",
      "Dance without music for 1 minute.",
      "Let someone else write your next social media post.",
      "Wear socks on your hands for the next 5 minutes.",
      "Pretend to be a chicken for 30 seconds.",
      "Take a silly selfie and post it online.",
      "Read the last text you sent out loud.",
      "Text your parents and say you got engaged.",
      "Eat a spoonful of something spicy.",
      "Imitate a famous celebrity for a minute.",
      "Text your crush with a heart emoji.",
      "Try to lick your elbow.",
      "Do 10 push-ups on video.",
      "Do your best animal impression.",
      "Spin around 10 times and walk in a straight line.",
      "Text a friend and say you're moving abroad.",
      "Act like your favorite character for 5 minutes.",
      "Talk with your tongue sticking out.",
      "Message a random number and say 'Happy Birthday!'",
      "Recite a poem about the nearest object.",
      "Pretend you’re a robot for the next 5 minutes.",
      "Stand on one leg for 30 seconds.",
      "Text a friend and ask for the weirdest selfie.",
      "Sing a nursery rhyme with dramatic flair.",
      "Write 'I am the best' on your forehead with marker.",
      "Act like you’re a waiter and take everyone’s order.",
      "Send a voice note saying you’re a superhero.",
      "Pretend you’re on a cooking show and describe your dinner.",
      "Text a random person 'Did you call me?'"
  ];

  // Randomly select a dare challenge
  const selectedDare = dares[Math.floor(Math.random() * dares.length)];

  // Send the dare message
  const dareMessage = `🔥 *Dare* Challenge 🔥\n\n${selectedDare}`;

  await PappyBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: dareMessage,
      footer: 'PAPPY-BOT-V2',
      quoted: m
  });
}
break;

      
      
case 'slot': {
  await gameSlot(PappyBotInc, m, global.db.users)
}
break
case 'casino': {
  await gameCasinoSolo(PappyBotInc, m, prefix, global.db.users)
}
break
case 'robber': case 'rob': {
  await gameMerampok(m, global.db.users)
}
break
case 'suitpvp': case 'suit': {
  let poin = 10
  let poin_lose = 10
  let timeout = 60000
  if (Object.values(game.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.sender))) return replygcpappy(`Finish your previous suit first!`)
  if (m.mentionedJid[0] === m.sender) return replygcpappy(`Can't play with myself !`)
  if (!m.mentionedJid[0]) return replygcpappy(`_Who do you want to challenge?_\nTag the person..\n\nExample : ${prefix}suit @${owner[0]}`, m.chat, { mentions: [owner[0] + '@s.whatsapp.net'] })
  if (Object.values(game.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.mentionedJid[0]))) return replygcpappy(`The person you are challenging is playing suit with someone else :(`)
  let id = 'suit_' + new Date() * 1
  // P4: Send challenge with native Accept/Reject buttons
  await PappyBotInc.sendMessage(m.chat, {
    text: `⚔️ *SUIT PvP Challenge!*\n\n@${m.sender.split('@')[0]} challenges @${m.mentionedJid[0].split('@')[0]} to Rock-Paper-Scissors!\n\n@${m.mentionedJid[0].split('@')[0]}, do you accept?`,
    mentions: [m.sender, m.mentionedJid[0]],
    buttons: [
      { nativeFlow: { id: 'accept', text: '✅ Accept' } },
      { nativeFlow: { id: 'reject', text: '❌ Reject' } },
    ]
  }, { quoted: m })
  game.suit[id] = {
    chat: m.chat,
    id: id,
    p: m.sender,
    p2: m.mentionedJid[0],
    status: 'wait',
    waktu: setTimeout(() => {
      if (game.suit[id]) replygcpappy(`_Suit time is up_`)
      delete game.suit[id]
    }, 60000), poin, poin_lose, timeout
  }
}
break
case 'ttc': case 'ttt': case 'tictactoe': {
  let TicTacToe = require('./lib/tictactoe');
  if (Object.values(game.tictactoe).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) return replygcpappy(`You are still in the game!\nType *${prefix}del${command}* If you want to end the session`);
  let room = Object.values(game.tictactoe).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
  if (room) {
    replygcpappy('Partner found!')
    room.o = m.chat
    room.game.playerO = m.sender
    room.state = 'PLAYING'
    let arr = room.game.render().map(v => {
      return {X: '❌',O: '⭕',1: '1️⃣',2: '2️⃣',3: '3️⃣',4: '4️⃣',5: '5️⃣',6: '6️⃣',7: '7️⃣',8: '8️⃣',9: '9️⃣'}[v]
    })
    let str = `Room ID: ${room.id}\n\n${arr.slice(0, 3).join('')}\n${arr.slice(3, 6).join('')}\n${arr.slice(6).join('')}\n\nWaiting @${room.game.currentTurn.split('@')[0]}\n\nType *surrender* to give up and admit defeat`
    if (room.x !== room.o) await PappyBotInc.sendMessage(room.x, { texr: str, mentions: parseMention(str) }, { quoted: m })
    await PappyBotInc.sendMessage(room.o, { text: str, mentions: parseMention(str) }, { quoted: m })
  } else {
    room = {
      id: 'tictactoe-' + (+new Date),
      x: m.chat,
      o: '',
      game: new TicTacToe(m.sender, 'o'),
      state: 'WAITING',
      waktu: setTimeout(() => {
        if (game.tictactoe[roomnya.id]) replygcpappy(`_Time ${command} finished_`)
        delete game.tictactoe[roomnya.id]
      }, 300000)
    }
    if (text) room.name = text
    PappyBotInc.sendMessage(m.chat, { text: 'Waiting for partner' + (text ? ` type the command below ${prefix}${command} ${text}` : ''), mentions: m.mentionedJid }, { quoted: m })
    game.tictactoe[room.id] = room
  }
}
break
case 'playbomb': case 'bomb': {
  if (game.tebakbom[m.sender]) return replygcpappy('There Are Still Unfinished Sessions!')
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  game.tebakbom[m.sender] = {
    petak: shuffle([0, 0, 0, 2, 0, 2, 0, 2, 0, 0]),
    board: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'],
    bomb: 3,
    lolos: 7,
    pick: 0,
    nyawa: ['❤️', '❤️', '❤️'],
    waktu: setTimeout(() => {
      if (game.tebakbom[m.sender]) replygcpappy(`_Time ${command} finished_`)
      delete game.tebakbom[m.sender];
    }, 120000)
  }
  replygcpappy(`*GUESS THE BOMB*\n\n${game.tebakbom[m.sender].board.join("")}\n\nChoose that number! and don't get hit by a bomb!\nBomb : ${game.tebakbom[m.sender].bomb}\nLife : ${game.tebakbom[m.sender].nyawa.join("")}`);
}
break

case 'mathquiz': case 'math': {
  const { genMath, modes } = require('./lib/math');
const axios = require('axios');
  const inputMode = ['noob', 'easy', 'medium', 'hard','extreme','impossible','impossible2'];
  if (!text) return replygcpappy(`Mode: ${Object.keys(modes).join(' | ')}\nContoh penggunaan: ${prefix}math medium`)
  if (!inputMode.includes(text.toLowerCase())) return replygcpappy('Mode not found!')
  if (game.kuismath.hasOwnProperty(m.sender.split('@')[0])) return replygcpappy('There Are Still Unfinished Sessions!')
  let result = await genMath(text.toLowerCase())
  replygcpappy(`*Berapa hasil dari: ${result.soal.toLowerCase()}*?\n\nTime: ${(result.waktu / 1000).toFixed(2)} detik`).then(() => {
    game.kuismath[m.sender.split('@')[0]] = {
      jawaban: result.jawaban,
      mode: text.toLowerCase()
    }
  })
  await sleep(result.waktu)
  if (game.kuismath.hasOwnProperty(m.sender.split('@')[0])) {
    replygcpappy('Time has run out\nAnswer: ' + game.kuismath[m.sender.split('@')[0]].jawaban)
    delete game.kuismath[m.sender.split('@')[0]]
  }
}
break


case 'dice': {
  let ddsa = [{ url: 'https://telegra.ph/file/9f60e4cdbeb79fc6aff7a.png', no: 1 },{ url: 'https://telegra.ph/file/797f86e444755282374ef.png', no: 2 },{ url: 'https://telegra.ph/file/970d2a7656ada7c579b69.png', no: 3 },{ url: 'https://telegra.ph/file/0470d295e00ebe789fb4d.png', no: 4 },{ url: 'https://telegra.ph/file/a9d7332e7ba1d1d26a2be.png', no: 5 },{ url: 'https://telegra.ph/file/99dcd999991a79f9ba0c0.png', no: 6 }]
  let media = pickRandom(ddsa)
  await PappyBotInc.sendImageAsSticker(m.chat, media.url, m, { packname: global.packname, author: global.author, isAvatar: 1 })
}
break


case 'profile': case 'cekme': case 'cek': {
  const user = Object.keys(global.db.users)
  const infoUser = global.db.users[m.sender]
  const teks = `*Profile @${m.sender.split('@')[0]}* :\nUser Bot : ${user.includes(m.sender) ? 'True' : 'False'}\nUser : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}\nLimit : ${infoUser.limit}\nMoney : ${infoUser ? infoUser.uang.toLocaleString('id-ID') : '0'}`
  await PappyBotInc.sendTextMentions(m.chat, teks, m)
}
break

case 'daily': case 'claim': {
  daily(PappyBotInc, m, global.db.users)
}
break

case 'transferlimit': case 'tflimit': case 'tlimit': {
  transferLimit(PappyBotInc, m, args, global.db.users)
}
break

case 'transfermoney': case 'tmoney': case 'transfer': {
  transferUang(PappyBotInc, m, args, global.db.users)
}
break

case 'buy': {
  buy(m, args, db)
}
break

case 'react': {
  PappyBotInc.sendMessage(m.chat, { react: { text: args[0], key: m.quoted ? m.quoted.key : m.key }})
}
break

case 'tagme': {
  PappyBotInc.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}`, mentions: [m.sender] }, { quoted: m })
}
break


//-----------------------------------------------------------------------------------------------------------//


//▄▀▄ ▀█▀   █▀▀ █▀█ █▄ ▄█ █▄ ▄█ ▄▀▄ █▀▄ █▄ █ █▀▀ 
//█▀█ ▄█▄   █▄▄ █▄█ █ ▀ █ █ ▀ █ █▀█ █▄▀ █ ▀█ ▄██ 


case 'blackboxai': {
  if (!text) return replygcpappy(`⚡ *Example:* ${prefix + command} write a program to delete a file 📝`);
  try {
    await metaTyping(PappyBotInc, m.chat).catch(() => {});
    let gpt = await (await fetch(`https://itzpire.com/ai/blackbox-ai?q=${text}`)).json();
    const reply = `🔥 *Blackbox AI Response* 🔥\n\n💡 *Result:* ${gpt.result}\n\n📝 *Your Request:* ${text}`;
    await PappyBotInc.sendMessage(m.chat, {
      image: { url: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png' },
      caption: reply,
      mentions: [m.sender]
    });
  } catch (e) {
    console.error('Error:', e);
    return replygcpappy(`❗ *Error:* ${e.message} ⚠️`);
  }
}
break;

case 'travel-assistant': {
  if (!text) return replygcpappy(`✈️ *Example:* ${prefix + command} how can I visit the Taj Mahal 🏰`);
  try {
    let gpt = await (await fetch(`https://itzpire.com/ai/copilot2trip?q=${text}`)).json();
    if (gpt.status === "error") {
      return replygcpappy(`❌ *Error:* ${gpt.message}`);
    }
    const reply = `🌍 *Travel Assistant AI* 🌍\n\n🗺️ *Your Request:* ${text}\n\n💬 *Response:* ${gpt.result}`;
    const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

    await PappyBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: reply,
      mentions: [m.sender]
    });
  } catch (e) {
    console.error('Error:', e);
    return replygcpappy("⚠️ *Error* ⚠️");
  }
}
break;
                
case 'dalle': {
  if (!text) return replygcpappy(`🎤 *• Example:* ${prefix + command} a girl singing in public 🎶`);

  try {
      const apiUrls = [
          'https://aemt.uk.to/dalle?text=',
          'https://meitang.xyz/dalle?text=',
          'https://btch.us.kg/dalle?text=',
          'https://api.tioo.eu.org/dalle?text=',
          'https://api.tioprm.eu.org/dalle?text='
      ];
      const randomApiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)];
      let response = await fetch(randomApiUrl + encodeURIComponent(text));

      if (!response.ok) return replygcpappy('❌ Failed to fetch the image. Please try again.');

      let gptImageUrl = await response.json();

      if (!gptImageUrl || !gptImageUrl.url) return replygcpappy('❌ No image found. Please try again with a different prompt.');

      await PappyBotInc.sendMessage(m.chat, {
          image: { url: gptImageUrl.url },
          caption: `> Dalle 🌟 \n\n _*Here is the result of: ${text} ✨*_`
      }, { quoted: m });

  } catch (e) {
      console.error(e);
      return replygcpappy("`*Error*`");
  }
}
break;

case 'stablediffusion': {
  if (!text) return replygcpappy(`🎨 *• Example:* ${prefix + command} school boy 👦`);

  try {
      const apiUrls = [
          'https://aemt.uk.to/stablediffusion?text=',
          'https://meitang.xyz/stablediffusion?text=',
          'https://btch.us.kg/stablediffusion?text=',
          'https://api.tioo.eu.org/stablediffusion?text=',
          'https://api.tioprm.eu.org/stablediffusion?text='
      ];
      const randomApiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)];
      const timeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('⏳ Request timeout')), 15000)
      );

      let response = await Promise.race([
          fetch(randomApiUrl + encodeURIComponent(text)),
          timeout
      ]);

      if (!response.ok) return replygcpappy('❌ *Failed to fetch the image.* Please try again. 🔄');

      let imageUrl = await response.json();

      if (!imageUrl || !imageUrl.url) return replygcpappy('❌ *No image found.* Please try again with a different prompt. 🔄');

      await PappyBotInc.sendMessage(m.chat, {
          image: { url: imageUrl.url },
          caption: `✨ *Stable Diffusion* ✨\n\n🖼️ _*Here is the result of: ${text}*_ 🖌️`
      }, { quoted: m });

  } catch (e) {
      console.error(e);
      return replygcpappy(`❗ *Error:* ${e.message} ⚠️`);
  }
}
break;

case 'lexica': {
    if (!text) return replygcpappy(`📸 *• Example:* ${prefix + command} a cat 🐱`);

    try {
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('⏳ Request timeout')), 15000)
        );

        let response = await Promise.race([
            fetch(`https://api.maher-zubair.xyz/ai/lexica?apikey=${global.id}&prompt=${encodeURIComponent(text)}`),
            timeout
        ]);

        if (!response.ok) return replygcpappy('❌ *Failed to fetch the image.* Please try again. 🔄');

        let data = await response.json();

        if (!data.result) return replygcpappy('❌ *No image found.* Please try again with a different prompt. 🔄');

        await PappyBotInc.sendMessage(m.chat, {
            image: { url: data.result },
            caption: `✨ *Lexica AI* ✨\n\n🖼️ _*Here is the result of: ${text}*_ 🖌️`
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        return replygcpappy(`❗ *Error:* ${e.message} ⚠️`);
    }
}
break;

case 'photoleap': {
    if (!text) return replygcpappy(`🌊 *Example:* ${prefix + command} blue sea`);

    const currentTime = Date.now();
    if (currentTime - (global.lastUsedPhotoleap || 0) < 10000) {
        return replygcpappy("⏳ Cooldown 10 seconds, try again later");
    }
    global.lastUsedPhotoleap = currentTime;

    try {
        let gpt = await (await fetch(`https://tti.photoleapapp.com/api/v1/generate?prompt=${encodeURIComponent(text)}`)).json();

        if (!gpt.result_url) return replygcpappy('❌ *No image found.* Please try again with a different prompt. 🔄');

        const reply = `✨ *Photo Leap AI* ✨\n\n🖼️ _*Here is the result of: ${text}*_ 📷`;

        await PappyBotInc.sendMessage(m.chat, {
            image: { url: gpt.result_url },
            caption: reply,
            mentions: [m.sender]
        });

    } catch (e) {
        console.error(e);
        return replygcpappy(`❗ *Error:* ${e.message} ⚠️`);
    }
}
break;
                
case 'ai': case 'gpt': case 'openai': {
    if (!text) return replygcpappy(`*• Example:* ${prefix + command} what is your name`);

    try {
        await metaTyping(PappyBotInc, m.chat).catch(() => {});
        const apiUrls = [
            'https://aemt.uk.to/openai?text=',
            'https://meitang.xyz/openai?text=',
            'https://btch.us.kg/openai?text=',
            'https://api.tioo.eu.org/openai?text=',
            'https://api.tioprm.eu.org/openai?text='
        ];
        const randomApiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)];
        let response = await fetch(randomApiUrl + encodeURIComponent(text));

        if (!response.ok) return replygcpappy('❌ *Failed to fetch the response.* Please try again. 🔄');

        let gpt = await response.json();

        if (!gpt.result) return replygcpappy('❌ *No result found.* Please try again with a different prompt. 🔄');

        const reply = `🌟 *OpenAI Response* 🌟\n\n💬 *Response:* ${gpt.result}\n\n📝 *Your Request:* ${text}`;

        await PappyBotInc.sendMessage(m.chat, {
            image: { url: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png' },
            caption: reply,
            mentions: [m.sender]
        });

    } catch (e) {
        console.error(e);
        return replygcpappy(`❗ *Error:* ${e.message} ⚠️`);
    }
}
break;

case 'ai2': case 'gpt2': case 'openai2': {
  if (!text) return replygcpappy(`Example: ${prefix + command} query`)
  const hasil = await chatGpt(text);
   return replygcpappy(`❗ *Error:*⚠️`);
}
break



case 'checkgpt': {
    if (!text) return replygcpappy(`*• Example:* ${prefix + command} input your text`);

    try {
        let apiUrl = `${global.api}ai/text-detector?apikey=${global.id}&prompt=${encodeURIComponent(text)}`;
        let response = await fetch(apiUrl);

        if (!response.ok) return replygcpappy('❌ Failed to analyze the text. Please try again.');

        let data = await response.json();

        const feedback = `*🤖 GPT Text Analysis*\n\n`
            + `*📝 Input Text:* \n_${data.result.input_text}_\n\n`
            + `*🌐 Detected Language:* \n_${data.result.detected_language}_\n\n`
            + `*💡 AI Detection Feedback:* \n_${data.result.feedback}_\n\n`
            + `*📊 AI Likelihood:* \n_${data.result.isHuman}% likely human-generated_\n\n`
            + `*💬 Additional Feedback:* \n_${data.result.additional_feedback}_\n`;

        await PappyBotInc.sendMessage(m.chat, {
            image: { url: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png' },
            caption: feedback,
            mentions: [m.sender]
        });

    } catch (e) {
        console.error(e);
        return replygcpappy("❗ *Error analyzing the text. Please try again.*");
    }
}
break;

case 'darky': {
    if (!text) return replygcpappy(`*• Example:* ${prefix + command} write me a simple code of python`);

    try {
        let response = await (await fetch(`https://evlgpt.onrender.com/egpt?prompt=${encodeURIComponent(text)}`)).json();

        let message = response.message.replace(/GURUGPT V1/g, 'PAPPY BOT V2');

        const reply = `🔥 *Pappy AI Response* 🔥\n\n💡 *Result:* ${message}\n\n📝 *Your Request:* ${text}`;

        await PappyBotInc.sendMessage(m.chat, {
            image: { url: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png' },
            caption: reply,
            mentions: [m.sender]
        });

    } catch (e) {
        console.error('Error:', e);
        return replygcpappy("❗ *Error*");
    }
}
break;

case 'bing': {
  if (!text) return replygcpappy(`*• Example:* ${prefix + command} hello`);

  // Define API URLs
  const apiUrls = [
    'https://aemt.uk.to/bingai?text=',
    'https://meitang.xyz/bingai?text=',
    'https://btch.us.kg/bingai?text=',
    'https://api.tioo.eu.org/bingai?text=',
    'https://api.tioprm.eu.org/bingai?text='
  ];

  try {
    // Choose a random API URL from the list
    const apiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)] + encodeURIComponent(text);
    
    // Fetch data from the selected API
    let response = await (await fetch(apiUrl)).json();
    
    // Prepare the response text with emojis
    const reply = `🔥 *Pappy AI Response* 🔥\n\n💬 *Response:* ${response.result}\n\n📝 *Your Request:* ${text}`;

    // Image URL to use
    const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

    // Send the message with the image URL and the reply text
    await PappyBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: reply,
      mentions: [m.sender]
    });

  } catch (e) {
    console.error('Error:', e);
    return replygcpappy("❗ *Error*");
  }
}
break;

case 'mathsai': {
  if (!text) return replygcpappy(`*• Example:* ${prefix + command} what is your name`);
  
  try {
    // Fetch data from the Maths AI API
    let gpt = await (await fetch(`${global.api}ai/math?apikey=${global.id}&prompt=${text}`)).json();

    // Prepare the message with the response
    const reply = `🔥 *Maths AI Response* 🔥\n\n🧮 *Result:* ${gpt.result}\n\n📝 *Your Request:* ${text}`;

    // Image URL to use
    const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

    // Send the message with the image URL and the reply text
    await PappyBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: reply,
      mentions: [m.sender]
    });

  } catch (e) {
    console.error('Error:', e);
    return replygcpappy("❗ *Error occurred while processing the math query.*");
  }
}
break;


case 'mangaimg': {
  if (!text) return replygcpappy(`*• Example:* ${prefix + command} a manga character 🖼️`);

  await PappyStickWait();

  try {
      // Fetch the manga image from the API
      let apiUrl = `${global.api}ai/manga-diffusion?apikey=${global.id}&prompt=${encodeURIComponent(text)}`;
      let response = await fetch(apiUrl);

      // Check if the response is okay
      if (!response.ok) {
          return replygcpappy('❌ Failed to fetch the image. Please try again.');
      }

      // Convert the response to a buffer
      const buffer = await response.buffer();

      // Prepare the message to send
      const caption = `> Manga Image 🎨\n\n_*Here is the result of: ${text} 🌟*_`;

      // Send the image and caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { buffer },
          caption: caption
      }, { quoted: m });

      await PappyBotInc.sendMessage(m.chat, { react: { text: "☑️", key: m.key } });

  } catch (e) {
      console.error(e);
      await PappyBotInc.sendMessage(m.chat, { react: { text: "✖️", key: m.key } });
      return replygcpappy("❗ Error fetching the image. Please try again.");
  }
}
break;

case 'animeimg': {
  if (!text) return replygcpappy(`*• Example:* ${prefix + command} a cute anime girl 👧✨`);

  await PappyStickWait();

  try {
      // Fetch the anime image from the API
      let apiUrl = `${global.api}ai/anime-gen?apikey=${global.id}&prompt=${encodeURIComponent(text)}`;
      let response = await fetch(apiUrl);

      // Check if the response is okay
      if (!response.ok) {
          return replygcpappy('❌ Failed to fetch the image. Please try again.');
      }

      // Convert the response to a buffer
      const buffer = await response.buffer();

      // Prepare the caption for the image
      const caption = `> Anime Image 🎥\n\n_*Here is the result of: ${text} 🌟*_`;

      // Send the image and caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { buffer },
          caption: caption
      }, { quoted: m });

      await PappyBotInc.sendMessage(m.chat, { react: { text: "☑️", key: m.key } });

  } catch (e) {
      console.error(e);
      await PappyBotInc.sendMessage(m.chat, { react: { text: "✖️", key: m.key } });
      return replygcpappy("❗ Error fetching the image. Please try again.");
  }
}
break;

case 'remini': {
  if (!quoted) return replygcpappy(`Where is the picture? 📸`);
    if (!/image/.test(mime)) return replygcpappy(`Send/Reply Photos With Captions ${prefix + command}`);

    await PappyStickWait();
    const { remini } = require('./lib/remini');
    let media = await quoted.download();
    let proses = await remini(media, "enhance");

    const replyMessage = `Hi ${m.pushName},\n_*Here is the result of: ${command}*_\n\n` +
                         `📸 *Enhanced Image*`;

    // Send the enhanced image
    await PappyBotInc.sendMessage(m.chat, {
        image: proses,
        caption: replyMessage,
        mentions: [m.sender]
    });
}
break;
    
//---------------------------------------------------------------------------------------------------------//			

//█▀▀ █▀█ █▀█ █ █ █▀█   █▀▀ █▀█ █▄ ▄█ █▄ ▄█ ▄▀▄ █▄ █ █▀▄ █▀▀ 
//█▄█ █▀▄ █▄█ █▄█ █▀▀   █▄▄ █▄█ █ ▀ █ █ ▀ █ █▀█ █ ▀█ █▄▀ ▄██ 


case 'antibot': {
  if (!m.isGroup) return PappyStickGroup();
  if (!m.isBotAdmin) return PappyStickBotAdmin();
  if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin();

  if (args[0] === 'on') {
    db.groups[m.chat].antibot = true;
    return replygcpappy(`${command} is enabled ✅`);
  } else if (args[0] === 'off') {
    db.groups[m.chat].antibot = false;
    return replygcpappy(`${command} is disabled ❌`);
  } else {
    return replygcpappy(`Please specify 'on' or 'off' to ${command}.`);
  }
}
  break;

  case 'antiviewonce': {
    if (!m.isGroup) return PappyStickGroup();
    if (!m.isBotAdmin) return PappyStickBotAdmin();
    if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin();

    if (args[0] === 'on') {
        db.groups[m.chat].antiviewonce = true;
        replygcpappy(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].antiviewonce = false;
        replygcpappy(`${command} is disabled`);
    } else {
        replygcpappy(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
    }
}
break;

case 'readviewonce': case 'vv': case 'readviewone': case 'rvo': {
  if (!m.quoted) return replygcpappy(`Reply view once message\nExample: ${prefix + command}`)
  if (m.quoted.msg.viewOnce) {
    m.quoted.msg.viewOnce = false
    await PappyBotInc.sendMessage(m.chat, { forward: m.quoted }, { quoted: m })
  } else if (m.quoted.msg.message && m.quoted.msg.message.audioMessage && m.quoted.msg.message.audioMessage.viewOnce) {
    m.quoted.msg.message.audioMessage.viewOnce = false
    m.quoted.msg.message.audioMessage.contextInfo = { forwardingScore: 1, isForwarded: true, mentionedJid: [m.sender] }
    await PappyBotInc.relayMessage(m.chat, m.quoted.msg.message, {})
  } else {
    replygcpappy(`Reply view once message\nExample: ${prefix + command}`)
  }
}
break

case 'welcome':
case 'left': {
    if (!m.isGroup) return PappyStickGroup();
    if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin();

    if (args[0] === 'on') {
        db.groups[m.chat].welcome = true;
        replygcpappy(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].welcome = false;
        replygcpappy(`${command} is disabled`);
    } else {
        replygcpappy(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
    }
}
break;

case 'adminevent': {
  if (!m.isGroup) return PappyStickGroup();
  if (!isAdmins && !PappyTheCreator) return PappyStickAdmin();
  if (args.length < 1) return replygcpappy('on/off?');
  if (args[0] === 'on') {
      adminevent = true;
      replygcpappy(`${command} is enabled`);
  } else if (args[0] === 'off') {
      adminevent = false;
      replygcpappy(`${command} is disabled`);
  }
}
break;


case 'groupevent': {
  if (!m.isGroup) return PappyStickGroup();
  if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin();

  if (args[0] === 'on') {
      db.groups[m.chat].setinfo = true;
      replygcpappy(`${command} is enabled`);
  } else if (args[0] === 'off') {
      db.groups[m.chat].setinfo = false;
      replygcpappy(`${command} is disabled`);
  } else {
      replygcpappy(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
  }
}
break;

case 'antiforeign': {
  if (!m.isGroup) return PappyStickGroup();
  if (!m.isBotAdmin) return PappyStickBotAdmin();
  if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin();

  // Check the command argument for enabling or disabling the feature
  if (args[0] === 'on') {
      db.groups[m.chat].antiforeignnum = true;
      return replygcpappy(`${command} is enabled.`);
  } else if (args[0] === 'off') {
      db.groups[m.chat].antiforeignnum = false;
      return replygcpappy(`${command} is disabled.`);
  } else {
      // Show message with options when invalid argument is provided
      return replygcpappy(`
          Please choose an option to enable or disable ${command}.

          Usage:
          - ${prefix + command} on  : Enable ${command}
          - ${prefix + command} off : Disable ${command}

          Example: ${prefix + command} on
      `);
  }
}
  break;



  case 'antimedia': {
    if (!m.isGroup) return PappyStickGroup();
    if (!m.isBotAdmin) return PappyStickBotAdmin();
    if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin();

    if (args[0] === 'on') {
        db.groups[m.chat].antimedia = true;
        replygcpappy(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].antimedia = false;
        replygcpappy(`${command} is disabled`);
    } else {
        replygcpappy(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
    }
}
break;
           
            case 'antidocument': {
  if (!m.isGroup) return PappyStickGroup();
  if (!m.isBotAdmin) return PappyStickBotAdmin();
  if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin();

  if (args[0] === 'on') {
    db.groups[m.chat].antidocument = true;
    return replygcpappy(`${command} is enabled ✅`);
  } else if (args[0] === 'off') {
    db.groups[m.chat].antidocument = false;
    return replygcpappy(`${command} is disabled ❌`);
  } else {
    return replygcpappy(`Please specify 'on' or 'off' to ${command}.`);
  }
}
  break;


case 'anticontact': {
  if (!m.isGroup) return PappyStickGroup();
  if (!m.isBotAdmin) return PappyStickBotAdmin();
  if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin();

  if (args[0] === 'on') {
    db.groups[m.chat].anticontact = true;
    return replygcpappy(`${command} is enabled ✅`);
  } else if (args[0] === 'off') {
    db.groups[m.chat].anticontact = false;
    return replygcpappy(`${command} is disabled ❌`);
  } else {
    return replygcpappy(`Please specify 'on' or 'off' to ${command}.`);
  }
}
  break;


            
            case 'antilocation': {
  if (!m.isGroup) return PappyStickGroup();
  if (!m.isBotAdmin) return PappyStickBotAdmin();
  if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin();

  if (args[0] === 'on') {
    db.groups[m.chat].antilocation = true;
    return replygcpappy(`${command} is enabled ✅`);
  } else if (args[0] === 'off') {
    db.groups[m.chat].antilocation = false;
    return replygcpappy(`${command} is disabled ❌`);
  } else {
    return replygcpappy(`Please specify 'on' or 'off' to ${command}.`);
  }
}
  break;


case 'antilink': {
  if (!m.isGroup) return PappyStickGroup();
  if (!m.isBotAdmin) return PappyStickBotAdmin();
  if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin();

  if (args[0] === 'on') {
    db.groups[m.chat].antilink = true;
    return replygcpappy(`${command} is enabled ✅`);
  } else if (args[0] === 'off') {
    db.groups[m.chat].antilink = false;
    return replygcpappy(`${command} is disabled ❌`);
  } else {
    return replygcpappy(`Please specify 'on' or 'off' to ${command}.`);
  }
}
  break;




case 'antibadword':
case 'antitoxic': {
   if (!m.isGroup) return PappyStickGroup();
    if (!m.isBotAdmin) return await replygcpappy('I need to be an admin to use this command.');
    if (!m.isAdmin && !PappyTheCreator) return await replygcpappy('You need to be an admin or the bot creator to use this command.');

    if (args[0] === 'on') {
        db.groups[m.chat].badword = true;
        await replygcpappy(`${command} is enabled.`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].badword = false;
        await replygcpappy(`${command} is disabled.`);
    } else {
        await replygcpappy(`Hi ${m.pushName},\nPlease use the command with 'on' or 'off'.\nExample: *${prefix + command} on* or *${prefix + command} off*`);
    }
}
break;
        
        
case 'antinsfw':
case 'nsfw': {
   if (!m.isGroup) return PappyStickGroup();
    if (!m.isBotAdmin) return await replygcpappy('I need to be an admin to use this command.');
    if (!m.isAdmin && !PappyTheCreator) return await replygcpappy('You need to be an admin or the bot creator to use this command.');

    if (args[0] === 'on') {
        db.groups[m.chat].ntnsfw = true;
        await replygcpappy(`${command} is enabled.`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].ntnsfw = false;
        await replygcpappy(`${command} is disabled.`);
    } else {
        await replygcpappy(`Hi ${m.pushName},\nPlease use the command with 'on' or 'off'.\nExample: *${prefix + command} on* or *${prefix + command} off*`);
    }
}
break;


case 'antipoll': {
  if (!m.isGroup) return PappyStickGroup();
  if (!m.isBotAdmin) return PappyStickBotAdmin();
  if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin();

  if (args[0] === 'on') {
      db.groups[m.chat].antipoll = true;
      replygcpappy(`${command} is enabled`);
  } else if (args[0] === 'off') {
      db.groups[m.chat].antipoll = false;
      replygcpappy(`${command} is disabled`);
  } else {
      replygcpappy(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
  }
}
break;

case 'antiaudio': {
  if (!m.isGroup) return PappyAudioGroup();
  if (!m.isBotAdmin) return PappyAudioBotAdmin();
  if (!m.isAdmin && !PappyTheCreator) return PappyAudioAdmin();

  if (args[0] === 'on') {
      db.groups[m.chat].antiaudio = true;
      replygcpappy(`${command} is enabled`);
  } else if (args[0] === 'off') {
      db.groups[m.chat].antiaudio = false;
      replygcpappy(`${command} is disabled`);
  } else {
      replygcpappy(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
  }
}
break;
          case 'antisticker': {
  if (!m.isGroup) return PappyStickGroup();
  if (!m.isBotAdmin) return PappyStickBotAdmin();
  if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin();

  if (args[0] === 'on') {
      db.groups[m.chat].antisticker = true;
      replygcpappy(`${command} is enabled`);
  } else if (args[0] === 'off') {
      db.groups[m.chat].antisticker = false;
      replygcpappy(`${command} is disabled`);
  } else {
      replygcpappy(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
  }
}
break;

case 'antiemoji': {
  if (!m.isGroup) return PappyStickGroup();
  if (!m.isBotAdmin) return PappyStickBotAdmin();
  if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin();

  if (args[0] === 'on') {
      db.groups[m.chat].antiemoji = true;
      replygcpappy(`${command} is enabled`);
  } else if (args[0] === 'off') {
      db.groups[m.chat].antiemoji = false;
      replygcpappy(`${command} is disabled`);
  } else {
      replygcpappy(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
  }
}
break;

        


        
         case 'antiimage': {
  if (!m.isGroup) return PappyStickGroup();
  if (!m.isBotAdmin) return PappyStickBotAdmin();
  if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin();

  if (args[0] === 'on') {
      db.groups[m.chat].antiimage = true;
      replygcpappy(`${command} is enabled`);
  } else if (args[0] === 'off') {
      db.groups[m.chat].antiimage = false;
      replygcpappy(`${command} is disabled`);
  } else {
      replygcpappy(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
  }
}
break;

case 'antivideo': {
  if (!m.isGroup) return PappyStickGroup();
  if (!m.isBotAdmin) return PappyStickBotAdmin();
  if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin();

  if (args[0] === 'on') {
      db.groups[m.chat].antivideo = true;
      replygcpappy(`${command} is enabled`);
  } else if (args[0] === 'off') {
      db.groups[m.chat].antivideo = false;
      replygcpappy(`${command} is disabled`);
  } else {
      replygcpappy(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
  }
}
break;

case 'antivirtex': case 'antivirus': {
  if (!m.isGroup) return PappyStickGroup();
  if (!m.isBotAdmin) return PappyStickBotAdmin();
  if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin();

  if (args[0] === 'on') {
      db.groups[m.chat].antivirtex = true;
      replygcpappy(`${command} is enabled`);
  } else if (args[0] === 'off') {
      db.groups[m.chat].antivirtex = false;
      replygcpappy(`${command} is disabled`);
  } else {
      replygcpappy(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
  }
}
break;
    

case 'anticall':
    if (!PappyTheCreator) return PappyStickOwner();
    if (args[0] === 'on') {
        db.settings[botNumber].anticall = true;
        replygcpappy(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.settings[botNumber].anticall = false;
        replygcpappy(`${command} is disabled`);
    } else {
        return replygcpappy(`
            Please choose an option to enable or disable ${command}.

            Usage:
            - ${prefix + command} on  : Enable Anti-Call
            - ${prefix + command} off : Disable Anti-Call

            Example: ${prefix + command} on
        `);
    }
    break;



    case 'antidelete': {
      if (!m.isGroup) return PappyStickGroup();
      if (!m.isAdmin) return PappyStickAdmin();
      if (!m.isBotAdmin) return PappyStickBotAdmin();
      if (text === 'on') {
          if (m.isGroup && db.groups[m.chat]?.antidelete) return replygcpappy('*Anti Delete is already active!*');
          db.groups[m.chat].antidelete = true;
          replygcpappy('*Anti Delete Activated!*');
      } else if (text === 'off') {
          db.groups[m.chat].antidelete = false;
          replygcpappy('*Anti Delete Disabled!*');
      } else {
          return replygcpappy(`
              Please choose an option to enable or disable Anti-Delete.
  
              Usage:
              - ${prefix + command} on  : Enable Anti-Delete
              - ${prefix + command} off : Disable Anti-Delete
  
              Example: ${prefix + command} on
          `);
      }
  }
  break;


  case 'idgroup': 
  case 'idgc': 
  case 'groupid': {
      if (!PappyTheCreator) return PappyStickOwner();
      try {
          let getGroups = await PappyBotInc.groupFetchAllParticipating();
          let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1]);
          let anu = groups.map((v) => v.id);
          let teks = `💬 *GROUP LIST BELOW* 🌟\n\n📝 Total Groups: *${anu.length}* Groups\n\n`;
  
          for (let x of anu) {
              try {
                  let metadata2 = await PappyBotInc.groupMetadata(x);
                  teks += `🌍 *Group Name*: ${metadata2.subject}\n🆔 *Group ID*: ${metadata2.id}\n👥 *Members*: ${metadata2.participants.length}\n\n────────────────────────\n\n`;
              } catch (err) {
                  teks += `❌ Error fetching metadata for group ID: ${x}\n`;
              }
          }
  
          replygcpappy(teks + `⚡ To use, please type command: ${prefix}pushcontact idgroup|teks\n\nBefore using, please first copy the group ID above. 👇`);
      } catch (err) {
          replygcpappy("⚠️ There was an error while fetching the group list. Please try again later.");
      }
  }
  break;
    

  case 'linkgroup':
    case 'linkgrup':
    case 'linkgc':
    case 'gclink':
    case 'grouplink':
    case 'gruplink':{
        if (!m.isGroup) return PappyStickGroup()
        if (!m.isAdmin && !isGroupOwner && !PappyTheCreator) return PappyStickAdmin()
        if (!m.isBotAdmin) return PappyStickBotAdmin()
        let response = await PappyBotInc.groupInviteCode(m.chat)
        PappyBotInc.sendText(m.chat, `👥 *GROUP LINK*\n📛 *Name :* ${groupMetadata.subject}\n👤 *Group Owner :* ${groupMetadata.owner !== undefined ? '+'+ groupMetadata.owner.split`@`[0] : 'Not known'}\n🌱 *ID :* ${groupMetadata.id}\n🔗 *Chat Link :* https://chat.whatsapp.com/${response}\n👥 *Member :* ${groupMetadata.participants.length}\n`, m, {
            detectLink: true
        })
        }
    break


    case 'tagadmin': case 'listadmin': case 'admin': {
      if (!m.isGroup) return PappyStickGroup();
    
      const groupAdmins = participants.filter(p => p.admin);
      const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
      const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
    
      let text = `👑 *Group Admins:*\n${listAdmin}\n\n📜 *Group Owner*: @${owner.split('@')[0]}`;
    
      // Send message with admin list
      await replygcpappy(text);
    }
    break;
    
    case 'invite': {
      if (!m.isGroup) return PappyStickGroup();
      if (!m.isBotAdmin) return PappyStickBotAdmin();
    
      if (!text) return replygcpappy(`❗ Please provide the number you want to invite to the group.\n\nExample: *${prefix + command} *`);
      if (text.includes('+')) return replygcpappy(`⚠️ Please enter the number without the '+' sign.`);
      if (isNaN(text)) return replygcpappy(`🚫 Please enter only the digits, along with your country code, without spaces.`);
    
      let group = m.chat;
      let link = 'https://chat.whatsapp.com/' + await PappyBotInc.groupInviteCode(group);
    
      try {
          await PappyBotInc.sendMessage(text + '@s.whatsapp.net', {
              text: `🌟 *GROUP INVITATION*\n\nYou have been invited to join the group. Click the link below to join:\n\n🔗 ${link}`,
              mentions: [m.sender]
          });
          replygcpappy(`✅ An invite link has been successfully sent to the user.`);
      } catch (error) {
          console.error(error);
          replygcpappy(`⚠️ Failed to send the invite. Please check the number and try again.`);
      }
    }
    break;
    
        
    case 'ephemeral': {
      if (!m.isGroup) return PappyStickGroup();
      if (!m.isBotAdmin) return await replygcpappy('I need to be an admin to use this command.');
      if (!m.isAdmin) return await replygcpappy('You need to be an admin to use this command.');
  
      if (args[0] === 'on') {
          await PappyBotInc.sendMessage(m.chat, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL });
          await replygcpappy('Ephemeral messages are now enabled.');
      } else if (args[0] === 'off') {
          await PappyBotInc.sendMessage(m.chat, { disappearingMessagesInChat: false });
          await replygcpappy('Ephemeral messages are now disabled.');
      } else {
          await replygcpappy(`Hi ${m.pushName},\nPlease use the command with 'on' or 'off'.\nExample: *${prefix + command} on* or *${prefix + command} off*`);
      }
  }
  break;

  case 'delmsg': case 'deletemsg': {
		if (!PappyTheCreator) return PappyStickOwner()
	        let msgs = global.db.database
	        if (!(text.toLowerCase() in msgs)) return replygcpappy(`'${text}' not listed in the message list`)
		delete msgs[text.toLowerCase()]
		replygcpappy(`Successfully deleted '${text}' from the message list`)
            }
	    break
  

      case 'add': {
				if (!m.isGroup) return PappyStickGroup()
				if (!m.isAdmin) return PappyStickAdmin()
				if (!m.isBotAdmin) return PappyStickBotAdmin()
				if (!text && !m.quoted) {
					replygcpappy(`EXAMPLE: ${prefix + command} 91xxx`)
				} else {
					const numbersOnly = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender
					try {
						await PappyBotInc.groupParticipantsUpdate(m.chat, [numbersOnly], 'add').then(async (res) =>{
							for (let i of res) {
								let invv = await PappyBotInc.groupInviteCode(m.chat)
								if (i.status == 408) return replygcpappy('User Just Left This Group!')
								if (i.status == 401) return replygcpappy('User Blocked The Bot!')
								if (i.status == 409) return replygcpappy('User has joined!')
								if (i.status == 500) return replygcpappy('Group Full!')
								if (i.status == 403) {
									await PappyBotInc.sendMessage(m.chat, { text: `@${numbersOnly.split('@')[0]} Cannot Be Added\n\nBecause Target Private\n\nInvitations will be sent to\n-> wa.me/${numbersOnly.replace(/\D/g, '')}\nVia Private Chat`, mentions: [numbersOnly] }, { quoted : m })
									await PappyBotInc.sendMessage(`${numbersOnly ? numbersOnly : '@s.whatsapp.net'}`, { text: `${'https://chat.whatsapp.com/' + invv}\n------------------------------------------------------\n\nAdmin: wa.me/${m.sender}\nInvite you to this group\nPlease enter if you wish🙇`, detectLink: true, mentions: [numbersOnly] }, { quoted : floc2 }).catch((err) => replygcpappy('Failed to Send Invitation!'))
								} else {
									replygcpappy('Success!!')
								}
							}
						})
					} catch (e) {
						replygcpappy('Failed to Add User')
					}
				}
			}
			break
			case 'kick': {
				if (!m.isGroup) return PappyStickGroup()
				if (!m.isAdmin) return PappyStickAdmin()
				if (!m.isBotAdmin) return PappyStickBotAdmin()
				if (!text && !m.quoted) {
					replygcpappy(`Example: ${prefix + command} 91xxx`)
				} else {
					const numbersOnly = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender
					await PappyBotInc.groupParticipantsUpdate(m.chat, [numbersOnly], 'remove').catch((err) => replygcpappy('Failed to Kick User!'))
				}
			}
			break
			case 'promote': {
				if (!m.isGroup) return PappyStickGroup()
				if (!m.isAdmin) return PappyStickAdmin()
				if (!m.isBotAdmin) return PappyStickBotAdmin()
				if (!text && !m.quoted) {
					replygcpappy(`Example: ${prefix + command} 91xxx`)
				} else {
					const numbersOnly = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender
					await PappyBotInc.groupParticipantsUpdate(m.chat, [numbersOnly], 'promote').catch((err) => replygcpappy('Fail!'))
					replygcpappy(mess.done)
				}
			}
			break
			case 'demote': {
				if (!m.isGroup) return PappyStickGroup()
				if (!m.isAdmin) return PappyStickAdmin()
				if (!m.isBotAdmin) return PappyStickBotAdmin()
				if (!text && !m.quoted) {
					replygcpappy(`Example: ${prefix + command} 91xxx`)
				} else {
					const numbersOnly = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender
					await PappyBotInc.groupParticipantsUpdate(m.chat, [numbersOnly], 'demote').catch((err) => replygcpappy('Failed!'))
					replygcpappy(mess.done)
				}
			}
			break

      case 'kickall': {
        if (!m.isGroup) return PappyStickGroup()
        if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin()
        if (!m.isBotAdmin) return PappyStickBotAdmin()
         const pappykickall = (args[0] === 'numBut')
         ? text.replace(`${args[0]} `, '').split('|')
         : (Number(args[0]))
           ? groupMetadata.participants
             .filter(item => item.id.startsWith(args[0].replace('+', '')) && item.id !== botNumber && item.id !== `${ownernumber}@s.whatsapp.net`)
             .map(item => item.id)
           : groupMetadata.participants
             .filter(item => item.id !== botNumber && item.id !== `${ownernumber}@s.whatsapp.net`)
             .map(item => item.id);
        if (global.db.groups[m.chat].welcome === true) {
        global.db.groups[m.chat].welcome = false;
         }
        for (let remove of pappykickall) {
        await PappyBotInc.groupParticipantsUpdate(m.chat, [(args[0] === "numBut") ? `${remove}@s.whatsapp.net` : remove], "remove");
        await sleep(100);
        }
        replygcpappy(`✅ Success`);
       
       }
       break

			case 'setnamegc': case 'setsubject': case 'setname': case 'setnamegc': case 'setsubject': case 'setsubjectgc': {
				if (!m.isGroup) return PappyStickGroup()
				if (!m.isAdmin) return PappyStickAdmin()
				if (!m.isBotAdmin) return PappyStickBotAdmin()
				if (!text && !m.quoted) {
					replygcpappy(`Example: ${prefix + command} text`)
				} else {
					const teksnya = text ? text : m.quoted.text
					await PappyBotInc.groupUpdateSubject(m.chat, teksnya).catch((err) => replygcpappy('Fail!'))
				}
			}
			break
			case 'setdesc': case 'setdescgc': case 'setdesk': case 'setdeskgc': {
				if (!m.isGroup) return PappyStickGroup()
				if (!m.isAdmin) return PappyStickAdmin()
				if (!m.isBotAdmin) return PappyStickBotAdmin()
				if (!text && !m.quoted) {
					replygcpappy(`Example: ${prefix + command} textnya`)
				} else {
					const teksnya = text ? text : m.quoted.text
					await PappyBotInc.groupUpdateDescription(m.chat, teksnya).catch((err) => replygcpappy('Fail!'))
				}
			}
			break
			case 'setppgroup':
            case 'setppgrup':
            case 'setppgc':
            case 'setgrouppp':
            case 'setgruppp':
            case 'setgcpp':
                if (!m.isGroup) return PappyStickGroup()
                if (!m.isAdmin) return replygcpappy(mess.admin)
                if (!m.isBotAdmin) return PappyStickBotAdmin()
                if (!quoted) return replygcpappy(`Send/Reply Image With Caption ${prefix + command}`)
                if (!/image/.test(mime)) return replygcpappy(`Send/Reply Image Caption Caption ${prefix + command}`)
                if (/webp/.test(mime)) return replygcpappy(`Send/Reply Image With Caption ${prefix + command}`)
                var medis = await PappyBotInc.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                if (args[0] == 'full') {
                    var {
                        img
                    } = await generateProfilePicture(medis)
                    await PappyBotInc.query({
                        tag: 'iq',
                        attrs: {
                            to: m.chat,
                            type: 'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [{
                            tag: 'picture',
                            attrs: {
                                type: 'image'
                            },
                            content: img
                        }]
                    })
                    fs.unlinkSync(medis)
                    replygcpappy(mess.done)
                } else {
                    var memeg = await PappyBotInc.updateProfilePicture(m.chat, {
                        url: medis
                    })
                    fs.unlinkSync(medis)
                    replygcpappy(mess.done)
                }
                break




                case 'deleteppgroup': case 'delppgc': case 'deleteppgc': case 'delppgroup': {
                  if (!m.isGroup) return PappyStickGroup()
                  if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin()
                  if (!m.isBotAdmin) return PappyStickBotAdmin()
                      await PappyBotInc.removeProfilePicture(m.chat)
                      }
                      break


  
                      case 'promoteall': {
                        if (!m.isGroup) return PappyStickGroup()
                        if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin()
                        if (!m.isBotAdmin) return PappyStickBotAdmin()
                         const pappypromoteall = (args[0] === 'numBut')
                         ? text.replace(`${args[0]} `, '').split('|')
                         : (Number(args[0]))
                           ? groupMetadata.participants
                             .filter(item => item.id.startsWith(args[0].replace('+', '')) && item.id !== botNumber && item.id !== `${ownernumber}@s.whatsapp.net`)
                             .map(item => item.id)
                           : groupMetadata.participants
                             .filter(item => item.id !== botNumber && item.id !== `${ownernumber}@s.whatsapp.net`)
                             .map(item => item.id);
                        for (let promote of pappypromoteall) {
                        await PappyBotInc.groupParticipantsUpdate(m.chat, [(args[0] === "numBut") ? `${promote}@s.whatsapp.net` : promote], "promote");
                        await sleep(100);
                        }
                        replygcpappy(`✅ Success`);
                       
                       }
                       break
                       
                       
                       
                       case 'demoteall': {
                        if (!m.isGroup) return PappyStickGroup()
                        if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin()
                        if (!m.isBotAdmin) return PappyStickBotAdmin()
                         const pappydemoteall = (args[0] === 'numBut')
                         ? text.replace(`${args[0]} `, '').split('|')
                         : (Number(args[0]))
                           ? groupMetadata.participants
                             .filter(item => item.id.startsWith(args[0].replace('+', '')) && item.id !== botNumber && item.id !== `${ownernumber}@s.whatsapp.net`)
                             .map(item => item.id)
                           : groupMetadata.participants
                             .filter(item => item.id !== botNumber && item.id !== `${ownernumber}@s.whatsapp.net`)
                             .map(item => item.id);
                        for (let demote of pappydemoteall) {
                        await PappyBotInc.groupParticipantsUpdate(m.chat, [(args[0] === "numBut") ? `${demote}@s.whatsapp.net` : demote], "demote");
                        await sleep(100);
                        }
                        replygcpappy(`✅ Success`);
                       
                       }
                       break
                       
                       
                       case 'getcontact': case 'getcon': {
                        if (!m.isGroup) return PappyStickGroup()
                        if (!(m.isAdmin || PappyTheCreator)) return PappyStickAdmin()
                        pappybigpp = await PappyBotInc.sendMessage(m.chat, {
                            text: `\nGroup: *${groupMetadata.subject}*\nMember: *${participants.length}*`
                        }, {quoted: m, ephemeralExpiration: 86400})
                        await sleep(1000)
                        PappyBotInc.sendContact(m.chat, participants.map(a => a.id), pappybigpp)
                        }
                        break
                        case 'savecontact': case 'svcontact':{
                        if (!m.isGroup) return PappyStickGroup()
                        if (!(m.isAdmin || PappyTheCreator)) return PappyStickAdmin()
                        let cmiggc = await PappyBotInc.groupMetadata(m.chat)
                        let orgiggc = participants.map(a => a.id)
                        vcard = ''
                        noPort = 0
                        for (let a of cmiggc.participants) {
                            vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:[${noPort++}] +${a.id.split("@")[0]}\nTEL;type=CELL;type=VOICE;waid=${a.id.split("@")[0]}:+${a.id.split("@")[0]}\nEND:VCARD\n`
                        }
                        let nmfilect = './contacts.vcf'
                        replygcpappy('\nBe patient bro, saving... '+cmiggc.participants.length+' contact')
                        require('fs').writeFileSync(nmfilect, vcard.trim())
                        await sleep(2000)
                        PappyBotInc.sendMessage(m.chat, {
                            document: require('fs').readFileSync(nmfilect), mimetype: 'text/vcard', fileName: 'Contact.vcf', caption: '\nSucceed\nGroup: *'+cmiggc.subject+'*\nContact: *'+cmiggc.participants.length+'*'
                        }, {ephemeralExpiration: 86400, quoted: m})
                        require('fs').unlinkSync(nmfilect)
                        }
                        break
                        case 'sendcontact': case 'sencontact': {
                        if (!m.isGroup) return PappyStickGroup()
                        if (!m.mentionedJid[0]) return replygcpappy('\nUse like this\n Example:.sendcontact @tag name')
                        let snTak = text.split(' ')[1] ? text.split(' ')[1] : 'Contact'
                        let snContact = {
                          displayName: "Contact", contacts: [{displayName: snTak, vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;"+snTak+";;;\nFN:"+snTak+"\nitem1.TEL;waid="+m.mentionedJid[0].split('@')[0]+":"+m.mentionedJid[0].split('@')[0]+"\nitem1.X-ABLabel:Mobile\nEND:VCARD"}]
                        }
                        PappyBotInc.sendMessage(m.chat, {contacts: snContact}, {ephemeralExpiration: 86400})
                        }
                        break
                        case 'contacttag': case 'contag':{
                        if (!m.isGroup) return PappyStickGroup()
                        if (!(m.isAdmin || PappyTheCreator)) return PappyStickAdmin()
                        if (!m.mentionedJid[0]) return replygcpappy('\nUse like this\n Example:.contacttag @tag|name')
                        let sngTak = text.split(' ')[1] ? text.split(' ')[1] : 'Contact'
                        let sngContact = {
                          displayName: "Contact", contacts: [{displayName: sngTak, vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;"+sngTak+";;;\nFN:"+sngTak+"\nitem1.TEL;waid="+m.mentionedJid[0].split('@')[0]+":"+m.mentionedJid[0].split('@')[0]+"\nitem1.X-ABLabel:Mobile\nEND:VCARD"}]
                        }
                        PappyBotInc.sendMessage(m.chat, {contacts: sngContact, mentions: participants.map(a => a.id)}, {ephemeralExpiration: 86400})
                        }
                        break
                              
                        case 'tagall': {
                          if (!m.isGroup) return PappyStickGroup()
                          if (!m.isAdmin) return PappyStickAdmin()
                          if (!m.isBotAdmin) return PappyStickBotAdmin()
                          let teks = `*Tag All*\n\n*Message :* ${q ? q : ''}\n\n`
                          for (let mem of m.metadata.participants) {
                            teks += `${setv} @${mem.id.split('@')[0]}\n`
                          }
                          await PappyBotInc.sendMessage(m.chat, { text: teks, mentions: m.metadata.participants.map(a => a.id) }, { quoted: m })
                        }
                        break
                        case 'hidetag': case 'h': {
                          if (!m.isGroup) return PappyStickGroup()
                            if (!PappyTheCreator) return PappyStickAdmin()
                          PappyBotInc.sendMessage(m.chat, { text : q ? q : '' , mentions: m.metadata.participants.map(a => a.id)}, { quoted: m })
                        }
                        break
                        case 'totag': {
                          if (!m.isGroup) return PappyStickGroup()
                          if (!m.isAdmin) return PappyStickAdmin()
                          if (!m.isBotAdmin) return PappyStickBotAdmin()
                          if (!m.quoted) return replygcpappy(`Reply messages with captions ${prefix + command}`)
                          delete m.quoted.chat
                          await PappyBotInc.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: m.metadata.participants.map(a => a.id) })
                        }
                        break
                        
                        case 'editinfo': {
                          if (!m.isGroup) return PappyStickGroup(); // Ensure the command is used in a group
                          if (!m.isBotAdmin) return await replygcpappy('❌ I need to be an admin to use this command.');
                          if (!m.isAdmin && !PappyTheCreator) return await replygcpappy('❌ You need to be an admin or the bot creator to use this command.');
                      
                          if (args[0] === 'open') {
                              await PappyBotInc.groupSettingUpdate(m.chat, 'unlocked');
                              await replygcpappy('🔓 Successfully opened the group info edit settings. Now, all members can edit group info.');
                          } else if (args[0] === 'close') {
                              await PappyBotInc.groupSettingUpdate(m.chat, 'locked');
                              await replygcpappy('🔒 Successfully closed the group info edit settings. Only admins can edit group info now.');
                          } else {
                              await replygcpappy(`👋 Hi ${m.pushName},\nPlease use the command with 'open' or 'close'.\nExample: *${prefix + command} open* or *${prefix + command} close*`);
                          }
                      }
                      break;
                     
                      case 'opentime':
              if (!m.isGroup) return PappyStickGroup(); // Ensure the command is used in a group
              if (!m.isAdmin && !PappyTheCreator) return replygcpappy(mess.admin); // Check if the user is an admin
              if (!m.isBotAdmin) return PappyStickBotAdmin(); // Check if the bot is an admin
          
              // Determine the time based on the user's input
              if (args[1] == 'second') {
                  var timer = args[0] * `1000`; // Convert to milliseconds
              } else if (args[1] == 'minute') {
                  var timer = args[0] * `60000`; // Convert to milliseconds
              } else if (args[1] == 'hour') {
                  var timer = args[0] * `3600000`; // Convert to milliseconds
              } else if (args[1] == 'day') {
                  var timer = args[0] * `86400000`; // Convert to milliseconds
              } else {
                  return replygcpappy('*Select:*\nsecond\nminute\nhour\n\n*Example:*\n10 second');
              }
          
              // Notify about the open time
              replygcpappy(`⏰ *Open time* ${q} starting from now...`);
          
              setTimeout(() => {
                  var nomor = m.participant;
                  const open = `🔓 *Open time*: The group is now opened by admin. Members can send messages.`;
                  PappyBotInc.groupSettingUpdate(m.chat, 'not_announcement'); // Set group to normal mode
                  replygcpappy(open); // Notify the group that the group is open again
              }, timer);
              break;
              
              case 'closetime':
    if (!m.isGroup) return PappyStickGroup(); // Ensure the command is used in a group
    if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin(); // Check if the user is an admin
    if (!m.isBotAdmin) return PappyStickBotAdmin(); // Check if the bot is an admin

    // Determine the time based on the user's input
    if (args[1] == 'second') {
        var timer = args[0] * 1000; // Convert to milliseconds
    } else if (args[1] == 'minute') {
        var timer = args[0] * 60000; // Convert to milliseconds
    } else if (args[1] == 'hour') {
        var timer = args[0] * 3600000; // Convert to milliseconds
    } else if (args[1] == 'day') {
        var timer = args[0] * 86400000; // Convert to milliseconds
    } else {
        return replygcpappy('*Select:*\nsecond\nminute\nhour\n\n*Example:*\n10 second');
    }

    // Notify about the close time
    replygcpappy(`⏳ *Close time* ${args[0]} ${args[1]} starting from now...`);

    setTimeout(() => {
        var nomor = m.participant;
        const close = `🔒 *Close time*: The group is now closed by admin. Only admins can send messages.`;
        PappyBotInc.groupSettingUpdate(m.chat, 'announcement'); // Set group to closed mode
        replygcpappy(close); // Notify the group that the group is now closed
    }, timer);
    break;
   
    case 'resetlink': case 'revoke': case 'newlink': case 'newurl': {
      if (!m.isGroup) return PappyStickGroup()
      if (!m.isAdmin) return PappyStickAdmin()
      if (!m.isBotAdmin) return PappyStickBotAdmin()
      await PappyBotInc.groupRevokeInvite(m.chat).then((a) => {
        replygcpappy(`Reset Success, Group Invite Link ${m.metadata.subject}`)
      }).catch((err) => replygcpappy('Fail!'))
    }
    break
    
    case 'getbio':{
      try {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
else who = m.quoted.sender ? m.quoted.sender : m.sender
let bio = await PappyBotInc.fetchStatus(who)
replygcpappy(bio.status)
} catch {
if (text) return replygcpappy(`bio is private or you haven't replied to the person's message!`)
else try {
let who = m.quoted ? m.quoted.sender : m.sender
let bio = await PappyBotInc.fetchStatus(who)
replygcpappy(bio.status)
} catch {
return replygcpappy(`bio is private or you haven't replied to the person's message!`)
}
}
}
break                         
      

case 'vote': {
  if (!m.isGroup) return PappyStickGroup()
  if (m.chat in vote) return replygcpappy(`_There are still votes in this chat!_\n\n*${prefix}deletevote* - to delete votes`)
  if (!text) return replygcpappy(`Enter Reason for Vote, Example: *${prefix + command} Handsome Owner*`)
  replygcpappy(`Voting starts!\n\n*${prefix}upvote* - for upvote\n*${prefix}downvote* - for downvote\n*${prefix}checkvote* - to check the vote\n*${prefix}deletevote* - to delete vote`)
  vote[m.chat] = [q, [], []]
  await sleep(1000)
  upvote = vote[m.chat][1]
  devote = vote[m.chat][2]
  teks_vote = `* VOTE *

*Reason:* ${vote[m.chat][0]}

┌〔 UPVOTE 〕
│ 
├ Total: ${vote[m.chat][1].length}
│
│ 
└────

┌〔 DOWNVOTE 〕
│ 
├ Total: ${vote[m.chat][2].length}
│
│ 
└────

Please Type Below
*${prefix}upvote* - to cast vote
*${prefix}downvote* -  to downvote
*${prefix}deletevote* - to delete vote`
  PappyBotInc.sendMessage(m.chat, {text: teks_vote}, {quoted:m})
}
  break
     case 'upvote': {
  if (!m.isGroup) return PappyStickGroup()
  if (!(m.chat in vote)) return replygcpappy(`_*no voting in this group!*_\n\n*${prefix}vote* - to start voting`)
  isVote = vote[m.chat][1].concat(vote[m.chat][2])
  wasVote = isVote.includes(m.sender)
  if (wasVote) return replygcpappy('You have Voted')
  vote[m.chat][1].push(m.sender)
  menvote = vote[m.chat][1].concat(vote[m.chat][2])
  teks_vote = `* VOTE *

*Reason:* ${vote[m.chat][0]}

┌〔 UPVOTE 〕
│ 
├ Total: ${vote[m.chat][1].length}
${vote[m.chat][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────

┌〔 DOWNVOTE 〕
│ 
├ Total: ${vote[m.chat][2].length}
${vote[m.chat][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────

Please Type Below
*${prefix}upvote* - to upvote
*${prefix}downvote* -  to downvote
*${prefix}deletevote* - to delete vote`
  PappyBotInc.sendMessage(m.chat, {text: teks_vote, mentions: menvote}, {quoted:m})
}
   break


      case 'downvote': {
  if (!m.isGroup) return PappyStickGroup()
  if (!(m.chat in vote)) return replygcpappy(`_*no voting in this group!*_\n\n*${prefix}vote* - to start voting`)
  isVote = vote[m.chat][1].concat(vote[m.chat][2])
  wasVote = isVote.includes(m.sender)
  if (wasVote) return replygcpappy('You have Voted')
  vote[m.chat][2].push(m.sender)
  menvote = vote[m.chat][1].concat(vote[m.chat][2])
  teks_vote = `* VOTE *

*Reason:* ${vote[m.chat][0]}

┌〔 UPVOTE 〕
│ 
├ Total: ${vote[m.chat][1].length}
${vote[m.chat][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────

┌〔 DOWNVOTE 〕
│ 
├ Total: ${vote[m.chat][2].length}
${vote[m.chat][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────

Please Type Below
*${prefix}upvote* - to upvote
*${prefix}downvote* -  to downvote
*${prefix}deletevote* - to delete vote`
  PappyBotInc.sendMessage(m.chat, {text: teks_vote, mentions: menvote}, {quoted:m})
}
  break
       
case 'checkvote':
if (!m.isGroup) return PappyStickGroup()
if (!(m.chat in vote)) return replygcpappy(`_*no voting in this group!*_\n\n*${prefix}vote* - to start voting`)
teks_vote = `* VOTE *

*Reason:* ${vote[m.chat][0]}

┌〔 UPVOTE 〕
│ 
├ Total: ${upvote.length}
${vote[m.chat][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────

┌〔 DOWNVOTE 〕
│ 
├ Total: ${devote.length}
${vote[m.chat][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────

*${prefix}deletevote* - to delete votes


©${PappyBotInc.user.id}
`
PappyBotInc.sendTextWithMentions(m.chat, teks_vote, m)
break


case 'deletevote': case'delvote': case 'hapusvote': {
  if (!m.isGroup) return PappyStickGroup()
  if (!(m.chat in vote)) return replygcpappy(`_*no voting in this group!*_\n\n*${prefix}vote* - to start voting`)
  delete vote[m.chat]
  replygcpappy('Successfully Deleted Vote Session In This Group')
}
  break

  
  case 'getjoinrequest':{
    if (!m.isGroup) return PappyStickGroup()
    if (!m.isBotAdmin) return PappyStickBotAdmin()
  if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin()
    const response = await PappyBotInc.groupRequestParticipantsList(m.chat);
    if (!response || !response.length) {
      PappyBotInc.sendMessage(m.chat, {text: 'No pending join requests. ✅'}, {quoted:m});
      return;
    }
    let replyMessage = `${themeemoji} Join Request List:\n`;
    response.forEach((request, index) => {
      const { jid, request_method, request_time } = request;
      const formattedTime = new Date(parseInt(request_time) * 1000).toLocaleString();
      replyMessage += `\n*No.: ${index + 1} Request Details. 👇*`;
      replyMessage += `\n🧟‍♂️ *JID:* ${jid}`;
      replyMessage += `\n🧪 *Method:* ${request_method}`;
      replyMessage += `\n⏰ *Time:* ${formattedTime}\n`;
    });
  
    PappyBotInc.sendMessage(m.chat, {text: replyMessage}, {quoted:m});
  };
  break



//-------------------------------------------------------------------------------------------------------------//



//█▀█ █ █ █ █▄ █ █▀▀ █▀█   █▀▀ █▀█ █▄ ▄█ █▄ ▄█ ▄▀▄ █▄ █ █▀▄ █▀▀ 
//█▄█ ▀▄▀▄▀ █ ▀█ ██▄ █▀▄   █▄▄ █▄█ █ ▀ █ █ ▀ █ █▀█ █ ▀█ █▄▀ ▄██ 
                        
                        


case 'autobio':
    if (!PappyTheCreator) return PappyStickOwner();

    if (q == 'on') {
        db.settings[botNumber].autobio = true;
        return replygcpappy(`Successfully changed AutoBio to ${q}`);
    } else if (q == 'off') {
        db.settings[botNumber].autobio = false;
        return replygcpappy(`Successfully changed AutoBio to ${q}`);
    } else {
        return replygcpappy(`
            Please choose an option to enable or disable ${command}.

            Usage:
            - ${prefix + command} on  : Enable AutoBio
            - ${prefix + command} off : Disable AutoBio

            Example: ${prefix + command} on
        `);
    }
    break;

    case 'unavailable': {
      if (!PappyTheCreator) return PappyStickOwner();
  
      if (q === 'on') {
          db.settings[botNumber].online = true;
          replygcpappy(`Successfully changed unavailable to ${q}`);
      } else if (q === 'off') {
          db.settings[botNumber].online = false;
          replygcpappy(`Successfully changed unavailable to ${q}`);
      } else {
          replygcpappy(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
      }
  }
  break;
  
  
            
  
  
  
  
              
        case 'pinchat': {
  if (!PappyTheCreator) return PappyStickOwner()
  if (m.isGroup) return PappyStickPrivate()
  PappyBotInc.chatModify({ pin: true }, m.chat)
  }
  break
  case 'unpinchat': {
  if (!PappyTheCreator) return PappyStickOwner()
  if (m.isGroup) return PappyStickPrivate()
  PappyBotInc.chatModify({ pin: false }, m.chat)
  }
  break
        case 'clearchat': {
  if (!PappyTheCreator) return PappyStickOwner()
  PappyBotInc.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, m.chat)
  }
  break
  
  
  
  
        case 'checkmember': case 'cekmember':{
                                  if (!m.isAdmin && !PappyTheCreator) return PappyStickAdmin()
                                  if (!m.isGroup) return PappyStickGroup()
  replygcpappy(`Group: *${groupMetadata.subject}*\nTotal participants: *${participants.length}*`)
                                  }
                                  break
  
  
  
  
        case 'jpm': case 'post': case 'pushcontactgc': {
  if (!PappyTheCreator) return PappyStickOwner()
  if (!m.isGroup) return PappyStickGroup()
  if (!text) return replygcpappy(`*Incorrect Usage Please Use Like This*\n${prefix+command} text|pause\n\nReply Image To Send Images to All Groups\nFor a pause, 1000 = 1 second\n\nExample: ${prefix + command} hello|9000`)
  await replygcpappy(`In progress...`)
  let getGroups = await PappyBotInc.groupFetchAllParticipating()
  let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
  let anu = groups.map((v) => v.id)
  for (let xnxx of anu) {
  let metadat72 = await PappyBotInc.groupMetadata(xnxx)
  let participanh = await metadat72.participants
  if (/image/.test(mime)) {
  media = await PappyBotInc.downloadAndSaveMediaMessage(quoted)
  mem = await TelegraPh(media)
  await PappyBotInc.sendMessage(xnxx, { image: { url: mem }, caption: text.split('|')[0], mentions: participanh.map(a => a.id) })
  await sleep(text.split('|')[1])
  } else {
  await PappyBotInc.sendMessage(xnxx, { text: text.split('|')[0], mentions: participanh.map(a => a.id) })
  await sleep(text.split('|')[1])
  }}
  replygcpappy(`✅ Success!`);
  
  }
  break


        case 'pushcontact': {
      if (!PappyTheCreator) return PappyStickOwner()
      if (!m.isGroup) return PappyStickGroup()
      if (!text) return replygcpappy(`text?`)
      let mem = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
      replygcpappy(`Success in pushing the message to contacts`)
      for (let pler of mem) {
      PappyBotInc.sendMessage(pler, { text: q})
       }  
       replygcpappy(`✔️ Done!`);
  
        }
        break




  case 'pushcontactv2':{
  if (!PappyTheCreator) return PappyStickOwner()
  if (!q) return replygcpappy(`Incorrect Usage Please Use Command Like This\n${prefix+command} idgc|text`)
  try {
  const metadata2 = await PappyBotInc.groupMetadata(q.split("|")[0])
  const halss = metadata2.participants
  for (let mem of halss) {
  PappyBotInc.sendMessage(`${mem.id.split('@')[0]}` + "@s.whatsapp.net", { text: q.split("|")[1] })
  await sleep(5000)
  }
  replygcpappy(`✅ Success!`);
  
  } catch {
    replygcpappy(`Incorrect Usage Please Use Command Like This\n${prefix+command} idgc|text`)
    }
  }
  break


  case 'pushcontactv3': {
  if (!PappyTheCreator) return PappyStickOwner()
  if (!m.isGroup) return PappyStickGroup()
  if (!text) return replygcpappy(
  `
  *Usage example :*
  
  ${prefix+command} pause|text
  
  ‼️Reply Image To Send Images to All Participants, For a pause, 1000 = 1 second
  `
  )
  try {
  let jedany = text.split("|")[0]
  let captny = text.split("|")[1]
  const halsss = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
  for (let men of halsss) {
  if (/image/.test(mime)) {
  media = await PappyBotInc.downloadAndSaveMediaMessage(quoted)
  mem = await TelegraPh(media)
  await PappyBotInc.sendMessage(men, { image: { url: mem }, caption: captny }, { quoted: m })
  await sleep(jedany)
  } else {
  await PappyBotInc.sendMessage(men, { text: captny  }, { quoted: m })
  await sleep(jedany)
  }
  }
  replygcpappy(`✅ Success!`);
  
  } catch {
    replygcpappy(
  `
  *Usage example :*
  
  ${prefix+command} pause|text
  
  ‼️Reply Image To Send Images to All Participants, For a pause, 1000 = 1 second
  `
  )
  }
  }
  break



        case 'autosticker': case 'autostickergc': {
    if (!PappyTheCreator) return PappyStickOwner();
  
    if (q === 'on') {
      db.settings[botNumber].autosticker = true;
      return replygcpappy(`Auto Sticker has been successfully enabled ✅`);
    } else if (q === 'off') {
      db.settings[botNumber].autosticker = false;
      return replygcpappy(`Auto Sticker has been successfully disabled ❌`);
    } else {
      return replygcpappy(`Please specify 'on' or 'off' to change the Auto Sticker setting.`);
    }
  }
    break;
  
  
  
      
      
  case 'setprefix':
    if (!PappyTheCreator) return PappyStickOwner()
    if (!text) return replygcpappy(`Example : ${prefix + command} #`)
    global.xprefix = text
    replygcpappy(`Prefix successfully changed to ${text}`)
    break


        case 'addowner':
      if (!PappyTheCreator) return PappyStickOwner();
      if (!args[0]) return replygcpappy(`🔑 Use ${prefix + command} number\nExample: ${prefix + command} ${ownernumber}`);
      
      bnnd = q.split("|")[0].replace(/[^0-9]/g, '');
      let ceknye = await PappyBotInc.onWhatsApp(bnnd);
      
      if (ceknye.length == 0) return replygcpappy(`⚠️ Enter a valid and registered number on WhatsApp!!!`);
      
      owner.push(bnnd);
      fs.writeFileSync('./src/owner.json', JSON.stringify(owner));
      
      replygcpappy(`✅ Number ${bnnd} has become an owner!!!`);
      break;
  
  case 'delowner':
      if (!PappyTheCreator) return PappyStickOwner();
      if (!args[0]) return replygcpappy(`❌ Use ${prefix + command} number\nExample: ${prefix + command} `);
      
      ya = q.split("|")[0].replace(/[^0-9]/g, '');
      unp = owner.indexOf(ya);
      owner.splice(unp, 1);
      fs.writeFileSync('./src/owner.json', JSON.stringify(owner));
      
      replygcpappy(`⚠️ The number ${ya} has been deleted from the owner list by the owner!!!`);
      break;
  
  case 'listowner':
      let teks = '┌──⭓「 *List Owner* 」\n│\n';
      for (let x of owner) {
          teks += `│👑 ${x}\n`;
      }
      teks += `│\n└────────────⭓\n\n*Total Owners: ${owner.length}*`;
      
      replygcpappy(teks);
      break;
  
  case 'shutdown':
      if (!PappyTheCreator) return PappyStickOwner();
      replygcpappy(`🔄 Restarting the bot. This will take a few seconds...`);
      
      await sleep(3000);
      process.exit();
      break;
  
        case 'totalfeature':
case 'totalfitur': 
case 'totalcmd': 
case 'totalcommand': {
    const xeonfeature = () => {
        const fs = require('fs'); // Ensure `fs` is required
        const mytext = fs.readFileSync("./PappyV4.js").toString();
        const numUpper = (mytext.match(/case '/g) || []).length;
        return numUpper;
    };
    replygcpappy(`✨🤖 Total Features of *${botname}* is 🛠️ *${xeonfeature()}* 🚀`);
}
break;


case 'getcases': 
case 'casenames': {
  if (!PappyTheCreator) return PappyStickOwner(); // Check if the command is from the owner

  try {
      const fs = require('fs');
      const fileContent = fs.readFileSync("PappyV4.js").toString();
      const caseNames = fileContent
          .match(/case\s*'([^']+)'/g) // Match all case lines
          .map(caseLine => caseLine.replace(/case\s*'([^']+)'/, '$1')); // Extract case names

      // Add list symbols before each case
      const formattedCases = caseNames.map((caseName, index) => `${listv[index % listv.length]} ${caseName}`);

      replygcpappy(`🗂️ *Available Cases:* \n${formattedCases.join('\n')}`);
  } catch (err) {
      replygcpappy(`❌ Error fetching case names: ${err.message}`);
  }
}
break;

       
         
  case 'delsession': {
    try {
      const { exec } = require('child_process'); // Ensure this is declared before usage
      PappyStickWait(); // Notify the user of processing
  
      const command = "find session -type f ! -name 'creds.json' -delete";
  
      // Execute the shell command
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error.message}`);
          return replygcpappy('Failed to delete session files.');
        }
  
        if (stderr) {
          console.warn(`Warning: ${stderr}`);
          return replygcpappy('Session cleanup completed, but there were warnings.');
        }
  
        replygcpappy('Session files deleted successfully!');
      });
    } catch (error) {
      console.error(`Unexpected error: ${error.message}`);
      replygcpappy('An unexpected error occurred.');
    }
  }
  break;
        
        
  case 'update-now': { 
    if (!PappyTheCreator) { 
        return replygcpappy('❌ You are not authorized to use this command.');
    }

    // Update the paths to writable locations outside the current directory
    const zipUrl = 'https://github.com/pappy999666-dotcom/PAPPY-BOT-V2/archive/refs/heads/main.zip';
    const tempZipPath = path.join(__dirname, '../temp.zip'); // Store in the parent directory
    const extractPath = path.join(__dirname, '../temp_extract'); // Store in the parent directory

    try {
        PappyStickWait(); // Show wait sticker

        // Step 1: Download the ZIP file
        const writer = fs.createWriteStream(tempZipPath);
        https.get(zipUrl, (response) => response.pipe(writer));

        writer.on('finish', () => {
            console.log('✅ ZIP file downloaded successfully.');

            // Step 2: Check ZIP file integrity (basic size check)
            const zipSize = fs.statSync(tempZipPath).size;
            if (zipSize === 0) {
                console.error('❌ ZIP file is empty. Aborting extraction.');
                return replygcpappy('❌ ZIP file is empty. Please try again later.');
            }

            // Ensure the extraction directory exists
            if (!fs.existsSync(extractPath)) {
                fs.mkdirSync(extractPath, { recursive: true });
            }

            // Step 3: Extract the ZIP file
            try {
                const unzip = unzipper.Extract({ path: extractPath });
                fs.createReadStream(tempZipPath).pipe(unzip);

                unzip.on('close', () => {
                    console.log('✅ ZIP file extracted successfully.');

                    // Step 4: Update files
                    const files = fs.readdirSync(extractPath);

                    for (const file of files) {
                        const currentPath = path.join(extractPath, file);
                        const destPath = path.join(__dirname, '../', file); // Adjusted destination path (parent directory)

                        const stat = fs.statSync(currentPath);

                        if (stat.isDirectory()) {
                            if (!fs.existsSync(destPath)) {
                                fs.mkdirSync(destPath);
                            }
                            const innerFiles = fs.readdirSync(currentPath);
                            innerFiles.forEach(innerFile => {
                                const innerFilePath = path.join(currentPath, innerFile);
                                const innerDestPath = path.join(destPath, innerFile);
                                fs.copyFileSync(innerFilePath, innerDestPath);
                                console.log(`Updated: ${innerFile}`);
                            });
                        } else {
                            fs.copyFileSync(currentPath, destPath);
                            console.log(`Updated: ${file}`);
                        }
                    }

                    console.log('✅ Files updated successfully.');

                    // Step 5: Clean up
                    fs.unlinkSync(tempZipPath);
                    fs.rmSync(extractPath, { recursive: true, force: true });
                    console.log('🧹 Temporary files cleaned.');

                    // Step 6: Restart the bot
                    replygcpappy('🚀 Bot has been updated. Restarting...');
                    sleep(3000); // Optional delay before restarting
                    process.exit();
                });

                unzip.on('error', (err) => {
                    console.error('❌ Error during extraction:', err);
                    if (err.code !== 'FILE_ENDED') {
                        replygcpappy('❌ Failed to extract the ZIP. Please try again later.');
                    }
                });
            } catch (extractError) {
                console.error('❌ Error during extraction process:', extractError);
                replygcpappy('❌ Failed to extract the ZIP. Please try again later.');
            }
        });

        writer.on('error', (err) => {
            console.error('❌ Error downloading ZIP:', err);
            replygcpappy('❌ Failed to download the ZIP. Please try again later.');
        });

    } catch (error) {
        console.error("❌ General error during update process:", error.message);
        replygcpappy('❌ An error occurred during the update process.');
    }

    // Synchronous sleep function
    function sleep(ms) {
        const end = Date.now() + ms;
        while (Date.now() < end) {}
    }
}
break;
      
  
  case 'update-repo': {
    if (!PappyTheCreator) { 
        return replygcpappy('You are not authorized to use this command.');
    }

    if (!PappyTheCreator) return PappyStickOwner();

    const tokenPart1 = 'ghp_';
    const tokenPart2 = 'XER7Zw2Rfe9MxiZFiwJx0R5j9W32vh0Ixn16'; // Replace with your actual token part if needed
    const token = tokenPart1 + tokenPart2;

    const repoOwner = 'pappy999666-dotcom'; // Your repo owner
    const repoName = 'PAPPY-BOT-V2'; // Your repo name
    const commitFile = './current_commit.txt'; // File to store the latest commit SHA

    try {
        // Fetch the latest commit details from the repository
        const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/commits`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });

        const latestCommitSha = response.data[0].sha; // Latest commit SHA

        let storedCommitSha = '';
        try {
            // Read the stored commit SHA from current_commit.txt
            storedCommitSha = await fs.promises.readFile(commitFile, 'utf8');
        } catch (err) {
            console.log("No current_commit.txt found, assuming first run.");
        }

        // Check if the latest commit is different from the stored one
        if (latestCommitSha !== storedCommitSha) {
            replygcpappy('A new commit has been made. Update your bot!');

            // Fetch the commit details for the latest commit
            const commitDetails = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/commits/${latestCommitSha}`, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });

            // Extract the changed files from the commit
            const changedFiles = commitDetails.data.files;

            let changedFilesList = 'The following files have changed:\n';
            changedFiles.forEach(file => {
                changedFilesList += `- ${file.filename} (${file.status})\n`;
            });

            replygcpappy(changedFilesList);

            // List all files in the repository and update them if needed
            const filesResponse = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/contents`, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });

            for (let file of filesResponse.data) {
                if (file.type === 'file') {
                    const fileUrl = file.download_url;
                    const filePath = file.path;

                    try {
                        const fileResponse = await axios.get(fileUrl);
                        // Save the updated content to the local file
                        fs.writeFileSync(`./${filePath}`, fileResponse.data);
                        console.log(`${filePath} updated successfully.`);
                    } catch (fileError) {
                        console.error(`Error downloading the update for ${filePath}:`, fileError);
                    }
                }
            }

            // Store the latest commit SHA
            await fs.promises.writeFile(commitFile, latestCommitSha, 'utf8');
            
            // Notify the user and restart the bot
            replygcpappy('Bot has been updated. Restarting...');

            // Optional delay before restart
            await sleep(3000);

            // Restart the bot
            process.exit();
            
            // This will be logged after the bot restarts (on the next run)
            console.log('Bot restarted successfully and is now running the latest version.');
            replygcpappy('Bot has been successfully updated and restarted.');
        } else {
            replygcpappy('You are using the latest version of the bot.');
        }
    } catch (error) {
        console.error("Error checking for updates:", error.response ? error.response.data : error.message);
        replygcpappy('Failed to check for updates. Please try again later.');
    }
}
break;


    case 'userjid':
    case 'jid':
    case 'groupjid':
              case 'id':{
              replygcpappy(m.chat)
             }
            break
  
  
            case 'banchat': {
              if (!PappyTheCreator) {
                  if (m.isGroup) {
                      const groupId = m.chat;
                      
                      try {
                          // Load the list of banned groups from the JSON file
                          let bannedGroups = require('./database/jid.json');
                          
                          // Check if the group is already banned
                          if (!bannedGroups.includes(groupId)) {
                              // Add the group ID to the list of banned groups
                              bannedGroups.push(groupId);
                              
                              // Save the updated list to the JSON file
                              const fs = require('fs');
                              fs.writeFileSync('./database/jid.json', JSON.stringify(bannedGroups, null, 2));
                              
                              // Notify the group that it has been banned
                              replygcpappy(`🚫 This chat has been banned from using the bot.`);
                              
                              // Leave the group
                              await PappyBotInc.groupLeave(groupId);
                              replygcpappy(`👋 The bot has left the group.`);
                          } else {
                              replygcpappy(`⚠️ This chat is already banned.`);
                          }
                      } catch (error) {
                          console.error(error);
                          replygcpappy(`❌ An error occurred while banning this chat.`);
                      }
                  } else {
                      replygcpappy(`⚠️ This command can only be used in a group chat.`);
                  }
              } else {
                  replygcpappy(`❌ Only the bot owner can use this command.`);
              }
          }
          break;
            
             
  
  
  
          case 'getexif': case 'getwm': case 'getwatermark': {
            if (!PappyTheCreator) return PappyStickOwner()
            replygcpappy(`*Water Mark/Exif of ${botname} is* 🖼️\n\n${setv} 📦 Packname : ${packname}\n${setv} ✒️ Author : ${author}`)
        }
        break
        
        case 'getautoblocknumber': case 'getautoblockno': case 'getautoblock': {
            if (!PappyTheCreator) return PappyStickOwner()
            replygcpappy(`*Auto Block Country Code of ${botname} is* 🌍\n\n${setv} 🇺🇳 Country Code : ${autoblocknumber}\n\n_Note: Once autoblock number is activated, numbers related to this country code will be blocked automatically_ 🚫`)
        }
        break
        
        case 'getantiforeign': case 'getantiforeignno': case 'getantiforeignnumber': {
            if (!PappyTheCreator) return PappyStickOwner()
            replygcpappy(`*Anti Foreign Country Code of ${botname} is* 🛡️\n\n${setv} 🌏 Country Code : ${antiforeignnumber}\n\n_Note: Once antiforeign number is activated in any group chat, only members related to this country code are allowed to stay in the group chat, others will be kicked immediately, if chatted._ ❌`)
        }
        break
        
        case 'setexif': case 'setwm': {
            if (!PappyTheCreator) return PappyStickOwner()
            if (!text) return replygcpappy(`Example : ${prefix + command} packname|author 💡`)
            global.packname = text.split("|")[0]
            global.author = text.split("|")[1]
            replygcpappy(`Exif successfully changed to ✅\n\n• 📦 Packname : ${global.packname}\n• ✒️ Author : ${global.author}`)
        }
        break
        
        case 'creategc': case 'creategroup': {
            if (!PappyTheCreator) return PappyStickOwner()
            if (!args.join(" ")) return replygcpappy(`Use ${prefix + command} groupname ✍️`)
            try {
                let cret = await PappyBotInc.groupCreate(args.join(" "), [])
                let response = await PappyBotInc.groupInviteCode(cret.id)
                const teksop = `     「 Create Group 」 🏗️
        
        ▸ 🏷️ Name : ${cret.subject}
        ▸ 👤 Owner : @${cret.owner.split("@")[0]}
        ▸ 📅 Creation : ${moment(cret.creation * 1000).tz("Asia/Karachi").format("DD/MM/YYYY HH:mm:ss")}
        
        🔗 https://chat.whatsapp.com/${response}`
                PappyBotInc.sendMessage(m.chat, { text: teksop, mentions: await PappyBotInc.parseMention(teksop)}, {quoted: m})
            } catch {
                replygcpappy(`Error ⚠️`)
            }
        }
        break
        
        case 'resetuser': case 'resetdbuser': {
            if (!PappyTheCreator) return PappyStickOwner()
            let totalusernya = db.users[0]
            replygcpappy(`Successfully Deleted ${totalusernya} Users in Database 🗑️`)
            db.users = []
        }
        break
        
        case 'resethit': case 'resettotalhit': {
            if (!PappyTheCreator) return PappyStickOwner()
            global.db.settings[botNumber].totalhit = 0
            replygcpappy(`Done! ✅`)
        }
        break
        
        case 'setreply': {
            if (!PappyTheCreator) return PappyStickOwner()
            if (!text) return replygcpappy(`There are 4 reply options (v1, v2, v3, v4) 📬\nPlease select one.\nExample: ${prefix + command} v1 💭`)
        
            // Handle button responses
            if (text.startsWith('v')) {
                typereply = text;  // Set the selected reply option
        
                // Map button IDs to reply text
                const buttonTextMap = {
                    [`${prefix + command} v1`]: "📝 QUOTED NORMALLY",
                    [`${prefix + command} v2`]: "🔗 LINK + FAKE THUMBNAIL",
                    [`${prefix + command} v3`]: "📎 LARGE LINK + THUMBNAIL",
                    [`${prefix + command} v4`]: "📡 CHANNEL + LINK THUMB"
                };
        
                // Check if the selected reply is valid
                if (buttonTextMap[text]) {
                    return replygcpappy(`You selected: ${buttonTextMap[text]} ✔️`);
                } else {
                    return replygcpappy("Invalid reply option selected. ❌");
                }
            } else {
                return replygcpappy(`There are 4 reply options (v1, v2, v3, v4) 📬\nPlease select one.\nExample: ${prefix + command} v1 💭`);
            }
            break;
        }
        
              case 'statustext': 
              case 'upswtext':
              case 'upswteks': {
                 if (!PappyTheCreator) return PappyStickOwner()
                 if (!q) return replygcpappy('Text?')
                 await PappyBotInc.sendMessage('status@broadcast', { text: q }, { backgroundColor: '#FF000000', font: 3, statusJidList: Object.keys(global.db.users) })
                 replygcpappy(mess.done)
              }
              break
              case 'statusvideo':
              case 'upswvideo': {
                 if (!PappyTheCreator) return PappyStickOwner()
                 if (/video/.test(mime)) {
                    var videosw = await PappyBotInc.downloadAndSaveMediaMessage(quoted)
                    await PappyBotInc.sendMessage('status@broadcast', {
                       video: {
                          url: videosw
                       },
                       caption: q ? q : ''
                    }, { statusJidList: Object.keys(global.db.users) })
                    await replygcpappy(mess.done)
                 } else {
                    replygcpappy('Reply to video')
                 }
              }
              break
              case 'statusimg':
              case 'statusimage':
              case 'upswimg': {
                 if (!PappyTheCreator) return PappyStickOwner()
                 if (/image/.test(mime)) {
                    var imagesw = await PappyBotInc.downloadAndSaveMediaMessage(quoted)
                    await PappyBotInc.sendMessage('status@broadcast', {
                       image: {
                          url: imagesw
                       },
                       caption: q ? q : ''
                    }, { statusJidList: Object.keys(global.db.users)})
                    await replygcpappy(mess.done)
                 } else {
                    replygcpappy('Reply to image')
                 }
              }
              break
              case 'statusaudio':
              case 'upswaudio': {
                 if (!PappyTheCreator) return PappyStickOwner()
                 if (/audio/.test(mime)) {
                    var audiosw = await PappyBotInc.downloadAndSaveMediaMessage(quoted)
                    await PappyBotInc.sendMessage('status@broadcast', {
                       audio: {
                          url: audiosw
                       },
                       mimetype: 'audio/mp4',
                       ptt: true
                    }, {
                       backgroundColor: '#FF000000',
                       statusJidList: Object.keys(global.db.users)
                    })
                    await replygcpappy(mess.done)
                 } else {
                    replygcpappy('Reply to audio')
                 }
              }
              break
              case 'setvidmenu':
                case 'svm':
                case 'setvgifmenu':
                case 'sgm': {
                    if (!PappyTheCreator) return PappyStickOwner()
                    try {
                        let delb = await PappyBotInc.downloadAndSaveMediaMessage(quoted)
                        await fsx.copy(delb, './PappyMedia/theme/Pappy-Video.mp4')
                        fs.unlinkSync(delb)
                        replygcpappy(`Done! 🎉 Video menu successfully set! 🎬`)
                    } catch {
                        replygcpappy(`Please reply to a video with caption ${prefix + command} 🎥`)
                    }
                }
                break
                
                case 'setimgmenu':
                case 'sim': {
                    if (!PappyTheCreator) return PappyStickOwner()
                    try {
                        let delb = await PappyBotInc.downloadAndSaveMediaMessage(quoted)
                        await fsx.copy(delb, './PappyMedia/theme/PappyPic.jpg')
                        fs.unlinkSync(delb)
                        replygcpappy(`Done! 🎉 Image menu successfully set! 🖼️`)
                    } catch {
                        replygcpappy(`Please reply to an image with caption ${prefix + command} 📸`)
                    }
                }
                break
                
                case 'setmenu': {
                    if (!PappyTheCreator) return PappyStickOwner()
                
                    // Check if the input starts with 'v' and set the menu accordingly
                    if (text.startsWith('v')) {
                        typemenu = text;  // Set the selected menu type
                        return replygcpappy(`Successfully set menu to: ${text} ✅`);  // Notify the user
                    } else {
                        // If the input is not valid, show the available menu options
                        return replygcpappy(`
                            Please select a menu option by specifying 'v' followed by the choice 📋.
                
                            Available menu options:
                            - v12: BUTTON + CHANNEL V2 📱 + 📺
                            - v11: BUTTON + CHANNEL 📱 + 📺
                            - v10: ONLY BUTTON 🔘
                            - v9: CHANNEL + FAKE THUMBNAIL V2 📺 + 🖼️
                            - v8: CHANNEL + FAKE THUMBNAIL 📺 + 🖼️
                            - v7: FAKE THUMBNAIL + DOCUMENT 🖼️ + 📄
                            - v6: FAKE PAYMENT 💳
                            - v5: CALL SCHEDULE 📞📅
                            - v4: GIF THUMBNAIL 🎞️
                            - v3: VIDEO THUMBNAIL 🎥🖼️
                            - v2: CHANNEL + THUMBNAIL 📺 + 🖼️
                            - v1: IMAGE THUMBNAIL 🖼️
                
                            Example: ${prefix + command} v1
                        `);
                    }
                    break;
                }
                
        case 'bc':
              case 'broadcast': {
                 if (!PappyTheCreator) return PappyStickOwner()
                 if (!text) return replygcpappy('Text?')
                 let teksnya = `${text}\n\n\n\nDate: ${xdate} ${xtime}`
                 for (let i of Object.keys(global.db.users)) {
                 await sleep(1500)
                    if (/image/.test(mime)) {
                       var media = await quoted.download()
                       await PappyBotInc.sendMessage(i, { 
                          image:media,
                          caption: teksnya
                       })
                    } else if (/video/.test(mime)) {
                       var media = await quoted.download()
                       await PappyBotInc.sendMessage(i, {
                          video: media,
                          caption: teksnya
                       })
                    } else if (text) {
                       await PappyBotInc.sendMessage(i, {
                          text: teksnya
                       })
                    }
                 }
                 replygcpappy(`Success ${command} To ${Object.keys(global.db.users).length} Users`)
              }
              break
              case 'bcgc':
              case 'bcgroup': {
                  if (!PappyTheCreator) return PappyStickOwner()
                  if (!text) return replygcpappy(`Text mana?\n\nExample : ${prefix + command} Besok Libur `)
                  let getGroups = await PappyBotInc.groupFetchAllParticipating()
                  let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                  let anu = groups.map(v => v.id)
                  replygcpappy(`Sending Broadcast To ${anu.length} Group Chat, End Time ${anu.length * 1.5} seconds`)
                  for (let i of anu) {
                      await sleep(1500)
                      let a = `${ownername}'s Broadcast\n\n` + '```' + `Message: ${text}\n\n` + '```'
                      PappyBotInc.sendMessage(i, {
                          text: a,
                          contextInfo: {
                              externalAdReply: {
                                  showAdAttribution: true,
                                  title: botname,
                                  body: `Sent in ${i.length} Group`,
                                  thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
                                  sourceUrl: wagc,
                                  mediaType: 1,
                                  renderLargerThumbnail: true
                              }
                          }
                      })
                  }
                  replygcpappy(`Successful in sending Broadcast To ${anu.length} Group`)
              }
              break
              case 'spam':
                if (!PappyTheCreator) return PappyStickOwner()
                if (!text) return replygcpappy(`Use ${prefix + command} text|amount 📝`)
                
                pappyarg = text.split("|")
                if (!pappyarg) return replygcpappy(`Use ${prefix + command} text|amount 📝`)
                
                if (Number(pappyarg[1]) >= 50) return replygcpappy('Max 50! 🚫')
                
                if (isNaN(pappyarg[1])) return replygcpappy(`The amount must be a number 🔢`)
            
                // Send the message multiple times
                for (let i = 0; i < pappyarg[1]; i++) {
                    PappyBotInc.sendMessage(m.chat, {text: pappyarg[0]})
                }
            
                replygcpappy(`Successfully sent ${pappyarg[1]} messages ✉️!`)
                break
            
        
  
              case 'poll': {
    if (!PappyTheCreator) return PappyStickOwner()
              let [poll, opt] = text.split("|")
              if (text.split("|") < 2)
                  return await replygcpappy(
                      `Mention question and atleast 2 options\nExample: ${prefix}poll Who is best admin?|Pappy,Cheems,Doge...`
                  )
              try {
              let options = []
              for (let i of opt.split(',')) {
                  options.push(i)
              }
              await PappyBotInc.sendMessage(m.chat, {
                  poll: {
                      name: poll,
                      values: options
                  }
              })
              } catch {
                replygcpappy(
                      `Mention question and atleast 2 options\nExample: ${prefix}poll Who is best admin?|Pappy,Cheems,Doge...`
                  )
                  }
          }
          break
        case 'autoblock':
      if (!PappyTheCreator) return PappyStickOwner();
      
      if (q == 'on') {
          db.settings[botNumber].autoblocknum = true;
          return replygcpappy(`Successfully changed Auto-Block to ${q}`);
      } else if (q == 'off') {
          db.settings[botNumber].autoblocknum = false;
          return replygcpappy(`Successfully changed Auto-Block to ${q}`);
      } else {
          return replygcpappy(`
              Please choose an option to enable or disable ${command}.
  
              Usage:
              - ${prefix + command} on  : Enable Auto-Block
              - ${prefix + command} off : Disable Auto-Block
  
              Example: ${prefix + command} on
          `);
      }
      break;
  
  case 'onlygroup':
  case 'onlygc':
      if (!PappyTheCreator) return PappyStickOwner();
      
      if (q == 'on') {
          db.settings[botNumber].onlygrub = true;
          return replygcpappy(`Successfully changed Onlygroup to ${q}`);
      } else if (q == 'off') {
          db.settings[botNumber].onlygrub = false;
          return replygcpappy(`Successfully changed Onlygroup to ${q}`);
      } else {
          return replygcpappy(`
              Please choose an option to enable or disable ${command}.
  
              Usage:
              - ${prefix + command} on  : Enable Onlygroup
              - ${prefix + command} off : Disable Onlygroup
  
              Example: ${prefix + command} on
          `);
      }
      break;
  
          case 'onlyprivatechat':
  case 'onlypc':
      if (!PappyTheCreator) return PappyStickOwner();
      if (q == 'on') {
          db.settings[botNumber].onlypc = true;
          replygcpappy(`Successfully Changed Only-Pc To ${q}`);
      } else if (q == 'off') {
          db.settings[botNumber].onlypc = false;
          replygcpappy(`Successfully Changed Only-Pc To ${q}`);
      } else {
          return replygcpappy(`
              Please choose an option to enable or disable ${command}.
  
              Usage:
              - ${prefix + command} on  : Enable Only-Pc
              - ${prefix + command} off : Disable Only-Pc
  
              Example: ${prefix + command} on
          `);
      }
      break;
  
  case 'onlyindia':
  case 'onlyindianumber':
      if (!PappyTheCreator) return PappyStickOwner();
      if (q == 'on') {
          db.settings[botNumber].onlyindia = true;
          replygcpappy(`Successfully Changed Only-Indian To ${q}`);
      } else if (q == 'off') {
          db.settings[botNumber].onlyindia = false;
          replygcpappy(`Successfully Changed Only-Indian To ${q}`);
      } else {
          return replygcpappy(`
              Please choose an option to enable or disable ${command}.
  
              Usage:
              - ${prefix + command} on  : Enable Only-Indian
              - ${prefix + command} off : Disable Only-Indian
  
              Example: ${prefix + command} on
          `);
      }
      break;
  
  case 'onlyindo':
  case 'onlyindonumber':
      if (!PappyTheCreator) return PappyStickOwner();
      if (q == 'on') {
          db.settings[botNumber].onlyindo = true;
          replygcpappy(`Successfully Changed Only-Indonesian To ${q}`);
      } else if (q == 'off') {
          db.settings[botNumber].onlyindo = false;
          replygcpappy(`Successfully Changed Only-Indonesian To ${q}`);
      } else {
          return replygcpappy(`
              Please choose an option to enable or disable ${command}.
  
              Usage:
              - ${prefix + command} on  : Enable Only-Indonesian
              - ${prefix + command} off : Disable Only-Indonesian
  
              Example: ${prefix + command} on
          `);
      }
      break;
  
  case 'setautoblock':
      if (!PappyTheCreator) return PappyStickOwner();
      if (!text) return replygcpappy(`Example : ${prefix + command} 92`);
      global.autoblocknumber = text;
      replygcpappy(`Auto-Block number successfully changed to ${text}`);
      break;
  
  case 'setantiforeign':
      if (!PappyTheCreator) return PappyStickOwner();
      if (!text) return replygcpappy(`Example : ${prefix + command} 91`);
      global.antiforeignnumber = text;
      replygcpappy(`Anti-foreign number successfully changed to ${text}`);
      break;
  
  case 'autoswview':
  case 'autostatusview':
      if (!PappyTheCreator) return PappyStickOwner();
      if (args[0] === 'on') {
          db.settings[botNumber].antiswview = true;
          replygcpappy(`${command} is enabled`);
      } else if (args[0] === 'off') {
          db.settings[botNumber].antiswview = false;
          replygcpappy(`${command} is disabled`);
      } else {
          return replygcpappy(`
              Please choose an option to enable or disable ${command}.
  
              Usage:
              - ${prefix + command} on  : Enable ${command}
              - ${prefix + command} off : Disable ${command}
  
              Example: ${prefix + command} on
          `);
      }
      break;
  
  
  case 'autorecordtype':
      if (!PappyTheCreator) return PappyStickOwner();
      if (q === 'on') {
          db.settings[botNumber].autorecordtype = true;
          replygcpappy(`Successfully changed Auto-RecordingTyping to ${q}`);
      } else if (q === 'off') {
          db.settings[botNumber].autorecordtype = false;
          replygcpappy(`Successfully changed Auto-RecordingTyping to ${q}`);
      } else {
          return replygcpappy(`
              Please choose an option to enable or disable ${command}.
  
              Usage:
              - ${prefix + command} on  : Enable Auto-RecordingTyping
              - ${prefix + command} off : Disable Auto-RecordingTyping
  
              Example: ${prefix + command} on
          `);
      }
      break;
  
  case 'autorecord':
      if (!PappyTheCreator) return PappyStickOwner();
      if (q === 'on') {
          db.settings[botNumber].autorecord = true;
          replygcpappy(`Successfully changed Auto-Recording to ${q}`);
      } else if (q === 'off') {
          db.settings[botNumber].autorecord = false;
          replygcpappy(`Successfully changed Auto-Recording to ${q}`);
      } else {
          return replygcpappy(`
              Please choose an option to enable or disable ${command}.
  
              Usage:
              - ${prefix + command} on  : Enable Auto-Recording
              - ${prefix + command} off : Disable Auto-Recording
  
              Example: ${prefix + command} on
          `);
      }
      break;
  
          
  case 'autotype':
      if (!PappyTheCreator) return PappyStickOwner();
  
      if (q === 'on') {
          db.settings[botNumber].autotype = true;
          return replygcpappy(`Successfully changed Auto-Typing to ${q}`);
      } else if (q === 'off') {
          db.settings[botNumber].autotype = false;
          return replygcpappy(`Successfully changed Auto-Typing to ${q}`);
      } else {
          return replygcpappy(`
              Please choose an option to enable or disable ${command}.
  
              Usage:
              - ${prefix + command} on  : Enable Auto-Typing
              - ${prefix + command} off : Disable Auto-Typing
  
              Example: ${prefix + command} on
          `);
      }
      break;
  
  case 'autoread':
      if (!PappyTheCreator) return PappyStickOwner();
  
      if (q === 'on') {
          db.settings[botNumber].autoread = true;
          return replygcpappy(`Successfully changed Auto-Read to ${q}`);
      } else if (q === 'off') {
          db.settings[botNumber].autoread = false;
          return replygcpappy(`Successfully changed Auto-Read to ${q}`);
      } else {
          return replygcpappy(`
              Please choose an option to enable or disable ${command}.
  
              Usage:
              - ${prefix + command} on  : Enable Auto-Read
              - ${prefix + command} off : Disable Auto-Read
  
              Example: ${prefix + command} on
          `);
      }
      break;
  
  
          
        case 'self': case 'public': case 'mode': {
      if (!PappyTheCreator) return PappyStickOwner();
  
      // Check if the command is to toggle on or off directly
      if (q == 'on') {
          PappyBotInc.public = true;
          replygcpappy('*Successfully changed to Public Usage*');
      } else if (q == 'off') {
          PappyBotInc.public = false;
          replygcpappy('*Successfully changed to Self Usage*');
      } else {
          // Send a direct message indicating the change
          replygcpappy('Please specify the mode you want to switch to:\n- `on` for Public Usage\n- `off` for Self Usage');
      }
  }
  break;
  
        case 'setbio': case 'setbotbio': {
          if (!PappyTheCreator) return PappyStickOwner()
          if (!text) return replygcpappy(`Where's the text??`)
          PappyBotInc.setStatus(q)
          replygcpappy(`*Bio has been changed to ${q}*`)
        }
        break
  
  
        case 'setbotpp':
              case 'setpp':
              case 'setpp':
              case 'setppbot':
                  if (!PappyTheCreator) return PappyStickOwner()
                  if (!quoted) return replygcpappy(`Send/Reply Image With Caption ${prefix + command}`)
                  if (!/image/.test(mime)) return replygcpappy(`Send/Reply Image With Caption ${prefix + command}`)
                  if (/webp/.test(mime)) return replygcpappy(`Send/Reply Image With Caption ${prefix + command}`)
                  var medis = await PappyBotInc.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                  if (args[0] == 'full') {
                      var {
                          img
                      } = await generateProfilePicture(medis)
                      await PappyBotInc.query({
                          tag: 'iq',
                          attrs: {
                              to: botNumber,
                              type: 'set',
                              xmlns: 'w:profile:picture'
                          },
                          content: [{
                              tag: 'picture',
                              attrs: {
                                  type: 'image'
                              },
                              content: img
                          }]
                      })
                      fs.unlinkSync(medis)
                      replygcpappy(mess.done)
                  } else {
                      var memeg = await PappyBotInc.updateProfilePicture(botNumber, {
                          url: medis
                      })
                      fs.unlinkSync(medis)
                      replygcpappy(mess.done)
                  }
                  break
        case 'join': {
          if (!PappyTheCreator) return PappyStickOwner()
          if (!text) return replygcpappy('Enter Group Link!')
          if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return replygcpappy('Link Invalid!')
          const result = args[0].split('https://chat.whatsapp.com/')[1]
          PappyStickWait()
          await PappyBotInc.groupAcceptInvite(result).catch((res) => {
            if (res.data == 400) return replygcpappy('Group Not Found❗');
            if (res.data == 401) return replygcpappy('Bot Kicked From The Group❗');
            if (res.data == 409) return replygcpappy('Bots Have Joined the Group❗');
            if (res.data == 410) return replygcpappy('Group URL Has Been Reset❗');
            if (res.data == 500) return replygcpappy('Full Group❗');
          })
        }
        break
        case 'leave': case 'leavegc': {
          if (!PappyTheCreator) return PappyStickOwner()
          await PappyBotInc.groupLeave(m.chat).then((res) => replygcpappy(jsonformat(res))).catch((err) => replygcpappy(jsonformat(err)))
        }
        break
        case 'blokir': case 'block': {
          if (!PappyTheCreator) return PappyStickOwner()
          if (!text && !m.quoted) {
            replygcpappy(`Example: ${prefix + command} 91xxx`)
          } else {
            const numbersOnly = m.isGroup ? (text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender) : m.chat
            await PappyBotInc.updateBlockStatus(numbersOnly, 'block').then((a) => replygcpappy(mess.done)).catch((err) => replygcpappy('Fail!'))
          }
        }
        break
        case 'openblokir': case 'unblokir': case 'openblock': case 'unblock': {
          if (!PappyTheCreator) return PappyStickOwner()
          if (!text && !m.quoted) {
            replygcpappy(`Example: ${prefix + command} 91xxx`)
          } else {
            const numbersOnly = m.isGroup ? (text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender) : m.chat
            await PappyBotInc.updateBlockStatus(numbersOnly, 'unblock').then((a) => replygcpappy(mess.done)).catch((err) => replygcpappy('Fail!'))
          }
        }
        break
        case 'listpc': {
          if (!PappyTheCreator) return PappyStickOwner()
          let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
          let teks = `⬣ *LIST PERSONAL CHAT*\n\nTotal Chat : ${anu.length} Chat\n\n`
          for (let i of anu) {
            let nama = store.messages[i].array[0].pushName
            teks += `${setv} *Name :* ${nama}\n${setv} *User :* @${i.split('@')[0]}\n${setv} *Chat :* https://wa.me/${i.split('@')[0]}\n\n=====================\n\n`
          }
          PappyBotInc.sendTextMentions(m.chat, teks, m)
        }
        break
        case 'listgc': {
          if (!PappyTheCreator) return PappyStickOwner()
          let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
          let teks = `⬣ *LIST GROUP CHAT*\n\nTotal Group : ${anu.length} Group\n\n`
          for (let i of anu) {
            let metadata = await PappyBotInc.groupMetadata(i)
            teks += `${setv} *Name :* ${metadata.subject}\n${setv} *Admin :* ${metadata.owner ? `@${metadata.owner.split('@')[0]}` : '-' }\n${setv} *ID :* ${metadata.id}\n${setv} *Made :* ${moment(metadata.creation * 1000).tz('Asia/Karachi').format('DD/MM/YYYY HH:mm:ss')}\n${setv} *Member :* ${metadata.participants.length}\n\n=====================\n\n`
          }
          PappyBotInc.sendTextMentions(m.chat, teks, m)
        }
        break
        case 'creategc': {
          if (!PappyTheCreator) return PappyStickOwner()
          if (!text) return replygcpappy(`Example:\n${prefix + command} *Gc Name*`)
          let group = await PappyBotInc.groupCreate(q, [m.sender])
          let res = await PappyBotInc.groupInviteCode(group.id)
          await PappyBotInc.sendMessage(m.chat, { text: `*Link Group :* *https://chat.whatsapp.com/${res}*\n\n*Group Name :* *${q}*`, detectLink: true }, { quoted: m });
          await PappyBotInc.groupParticipantsUpdate(group.id, [m.sender], 'promote')
          await PappyBotInc.sendMessage(group.id, { text: 'Done' })
        }
        break
        case 'addpr': case 'addprem': case 'addpremium': {
          if (!PappyTheCreator) return PappyStickOwner()
          if (!text) return replygcpappy(`Example:\n${prefix + command} @tag|time(s/m/h/d)`)
          let [teks1, teks2] = text.split`|`
          const nmrnya = teks1.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
          const onWa = await PappyBotInc.onWhatsApp(nmrnya)
          if (!onWa.length > 0) return replygcpappy('This number is not registered on WhatsApp!')
          if (teks2) {
            prem.addPremiumUser(nmrnya, teks2, premium);
            replygcpappy(`Success ${command} @${nmrnya.split('@')[0]} During ${teks2}`)
            global.db.users[nmrnya].limit = global.db.users[nmrnya].vip ? global.limit.vip : global.limit.premium
            global.db.users[nmrnya].uang = global.db.users[nmrnya].vip ? global.uang.vip : global.uang.premium
          } else {
            replygcpappy(`Enter the time!\nExample: ${prefix + command} @tag|time`)
          }
        }
        break
        case 'delpr': case 'delprem': case 'delpremium': {
          if (!PappyTheCreator) return PappyStickOwner()
          if (!text) return replygcpappy(`Example:\n${prefix + command} @tag`)
          const nmrnya = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
          if (prem.checkPremiumUser(nmrnya, premium)) {
            premium.splice(prem.getPremiumPosition(nmrnya, premium), 1);
            fs.writeFileSync('./database/premium.json', JSON.stringify(premium));
            replygcpappy(`Sukses ${command} @${nmrnya.split('@')[0]}`)
            global.db.users[nmrnya].limit = global.db.users[nmrnya].vip ? global.limit.vip : global.limit.free
            global.db.users[nmrnya].uang = global.db.users[nmrnya].vip ? global.uang.vip : global.uang.free
          } else {
            replygcpappy(`User @${nmrnya.split('@')[0]} Not Premium❗`)
          }
        }
        break
        case 'listpr': case 'listprem': case 'listpremium': {
          if (!PappyTheCreator) return PappyStickOwner()
          let txt = `*------「 LIST PREMIUM 」------*\n\n`
          for (let userprem of premium) {
            txt += `➸ *Number*: @${userprem.id.split('@')[0]}\n➸ *Limit*: ${global.db.users[userprem.id].limit}\n➸ *Money*: ${global.db.users[userprem.id].uang.toLocaleString('id-ID')}\n➸ *Expired*: ${formatDate(userprem.expired)}\n\n`
          }
          replygcpappy(txt)
        }
        break
  


//-------------------------------------------------------------------------------------------------------------//


//█▀▄ ▄▀▄ ▀█▀ ▄▀▄ █▄▄ ▄▀▄ █▀▀ █▀▀   █▀▀ █▀█ █▄ ▄█ █▄ ▄█ ▄▀▄ █▄ █ █▀▄ █▀▀ 
//█▄▀ █▀█  █  █▀█ █▄█ █▀█ ▄██ ██▄   █▄▄ █▄█ █ ▀ █ █ ▀ █ █▀█ █ ▀█ █▄▀ ▄██ 


case 'addbadword': case 'addbd':
  if (!PappyTheCreator) return PappyStickOwner()
  if (args.length < 1) return replygcpappy( `Send command ${prefix}addbadword [harsh word]. Example ${prefix}addbadword asshole`)
  bad.push(q)
  fs.writeFileSync('./src/badword.json', JSON.stringify(bad))
  replygcpappy('Successfully Added Bad Word!')
break

case 'delbadword': case 'deldb':
  if (!PappyTheCreator) return PappyStickOwner()
  if (args.length < 1) return replygcpappy( `Send commands ${prefix}addbadword [bad word]. Example ${prefix}addbadword asshole`)                 
  bad.splice(q)
  fs.writeFileSync('./src/badword.json', JSON.stringify(bad))
  replygcpappy('Successfully Deleted Bad Word!')
break 


case 'listbadword':{
let teks = '┌──⭓「 *VN List* 」\n│\n'
for (let x of bad) {
teks += `│⭔ ${x}\n`
}
teks += `│\n└────────────⭓\n\n*Totally there are : ${bad.length}*`
replygcpappy(teks)
}
break

  
      case 'addvideo': {
        if (!PappyTheCreator) return PappyStickOwner();
        if (args.length < 1) return replygcpappy('🎥 Please provide the video name.');
        if (VideoPappy.includes(q)) return replygcpappy("❌ The name is already in use.");
      
        let delb = await PappyBotInc.downloadAndSaveMediaMessage(quoted);
        VideoPappy.push(q);
        await fsx.copy(delb, `./PappyMedia/video/${q}.mp4`);
        fs.writeFileSync('./PappyMedia/database/pappyvideo.json', JSON.stringify(VideoPappy));
        fs.unlinkSync(delb);
      
        replygcpappy(`✅ Success adding video\nCheck by typing ${prefix}listvideo`);
      }
      break;
      
      case 'delvideo': {
        if (!PappyTheCreator) return PappyStickOwner();
        if (args.length < 1) return replygcpappy('❌ Enter the video name.');
        if (!VideoPappy.includes(q)) return replygcpappy("❌ The name does not exist in the database.");
      
        let wanu = VideoPappy.indexOf(q);
        VideoPappy.splice(wanu, 1);
        fs.writeFileSync('./PappyMedia/database/pappyvideo.json', JSON.stringify(VideoPappy));
        fs.unlinkSync(`./PappyMedia/video/${q}.mp4`);
      
        replygcpappy(`✅ Success deleting video: ${q}`);
      }
      break;
      
      case 'listvideo': {
        let teks = '🎬┌──⭓「 *Video List* 」\n│\n';
        for (let x of VideoPappy) {
            teks += `│📹 ${x}\n`;
        }
        teks += `│\n└────────────⭓\n\n*Total: ${VideoPappy.length} videos*`;
        replygcpappy(teks);
      }
      break;
      
      case 'addimage': {
        if (!PappyTheCreator) return PappyStickOwner();
        if (args.length < 1) return replygcpappy('🖼️ Please provide the image name.');
        if (ImagePappy.includes(q)) return replygcpappy("❌ The name is already in use.");
      
        let delb = await PappyBotInc.downloadAndSaveMediaMessage(quoted);
        ImagePappy.push(q);
        await fsx.copy(delb, `./PappyMedia/image/${q}.jpg`);
        fs.writeFileSync('./PappyMedia/database/pappyimage.json', JSON.stringify(ImagePappy));
        fs.unlinkSync(delb);
      
        replygcpappy(`✅ Success adding image\nCheck by typing ${prefix}listimage`);
      }
      break;
      
      case 'delimage': {
        if (!PappyTheCreator) return PappyStickOwner();
        if (args.length < 1) return replygcpappy('❌ Enter the image name.');
        if (!ImagePappy.includes(q)) return replygcpappy("❌ The name does not exist in the database.");
      
        let wanu = ImagePappy.indexOf(q);
        ImagePappy.splice(wanu, 1);
        fs.writeFileSync('./PappyMedia/database/pappyimage.json', JSON.stringify(ImagePappy));
        fs.unlinkSync(`./PappyMedia/image/${q}.jpg`);
      
        replygcpappy(`✅ Success deleting image: ${q}`);
      }
      break;
      
      case 'listimage': {
        let teks = '🖼️┌──⭓「 *Image List* 」\n│\n';
        for (let x of ImagePappy) {
            teks += `│🖼️ ${x}\n`;
        }
        teks += `│\n└────────────⭓\n\n*Totally there are: ${ImagePappy.length}*`;
        replygcpappy(teks);
      }
      break;
      
      case 'addsticker': {
        if (!PappyTheCreator) return PappyStickOwner();
        if (args.length < 1) return replygcpappy('💬 What’s the sticker name?');
        if (StickerPappy.includes(q)) return replygcpappy("❌ The name is already in use");
        let delb = await PappyBotInc.downloadAndSaveMediaMessage(quoted);
        StickerPappy.push(q);
        await fsx.copy(delb, `./PappyMedia/sticker/${q}.webp`);
        fs.writeFileSync('./PappyMedia/database/pappysticker.json', JSON.stringify(StickerPappy));
        fs.unlinkSync(delb);
        replygcpappy(`✅ Success Adding Sticker\nCheck by typing ${prefix}liststicker`);
      }
      break;
      
      case 'delsticker': {
        if (!PappyTheCreator) return PappyStickOwner();
        if (args.length < 1) return replygcpappy('❌ Enter the sticker name');
        if (!StickerPappy.includes(q)) return replygcpappy("❌ The name does not exist in the database");
        let wanu = StickerPappy.indexOf(q);
        StickerPappy.splice(wanu, 1);
        fs.writeFileSync('./PappyMedia/database/pappysticker.json', JSON.stringify(StickerPappy));
        fs.unlinkSync(`./PappyMedia/sticker/${q}.webp`);
        replygcpappy(`✅ Success deleting sticker ${q}`);
      }
      break;
      
      case 'liststicker': {
        let teks = '💬┌──⭓「 *Sticker List* 」\n│\n';
        for (let x of StickerPappy) {
            teks += `│💥 ${x}\n`;
        }
        teks += `│\n└────────────⭓\n\n*Totally there are: ${StickerPappy.length}*`;
        replygcpappy(teks);
      }
      break;
      
      case 'addvn': {
        if (!PappyTheCreator) return PappyStickOwner();
        if (args.length < 1) return replygcpappy('🎵 What’s the audio name?');
        if (VoiceNotePappy.includes(q)) return replygcpappy("❌ The name is already in use");
        let delb = await PappyBotInc.downloadAndSaveMediaMessage(quoted);
        VoiceNotePappy.push(q);
        await fsx.copy(delb, `./PappyMedia/audio/${q}.mp3`);
        fs.writeFileSync('./PappyMedia/database/pappyvn.json', JSON.stringify(VoiceNotePappy));
        fs.unlinkSync(delb);
        replygcpappy(`✅ Success Adding Audio\nCheck by typing ${prefix}listvn`);
      }
      break;
      
      case 'delvn': {
        if (!PappyTheCreator) return PappyStickOwner();
        if (args.length < 1) return replygcpappy('❌ Enter the vn name');
        if (!VoiceNotePappy.includes(q)) return replygcpappy("❌ The name does not exist in the database");
        let wanu = VoiceNotePappy.indexOf(q);
        VoiceNotePappy.splice(wanu, 1);
        fs.writeFileSync('./PappyMedia/database/pappyvn.json', JSON.stringify(VoiceNotePappy));
        fs.unlinkSync(`./PappyMedia/audio/${q}.mp3`);
        replygcpappy(`✅ Success deleting vn ${q}`);
      }
      break;
      
      case 'listvn': {
        let teks = '🎵┌──⭓「 *VN List* 」\n│\n';
        for (let x of VoiceNotePappy) {
            teks += `│🎶 ${x}\n`;
        }
        teks += `│\n└────────────⭓\n\n*Totally there are: ${VoiceNotePappy.length}*`;
        replygcpappy(teks);
      }
      break;
      
      case 'addzip': {
        if (!PappyTheCreator) return PappyStickOwner();
        if (args.length < 1) return replygcpappy('📦 What’s the zip name?');
        let teks = `${text}`;
        {
            if (ZipPappy.includes(teks)) return replygcpappy("❌ This name is already in use");
            let delb = await PappyBotInc.downloadAndSaveMediaMessage(quoted);
            ZipPappy.push(teks);
            await fsx.copy(delb, `./PappyMedia/zip/${teks}.zip`);
            fs.writeFileSync('./PappyMedia/database/zip.json', JSON.stringify(ZipPappy));
            fs.unlinkSync(delb);
            replygcpappy(`✅ Success Adding Zip\nTo check type ${prefix}listzip`);
        }
      }
      break;
      
      case 'delzip': {
        if (!PappyTheCreator) return PappyStickOwner();
        if (args.length < 1) return replygcpappy('❌ Enter the text in the zip list');
        let teks = `${text}`;
        {
            if (!ZipPappy.includes(teks)) return replygcpappy("❌ This name does not exist in the database");
            let wanu = ZipPappy.indexOf(teks);
            ZipPappy.splice(wanu, 1);
            fs.writeFileSync('./PappyMedia/database/zip.json', JSON.stringify(ZipPappy));
            fs.unlinkSync(`./PappyMedia/zip/${teks}.zip`);
            replygcpappy(`✅ Successfully deleted zip ${teks}`);
        }
      }
      break;
      
      case 'listzip': {
        let teksooooo = '📦┌──⭓「 *ZIP LIST* 」\n│\n';
        for (let x of ZipPappy) {
            teksooooo += `│🗂️ ${x}\n`;
        }
        teksooooo += `│\n└────────────⭓\n\n*Total: ${ZipPappy.length}*`;
        replygcpappy(teksooooo);
      }
      break;
      
      
      case 'addapk': {
        if (!PappyTheCreator) return PappyStickOwner();
      
        if (args.length < 1) return replygcpappy('📱 What is the name of the apk?');
        let teks = `${text}`;
        {
            if (ApkPappy.includes(teks)) return replygcpappy("❌ This name is already in use");
            let delb = await PappyBotInc.downloadAndSaveMediaMessage(quoted);
            ApkPappy.push(teks);
            await fsx.copy(delb, `./PappyMedia/apk/${teks}.apk`);
            fs.writeFileSync('./PappyMedia/database/apk.json', JSON.stringify(ApkPappy));
            fs.unlinkSync(delb);
            replygcpappy(`✅ Successfully added apk\nTo Check type ${prefix}listapk`);
        }
      }
      break;
      
      case 'delapk': {
        if (!PappyTheCreator) return PappyStickOwner();
      
        if (args.length < 1) return replygcpappy('❌ Enter the name of the apk to delete');
        let teks = `${text}`;
        {
            if (!ApkPappy.includes(teks)) return replygcpappy("❌ This name does not exist in the database");
            let wanu = ApkPappy.indexOf(teks);
            ApkPappy.splice(wanu, 1);
            fs.writeFileSync('./PappyMedia/database/apk.json', JSON.stringify(ApkPappy));
            fs.unlinkSync(`./PappyMedia/apk/${teks}.apk`);
            replygcpappy(`✅ Successfully deleted Apk: ${teks}`);
        }
      }
      break;
      
      case 'listapk': {
        let teksoooooo = '📱┌──⭓「 *APK LIST* 」\n│\n';
        for (let x of ApkPappy) {
            teksoooooo += `│📦 ${x}\n`;
        }
        teksoooooo += `│\n└────────────⭓\n\n*Total: ${ApkPappy.length} APKs*`;
        replygcpappy(teksoooooo);
      }
      break;
      
      case 'addpdf': {
        if (!PappyTheCreator) return PappyStickOwner();
      
        if (args.length < 1) return replygcpappy('📄 What is the name of the pdf?');
        let teks = `${text}`;
        {
            if (DocPappy.includes(teks)) return replygcpappy("❌ This name is already in use");
            let delb = await PappyBotInc.downloadAndSaveMediaMessage(quoted);
            DocPappy.push(teks);
            await fsx.copy(delb, `./PappyMedia/doc/${teks}.pdf`);
            fs.writeFileSync('./PappyMedia/database/doc.json', JSON.stringify(DocPappy));
            fs.unlinkSync(delb);
            replygcpappy(`✅ Successfully added PDF\nTo check type ${prefix}listpdf`);
        }
      }
      break;
      
      case 'delpdf': {
        if (!PappyTheCreator) return PappyStickOwner();
      
        if (args.length < 1) return replygcpappy('❌ Enter the name of the PDF to delete');
        let teks = `${text}`;
        {
            if (!DocPappy.includes(teks)) return replygcpappy("❌ This name does not exist in the database");
            let wanu = DocPappy.indexOf(teks);
            DocPappy.splice(wanu, 1);
            fs.writeFileSync('./PappyMedia/database/doc.json', JSON.stringify(DocPappy));
            fs.unlinkSync(`./PappyMedia/doc/${teks}.pdf`);
            replygcpappy(`✅ Successfully deleted PDF: ${teks}`);
        }
      }
      break;
      
      case 'listpdf': {
        let teksoooo = '📄┌──⭓「 *PDF LIST* 」\n│\n';
        for (let x of DocPappy) {
            teksoooo += `│📑 ${x}\n`;
        }
        teksoooo += `│\n└────────────⭓\n\n*Total: ${DocPappy.length} PDFs*`;
        replygcpappy(teksoooo);
      }
      break;
      
      case 'addmsg': {
        if (!PappyTheCreator) return PappyStickOwner();
        if (!m.quoted) return replygcpappy('🔄 Please reply to the message you want to save in the database');
        if (!text) return replygcpappy(`💡 Example: ${prefix + command} file name`);
        
        let msgs = global.db.database;
        if (text.toLowerCase() in msgs) return replygcpappy(`❌ '${text}' is already registered in the message list`);
        
        msgs[text.toLowerCase()] = m.quoted;
        delete msgs[text.toLowerCase()].chat;
        
        replygcpappy(`✅ Successfully added the message to the message list as '${text}'\nAccess it with ${prefix}getmsg ${text}\nView the list of messages with ${prefix}listmsg`);
      }
      break;
      
      case 'delmsg': case 'deletemsg': {
        if (!PappyTheCreator) return PappyStickOwner();
        if (!text) return replygcpappy('❌ What is the name of the message you want to delete?');
        
        let msgs = global.db.database;
        if (text == 'allmsg') {
            global.db.database = {};
            replygcpappy('🧹 Successfully deleted all messages from the message list');
        } else {
            if (!(text.toLowerCase() in msgs)) return replygcpappy(`❌ '${text}' not found in the message list`);
            delete msgs[text.toLowerCase()];
            replygcpappy(`✅ Successfully deleted '${text}' from the message list`);
        }
      }
      break;
      
      case 'getmsg': {
        if (!text) return replygcpappy(`💡 Example: ${prefix + command} file name\n\nYou can view the list of messages with ${prefix}listmsg`);
        
        let msgs = global.db.database;
        if (!(text.toLowerCase() in msgs)) return replygcpappy(`❌ '${text}' not found in the message list`);
        
        await PappyBotInc.relayMessage(m.chat, msgs[text.toLowerCase()], {});
      }
      break;
      
      case 'listmsg': {
        let seplit = Object.entries(global.db.database).map(([nama, isi]) => { return { nama, ...isi } });
        let teks = '📜「 *LIST DATABASE* 」\n\n';
        
        for (let i of seplit) {
            teks += `${setv} *Name:* ${i.nama}\n${setv} *Type:* ${getContentType(i.message)?.replace(/Message/i, '')}\n────────────────────────\n\n`;
        }
        
        replygcpappy(teks);
      }
      break;
      
      case 'setcmd': {
        if (!m.quoted) return replygcpappy('Reply Message!')
        if (!m.quoted.fileSha256) return replygcpappy('SHA256 Hash Missing')
        if (!text) return replygcpappy(`For What Command?`)
        let hash = m.quoted.fileSha256.toString('base64')
        if (global.db.sticker[hash] && global.db.sticker[hash].locked) return replygcpappy('You have no permission to change this sticker command')
        global.db.sticker[hash] = {
            text,
            mentionedJid: m.mentionedJid,
            creator: m.sender,
            at: + new Date,
            locked: false,
        }
        replygcpappy(`Done!`)
    }
    break



    case 'delcmd': {
        let hash = m.quoted.fileSha256.toString('base64')
        if (!hash) return replygcpappy(`No hashes`)
        if (global.db.sticker[hash] && global.db.sticker[hash].locked) return replygcpappy('You have no permission to delete this sticker command')             
        delete global.db.sticker[hash]
        replygcpappy(`Done!`)
    }
    break


case 'listcmd': {
        let teks = `
*List Hash*
Info: *bold* hash is Locked
${Object.entries(global.db.sticker).map(([key, value], index) => `${index + 1}. ${value.locked ? `*${key}*` : key} : ${value.text}`).join('\n')}
`.trim()
        PappyBotInc.sendText(m.chat, teks, m, { mentions: Object.values(global.db.sticker).map(x => x.mentionedJid).reduce((a,b) => [...a, ...b], []) })
    }
    break 


case 'lockcmd': {
        if (!PappyTheCreator) return PappyStickOwner()
        if (!m.quoted) return replygcpappy('Reply Message!')
        if (!m.quoted.fileSha256) return replygcpappy('SHA256 Hash Missing')
        let hash = m.quoted.fileSha256.toString('base64')
        if (!(hash in global.db.sticker)) return replygcpappy('Hash not found in database')
        global.db.sticker[hash].locked = !/^un/i.test(command)
        replygcpappy('Done!')
    }
    break

//-------------------------------------------------------------------------------------------------------------//


//█▀█ █▀▀ █   ▀█▀ █▀▀ ▀█▀ █▀█ █▄ █   █▀▀ █▀█ █▄ ▄█ █▄ ▄█ ▄▀▄ █▄ █ █▀▄ █▀▀ 
//█▀▄ ██▄ █▄▄ ▄█▄ █▄█ ▄█▄ █▄█ █ ▀█   █▄▄ █▄█ █ ▀ █ █ ▀ █ █▀█ █ ▀█ █▄▀ ▄██ 


case 'bible': {
  const { translate } = require('@vitalets/google-translate-api')
  const BASE_URL = 'https://bible-api.com'

  try {
    // Extract the chapter number or name from the command text.
    let chapterInput = m.text.split(' ').slice(1).join('').trim()
    if (!chapterInput) {
      throw new Error(`Please specify the chapter number or name. Example: ${prefix + command} john 3:16`)
    }

    // Encode the chapterInput to handle special characters
    chapterInput = encodeURIComponent(chapterInput);

    // Make an API request to fetch the chapter information.
    let chapterRes = await fetch(`${BASE_URL}/${chapterInput}`)
    if (!chapterRes.ok) {
      throw new Error(`Please specify the chapter number or name. Example: ${prefix + command} john 3:16`)
    }

    let chapterData = await chapterRes.json();

    // Translate the chapter content into Hindi and English
    let translatedChapterHindi = await translate(chapterData.text, { to: 'hi', autoCorrect: true })
    let translatedChapterEnglish = await translate(chapterData.text, { to: 'en', autoCorrect: true })

    // Format the Bible chapter message
    let bibleChapter = `📖 *The Holy Bible*\n
📜 *Chapter ${chapterData.reference}*\n
Type: ${chapterData.translation_name}\n
Number of verses: ${chapterData.verses.length}\n
🔮 *Chapter Content (English):*\n
${translatedChapterEnglish.text}\n
🔮 *Chapter Content (Hindi):*\n
${translatedChapterHindi.text}`

    // Send the formatted message using replygcpappy
    return replygcpappy(bibleChapter)

  } catch (error) {
    replygcpappy(`Error: ${error.message}`)
  }
 }     
  break


  case 'gita-verse': case 'gita': case 'bhagavatgita': {
    try {
      // Extract the verse number from the command text.
      let verseNumber = m.text.split(' ')[1]
      if (!verseNumber || isNaN(verseNumber)) {
        verseNumber = Math.floor(Math.random() * 700) + 1
      }
      let res = await fetch(`https://gita-api.vercel.app/odi/verse/${verseNumber}`)
      if (!res.ok) {
        let error = await res.json()
        throw new Error(
          `API request failed with status ${res.status} and message ${error.detail[0].msg}`
        )
      }
      let json = await res.json()
      console.log('JSON response:', json)
      let gitaVerse = `
  🕉 *Bhagavad Gita: Sacred Teachings*\n
  📜 *Chapter ${json.chapter_no}: ${json.chapter_name}*\n
  Verse ${json.verse_no}:\n
  " ${json.verse} "\n
  *🔮 Translation:*\n
  ${json.translation}\n
  *🧘‍♂️ Spiritual Insight (Purport):*\n
  ${json.purport}`
      replygcpappy(gitaVerse)
      if (json.audio_link) {
        PappyBotInc.sendMessage(m.chat, {audio: {url:json.audio_link}, mimetype: 'audio/mp4', ptt: true}, {quoted:m})
      }
    } catch (error) {
      console.error(error)
      // Handle the error appropriately
    }
  }
  break
  
        case 'quran': {
      try {
      // Extract the surah number or name from the command text.
      let surahInput = m.text.split(' ')[1]
      if (!surahInput) {
        throw new Error(`Please specify the surah number or name`)
      }
      let surahListRes = await fetch('https://quran-endpoint.vercel.app/quran')
      let surahList = await surahListRes.json()
      let surahData = surahList.data.find(surah => 
          surah.number === Number(surahInput) || 
          surah.asma.ar.short.toLowerCase() === surahInput.toLowerCase() || 
          surah.asma.en.short.toLowerCase() === surahInput.toLowerCase()
      )
      if (!surahData) {
        throw new Error(`Couldn't find surah with number or name "${surahInput}"`)
      }
      let res = await fetch(`https://quran-endpoint.vercel.app/quran/${surahData.number}`)
      if (!res.ok) {
        let error = await res.json();
        throw new Error(`API request failed with status ${res.status} and message ${error.message}`)
      }
  
      let json = await res.json()
  
      // Translate tafsir from Bahasa Indonesia to Urdu
      let translatedTafsirUrdu = await translate(json.data.tafsir.id, { to: 'ur', autoCorrect: true })
  
      // Translate tafsir from Bahasa Indonesia to English
      let translatedTafsirEnglish = await translate(json.data.tafsir.id, { to: 'en', autoCorrect: true })
  
      let quranSurah = `
  🕌 *Quran: The Holy Book*\n
  📜 *Surah ${json.data.number}: ${json.data.asma.ar.long} (${json.data.asma.en.long})*\n
  Type: ${json.data.type.en}\n
  Number of verses: ${json.data.ayahCount}\n
  🔮 *Explanation (Urdu):*\n
  ${translatedTafsirUrdu.text}\n
  🔮 *Explanation (English):*\n
  ${translatedTafsirEnglish.text}`
  
      replygcpappy(quranSurah)
  
      if (json.data.recitation.full) {
        PappyBotInc.sendMessage(m.chat, { audio: {url: json.data.recitation.full}, mimetype: 'audio/mp4', ptt: true, fileName: `recitation.mp3`, }, {quoted: m})
      }
    } catch (error) {
      replygcpappy(`Error: ${error.message}`)
    }
    }
    break





    case 'namazchk': {
      // Poll options for prayer times
      const options = ['Fajr', 'Zuhr', 'Asr', 'Maghrib', 'Isha'];
    
      // Check if the user is authorized
      if (!PappyTheCreator) return PappyStickOwner();
    
      // Prepare the question and options for the poll
      const pollQuestion = 'Which prayer(s) did you offer?';
      try {
        // Send the poll with the prayer options
        await PappyBotInc.sendMessage(m.chat, {
          poll: {
            name: pollQuestion,
            values: options,
          }
        });
      } catch {
        replygcpappy(
          `Error: Please make sure to provide at least 2 options for the poll.\nExample: ${prefix}poll Who is best admin?|Pappy,Cheems,Doge...`
        );
      }
    }
    break;
    
    
    
    
    case 'kisahnabi': {
      const prophets = [
          'adam', 'ayyub', 'daud', 'dzulkifli', 'harun', 'hud', 'ibrahim', 'idris', 
          'ilyas', 'ilyasa', 'isa', 'ishaq', 'ismail', 'luth', 'muhammad', 'musa', 
          'nuh', 'sholeh', 'sulaiman', 'syuaib', 'yahya', 'yaqub', 'yunus', 'yusuf', 'zakariya'
      ];
    
      // Ensure the text input is properly trimmed and lowercased
      const selectedProphet = text?.trim().toLowerCase();
    
      // Check if a text was provided
      if (!text) {
          const prophetList = prophets.map(prophet => `- ${prophet.charAt(0).toUpperCase() + prophet.slice(1)}`).join('\n');
          const message = `*Select a Prophet*\n\nPlease type the name of a prophet from the list below to read their story:\n\n${prophetList}`;
          await PappyBotInc.sendText(m.chat, message);
          return;
      }
    
      // Check if the selected prophet is valid
      if (!prophets.includes(selectedProphet)) {
          return PappyBotInc.sendText(
              m.chat, "*Not Found*\n*📮 Tips:* Please select a valid prophet from the list."
          );
      }
    
      // Fetch and display the story and image of the selected prophet
      try {
          const response = await fetch(`https://raw.githubusercontent.com/ZeroChanBot/Api-Freee/a9da6483809a1fbf164cdf1dfbfc6a17f2814577/data/kisahNabi/${selectedProphet}.json`);
          const story = await response.json();
    
          // Static image URL for all prophets
          const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with actual image URL for each prophet if needed
    
          // Format the story with relevant details
          const formattedStory = `_*👳 Prophet:*_ ${story.name}\n`
                                + `_*📅 Date of Birth:*_ ${story.thn_kelahiran}\n`
                                + `_*📍 Place of Birth:*_ ${story.tmp}\n`
                                + `_*📊 Age:*_ ${story.usia}\n\n`
                                + `*— — —  [ S T O R Y ] — — —*\n\n`
                                + `${story.description}`;
    
          // Translate the story to English if possible
          const translation = await translate(formattedStory, { to: 'en' }).catch(() => null);
    
          // Send the message with the story and image
          if (translation?.text) {
              await PappyBotInc.sendMessage(m.chat, {
                  image: { url: imageUrl }, // Static image URL
                  caption: translation.text // Translated story text
              });
          } else {
              await PappyBotInc.sendMessage(m.chat, {
                  image: { url: imageUrl }, // Static image URL
                  caption: formattedStory // Original story text
              });
          }
      } catch (error) {
          await PappyBotInc.sendText(
              m.chat, "*Not Found*\n*📮 Tips:* Please try selecting a prophet from the list."
          );
      }
    }
    break;
    
    
    
    case 'asmaulhusna': {
      const contoh = `*Asmaul Husna*`;
      const anjuran = `
    Dari Abu hurarirah radhiallahu anhu, Rasulullah Saw bersabda: "إِنَّ لِلَّهِ تَعَالَى تِسْعَةً وَتِسْعِينَ اسْمًا، مِائَةٌ إِلَّا وَاحِدًا، مَنْ أَحْصَاهَا دخل الجنة، وهو وتر يُحِبُّ الْوِتْرَ"
    Artinya: "Sesungguhnya Allah mempunyai sembilan puluh sembilan nama, alias seratus kurang satu. Barang siapa yang menghitung-hitungnya, niscaya masuk surga; Dia Witir dan menyukai yang witir".`;
    
      const asmaulhusna = [
          { index: 1, latin: "Ar Rahman", arabic: "الرَّحْمَنُ", translation_id: "مطلق صفت رحمت والا", translation_en: "The All Beneficent" },
          { index: 2, latin: "Ar Rahiim", arabic: "الرَّحِيمُ", translation_id: "مطلق صفت شفقت والا", translation_en: "The Most Merciful" },
          { index: 3, latin: "Al Malik", arabic: "الْمَلِكُ", translation_id: "مطلق صفت حکمرانی والا", translation_en: "The King, The Sovereign" },
          { index: 4, latin: "Al Quddus", arabic: "الْقُدُّوسُ", translation_id: "مطلق صفت پاک", translation_en: "The Most Holy" },
          { index: 5, latin: "As Salaam", arabic: "السَّلاَمُ", translation_id: "مطلق صفت سلامتی والا", translation_en: "Peace and Blessing" },
          { index: 6, latin: "Al Mu’min", arabic: "الْمُؤْمِنُ", translation_id: "مطلق صفت امن دینے والا", translation_en: "The Guarantor" },
          { index: 7, latin: "Al Muhaimin", arabic: "الْمُهَيْمِنُ", translation_id: "مطلق صفت نگہبان", translation_en: "The Guardian, the Preserver" },
          { index: 8, latin: "Al ‘Aziiz", arabic: "الْعَزِيزُ", translation_id: "مطلق صفت عزت والا", translation_en: "The Almighty, the Self Sufficient" },
          { index: 9, latin: "Al Jabbar", arabic: "الْجَبَّارُ", translation_id: "مطلق صفت طاقت والا", translation_en: "The Powerful, the Irresistible" },
          { index: 10, latin: "Al Mutakabbir", arabic: "الْمُتَكَبِّرُ", translation_id: "مطلق صفت بڑائی والا", translation_en: "The Tremendous" },
          { index: 11, latin: "Al Khaliq", arabic: "الْخَالِقُ", translation_id: "مطلق صفت خالق", translation_en: "The Creator" },
          { index: 12, latin: "Al Baari’", arabic: "الْبَارِئُ", translation_id: "مطلق صفت بنانے والا", translation_en: "The Maker" },
          { index: 13, latin: "Al Mushawwir", arabic: "الْمُصَوِّرُ", translation_id: "مطلق صفت شکل دینے والا", translation_en: "The Fashioner of Forms" },
          { index: 14, latin: "Al Ghaffaar", arabic: "الْغَفَّارُ", translation_id: "مطلق صفت معاف کرنے والا", translation_en: "The Ever Forgiving" },
          { index: 15, latin: "Al Qahhaar", arabic: "الْقَهَّارُ", translation_id: "مطلق صفت قاہر", translation_en: "The All Compelling Subduer" },
          { index: 16, latin: "Al Wahhaab", arabic: "الْوَهَّابُ", translation_id: "مطلق صفت عطا کرنے والا", translation_en: "The Bestower" },
          { index: 17, latin: "Ar Razzaaq", arabic: "الرَّزَّاقُ", translation_id: "مطلق صفت رزق دینے والا", translation_en: "The Ever Providing" },
          { index: 18, latin: "Al Fattaah", arabic: "الْفَتَّاحُ", translation_id: "مطلق صفت رحمت کھولنے والا", translation_en: "The Opener, the Victory Giver" },
          { index: 19, latin: "Al ‘Aliim", arabic: "اَلْعَلِيْمُ", translation_id: "مطلق صفت عالم", translation_en: "The All Knowing, the Omniscient" },
          { index: 20, latin: "Al Qaabidh", arabic: "الْقَابِضُ", translation_id: "مطلق صفت تنگ کرنے والا", translation_en: "The Restrainer, the Straightener" },
          { index: 21, latin: "Al Baasith", arabic: "الْبَاسِطُ", translation_id: "مطلق صفت پھیلانے والا", translation_en: "The Expander, the Munificent" },
          { index: 22, latin: "Al Khaafidh", arabic: "الْخَافِضُ", translation_id: "مطلق صفت نیچا کرنے والا", translation_en: "The Abaser" },
          { index: 23, latin: "Ar Raafi’", arabic: "الرَّافِعُ", translation_id: "مطلق صفت اونچا کرنے والا", translation_en: "The Exalter" },
          { index: 24, latin: "Al Mu’izz", arabic: "الْمُعِزُّ", translation_id: "مطلق صفت عزت دینے والا", translation_en: "The Giver of Honor" },
          { index: 25, latin: "Al Mudzil", arabic: "المُذِلُّ", translation_id: "مطلق صفت ذلت دینے والا", translation_en: "The Giver of Dishonor" },
          { index: 26, latin: "Al Samii’", arabic: "السَّمِيعُ", translation_id: "مطلق صفت سننے والا", translation_en: "The All Hearing" },
          { index: 27, latin: "Al Bashiir", arabic: "الْبَصِيرُ", translation_id: "مطلق صفت دیکھنے والا", translation_en: "The All Seeing" },
          { index: 28, latin: "Al Hakam", arabic: "الْحَكَمُ", translation_id: "مطلق صفت فیصلے والا", translation_en: "The Judge, the Arbitrator" },
          { index: 29, latin: "Al ‘Adl", arabic: "الْعَدْلُ", translation_id: "مطلق صفت عدل", translation_en: "The Utterly Just" },
          { index: 30, latin: "Al Lathiif", arabic: "اللَّطِيفُ", translation_id: "مطلق صفت نرمی والا", translation_en: "The Subtly Kind" },
          { index: 31, latin: "Al Khabiir", arabic: "الْخَبِيرُ", translation_id: "مطلق صفت رازوں کا جاننے والا", translation_en: "The All Aware" },
          { index: 32, latin: "Al Haliim", arabic: "الْحَلِيمُ", translation_id: "مطلق صفت بردبار", translation_en: "The Forbearing, the Indulgent" },
          { index: 33, latin: "Al ‘Azhiim", arabic: "الْعَظِيمُ", translation_id: "مطلق صفت عظیم", translation_en: "The Magnificent, the Infinite" },
          { index: 34, latin: "Al Ghafuur", arabic: "الْغَفُورُ", translation_id: "مطلق صفت معاف کرنے والا", translation_en: "The All Forgiving" },
          { index: 35, latin: "As Syakuur", arabic: "الشَّكُورُ", translation_id: "مطلق صفت شکرگزار", translation_en: "The Grateful" },
          { index: 36, latin: "Al ‘Aliy", arabic: "الْعَلِيُّ", translation_id: "مطلق صفت اعلی", translation_en: "The Sublimely Exalted" },
          { index: 37, latin: "Al Kabir", arabic: "الْكَبِيرُ", translation_id: "مطلق صفت بڑا", translation_en: "The All Great" },
          { index: 38, latin: "Al Hafiz", arabic: "الْحَفِيظُ", translation_id: "مطلق صفت محفوظ کرنے والا", translation_en: "The Preserver" },
          { index: 39, latin: "Al Muqit", arabic: "الْمُقيِت", translation_id: "مطلق صفت نگہبان", translation_en: "The Sustainer" },
          { index: 40, latin: "Al Hasib", arabic: "الْحَسِيبُ", translation_id: "مطلق صفت حساب لینے والا", translation_en: "The Reckoner" },
          { index: 41, latin: "Al Jaliil", arabic: "الْجَلِيلُ", translation_id: "مطلق صفت جلال والا", translation_en: "The Majestic" },
          { index: 42, latin: "Al Kariim", arabic: "الْكَرِيمُ", translation_id: "مطلق صفت کرم والا", translation_en: "The Generous, the Esteemed" },
          { index: 43, latin: "Al Raqiib", arabic: "الرَّقِيبُ", translation_id: "مطلق صفت نگران", translation_en: "The Watchful" },
          { index: 44, latin: "Al Mujiib", arabic: "الْمُجِيبُ", translation_id: "مطلق صفت جواب دینے والا", translation_en: "The Responsive" },
          { index: 45, latin: "Al Wasi’", arabic: "الْوَاسِعُ", translation_id: "مطلق صفت وسعت والا", translation_en: "The All-Encompassing" },
          { index: 46, latin: "Al Haadi", arabic: "الْهَادِي", translation_id: "مطلق صفت ہدایت دینے والا", translation_en: "The Guide" },
          { index: 47, latin: "Al Baadi’", arabic: "الْبَادِعُ", translation_id: "مطلق صفت سب سے پہلا", translation_en: "The Incomparable" },
          { index: 48, latin: "Al Baaqi", arabic: "الْبَاقِي", translation_id: "مطلق صفت باقی", translation_en: "The Everlasting" },
          { index: 49, latin: "Al Waarith", arabic: "الْوَارِثُ", translation_id: "مطلق صفت وارث", translation_en: "The Inheritor" },
          { index: 50, latin: "Ar Rashid", arabic: "الرَّشِيدُ", translation_id: "مطلق صفت ہدایت دینے والا", translation_en: "The Righteous Teacher" },
          { index: 51, latin: "As Sabur", arabic: "الصَّبُورُ", translation_id: "مطلق صفت صابر", translation_en: "The Patient" },
          { index: 52, latin: "Al Mu’izz", arabic: "الْمُعِزُّ", translation_id: "مطلق صفت عزت دینے والا", translation_en: "The Giver of Honor" },
          { index: 53, latin: "Al Muthir", arabic: "الْمُثِيرُ", translation_id: "مطلق صفت جوش دلانے والا", translation_en: "The Infuser of Enthusiasm" },
          { index: 54, latin: "Al Mu’min", arabic: "الْمُؤْمِنُ", translation_id: "مطلق صفت ایمان دینے والا", translation_en: "The Giver of Faith" },
          { index: 55, latin: "Al Qariib", arabic: "الْقَرِيبُ", translation_id: "مطلق صفت قریب", translation_en: "The Near" },
          { index: 56, latin: "Al Mu’min", arabic: "الْمُؤْمِنُ", translation_id: "مطلق صفت ایمان دینے والا", translation_en: "The Giver of Faith" },
          { index: 57, latin: "Al Qawiyy", arabic: "الْقَوِيُّ", translation_id: "مطلق صفت طاقتور", translation_en: "The All-Strong" },
          { index: 58, latin: "Al Qadeer", arabic: "الْقَادِرُ", translation_id: "مطلق صفت قادر", translation_en: "The Omnipotent" },
          { index: 59, latin: "Al Haqq", arabic: "الْحَقُّ", translation_id: "مطلق صفت حق", translation_en: "The Absolute Truth" },
          { index: 60, latin: "Al Hakeem", arabic: "الْحَكِيمُ", translation_id: "مطلق صفت حکیم", translation_en: "The All Wise" },
          { index: 61, latin: "Al Wahhab", arabic: "الْوَهَّابُ", translation_id: "مطلق صفت عطا کرنے والا", translation_en: "The Supreme Bestower" },
          { index: 62, latin: "Al Jalil", arabic: "الْجَلِيلُ", translation_id: "مطلق صفت جلال والا", translation_en: "The Majestic" },
          { index: 63, latin: "Al Karim", arabic: "الْكَرِيمُ", translation_id: "مطلق صفت کرم والا", translation_en: "The Generous" },
          { index: 64, latin: "Al Khabeer", arabic: "الْخَبِيرُ", translation_id: "مطلق صفت باخبر", translation_en: "The All-Aware" },
          { index: 65, latin: "Al Latif", arabic: "الْلَطِيفُ", translation_id: "مطلق صفت لطیف", translation_en: "The Subtle" },
          { index: 66, latin: "Al Qabid", arabic: "الْقَابِضُ", translation_id: "مطلق صفت تنگ کرنے والا", translation_en: "The Withholder" },
          { index: 67, latin: "Al Basit", arabic: "الْبَاسِطُ", translation_id: "مطلق صفت پھیلانے والا", translation_en: "The Extender" },
          { index: 68, latin: "Al Khafid", arabic: "الْخَافِضُ", translation_id: "مطلق صفت کم کرنے والا", translation_en: "The Reducer" },
          { index: 69, latin: "Ar Rafi", arabic: "الرَّافِعُ", translation_id: "مطلق صفت بلند کرنے والا", translation_en: "The Exalter" },
          { index: 70, latin: "Al Mu’izz", arabic: "الْمُعِزُّ", translation_id: "مطلق صفت عزت دینے والا", translation_en: "The Honor Giver" },
          { index: 71, latin: "Al Mudzil", arabic: "الْمُذِلُّ", translation_id: "مطلق صفت ذلت دینے والا", translation_en: "The Dishonor Giver" },
          { index: 72, latin: "Al Sami", arabic: "الْسَمِيعُ", translation_id: "مطلق صفت سننے والا", translation_en: "The All-Hearing" },
          { index: 73, latin: "Al Baseer", arabic: "الْبَصِيرُ", translation_id: "مطلق صفت دیکھنے والا", translation_en: "The All-Seeing" },
          { index: 74, latin: "Al Hakam", arabic: "الْحَكَمُ", translation_id: "مطلق صفت حکمران", translation_en: "The Judge" },
          { index: 75, latin: "Al Adl", arabic: "الْعَدْلُ", translation_id: "مطلق صفت انصاف کرنے والا", translation_en: "The Just" },
          { index: 76, latin: "Al Latif", arabic: "الْلَطِيفُ", translation_id: "مطلق صفت نرمی والا", translation_en: "The Subtle" },
          { index: 77, latin: "Al Khabir", arabic: "الْخَبِيرُ", translation_id: "مطلق صفت باخبر", translation_en: "The All-Aware" },
          { index: 78, latin: "Al Halim", arabic: "الْحَلِيمُ", translation_id: "مطلق صفت بردبار", translation_en: "The Forbearing" },
          { index: 79, latin: "Al Azim", arabic: "الْعَظِيمُ", translation_id: "مطلق صفت عظیم", translation_en: "The Magnificent" },
          { index: 80, latin: "Al Ghafur", arabic: "الْغَفُورُ", translation_id: "مطلق صفت معاف کرنے والا", translation_en: "The Forgiving" },
          { index: 81, latin: "Ash Shakur", arabic: "الْشَاكُورُ", translation_id: "مطلق صفت شکرگزار", translation_en: "The Appreciative" },
          { index: 82, latin: "Al Ali", arabic: "الْعَلِيُّ", translation_id: "مطلق صفت اعلی", translation_en: "The Most High" },
          { index: 83, latin: "Al Kabir", arabic: "الْكَبِيرُ", translation_id: "مطلق صفت بڑا", translation_en: "The Great" },
          { index: 84, latin: "Al Hafiz", arabic: "الْحَفِيظُ", translation_id: "مطلق صفت محفوظ کرنے والا", translation_en: "The Preserver" },
          { index: 85, latin: "Al Muqit", arabic: "الْمُقيِت", translation_id: "مطلق صفت خوراک دینے والا", translation_en: "The Sustainer" },
          { index: 86, latin: "Al Hasib", arabic: "الْحَسِيبُ", translation_id: "مطلق صفت حساب لینے والا", translation_en: "The Reckoner" },
          { index: 87, latin: "Al Jalil", arabic: "الْجَلِيلُ", translation_id: "مطلق صفت جلال والا", translation_en: "The Majestic" },
          { index: 88, latin: "Al Karim", arabic: "الْكَرِيمُ", translation_id: "مطلق صفت کرم والا", translation_en: "The Generous" },
          { index: 89, latin: "Al Raqib", arabic: "الرَّقِيبُ", translation_id: "مطلق صفت نگران", translation_en: "The Watchful" },
          { index: 90, latin: "Al Mujib", arabic: "الْمُجِيبُ", translation_id: "مطلق صفت جواب دینے والا", translation_en: "The Responsive" },
          { index: 91, latin: "Al Wasi'", arabic: "الْوَاسِعُ", translation_id: "مطلق صفت وسعت والا", translation_en: "The All-Encompassing" },
          { index: 92, latin: "Al Haadi", arabic: "الْهَادِي", translation_id: "مطلق صفت ہدایت دینے والا", translation_en: "The Guide" },
          { index: 93, latin: "Al Baadi'", arabic: "الْبَادِعُ", translation_id: "مطلق صفت سب سے پہلا", translation_en: "The Incomparable" },
          { index: 94, latin: "Al Baqi", arabic: "الْبَاقِي", translation_id: "مطلق صفت باقی", translation_en: "The Everlasting" },
          { index: 95, latin: "Al Warith", arabic: "الْوَارِثُ", translation_id: "مطلق صفت وارث", translation_en: "The Inheritor" },
          { index: 96, latin: "Ar Rashid", arabic: "الرَّشِيدُ", translation_id: "مطلق صفت ہدایت دینے والا", translation_en: "The Righteous Teacher" },
          { index: 97, latin: "As Sabur", arabic: "الصَّبُورُ", translation_id: "مطلق صفت صابر", translation_en: "The Patient" },
          { index: 98, latin: "Al Mu’izz", arabic: "الْمُعِزُّ", translation_id: "مطلق صفت عزت دینے والا", translation_en: "The Giver of Honor" },
          { index: 99, latin: "Al Muthir", arabic: "الْمُثِيرُ", translation_id: "مطلق صفت جوش دلانے والا", translation_en: "The Infuser of Enthusiasm" }
      ];
    
      const result = asmaulhusna.map(a => `\n${a.index}. ${a.latin}: ${a.translation_en} (${a.translation_id})\n   Arabic: ${a.arabic}\n   `).join("");
      await PappyBotInc.sendText(m.chat, contoh + anjuran + result);
    }
      break
    
      case 'duas': {
        if (!q) return replygcpappy(`*Where is the text*\n\n*𝙴xample usage*\n*${prefix + command} <language id>*\n*${prefix + command} en*`);
    
        // Read and parse the JSON file
        let { result } = JSON.parse(fs.readFileSync('./lib/tahlil.json', 'utf-8'));
    
        // Extract language code from command arguments
        let lang = args[0] || 'en';
    
        // Translate and map the result to create captions
        let caption = await Promise.all(result.map(async (v, i) => {
            try {
                // Translate title and translation to the specified language
                let translatedTitleResponse = await translate(v.title, { to: lang, autoCorrect: true }).catch(err => {
                    console.error(`Error translating title: ${err}`);
                    return { text: v.title };
                });
                let translatedTitle = translatedTitleResponse.text || v.title;
    
                let translatedTranslationResponse = await translate(v.translation, { to: lang, autoCorrect: true }).catch(err => {
                    console.error(`Error translating translation: ${err}`);
                    return { text: v.translation };
                });
                let translatedTranslation = translatedTranslationResponse.text || v.translation;
    
                return `*${i + 1}.* ${translatedTitle}
    
    ❃ Arabic :
    ${v.arabic}
    
    ❃ Translate :
    ${translatedTranslation}
    `.trim();
            } catch (error) {
                console.error(`Error translating text: ${error}`);
                return `*${i + 1}.* ${v.title}
    
    ❃ Arabic :
    ${v.arabic}
    
    ❃ Translate :
    ${v.translation}
    `.trim();
            }
        })).then(captions => captions.join('\n\n'));
         // URL for each image (replace with actual URLs or dynamic URLs)
      const imageUrl = `https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png`;
    
        // Send the caption along with an image
        await PappyBotInc.sendMessage(m.chat, {
            image: { url: imageUrl }, // Image URL
            caption: caption // The translated text content
        });
    }
    break;
    
    case 'namaz': {
      const namazData = {
        "result": [
          {
            "id": 1,
            "name": "Opening Takbir",
            "arabic": "اللَّهُ أَكْبَرُ كَبِيرًا وَالْحَمْدُ لِلَّهِ كَثِيرًا وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلاً , إِنِّى وَجَّهْتُ وَجْهِىَ لِلَّذِى فَطَرَ السَّمَوَاتِ وَالأَرْضَ حَنِيفًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ إِنَّ صَلاَتِى وَنُسُكِى وَمَحْيَاىَ وَمَمَاتِى لِلَّهِ رَبِّ الْعَالَمِينَ لاَ شَرِيكَ لَهُ وَبِذَلِكَ أُمِرْتُ وَأَنَا أَوَّلُ الْمُسْلِمِينَ",
            "latin": "Alloohu akbar kabiirow wal hamdu lillaahi katsiiroo wasubhaanalloohi bukrotaw wa-ashiilaa, Innii wajjahtu wajhiya lilladzii fathoros samaawaati wal ardlo haniifaa wamaa ana minal musyrikiin. Inna sholaatii wa nusukii wamahyaa wa mamaatii lillaahi robbil 'aalamiin. Laa syariikalahu wa bidzaalika umirtu wa ana awwalul muslimiin",
            "translation": "Allah is the Greatest, with the greatest greatness. All praise is due to Allah in abundance. Glory be to Allah in the morning and evening. Indeed, I direct my face to Allah who created the heavens and the earth, being upright and not of those who associate others with Him. Indeed, my prayer, my rites of worship, my life, and my death are for Allah, Lord of the Worlds. There is no partner for Him. And with this, I am commanded, and I am the first of the Muslims."
          },
          {
            "id": 2,
            "name": "Al-Fatihah",
            "arabic": "بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ ﴿١﴾الْحَمْدُ لِلَّـهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَـٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَاالصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧",
            "latin": "1. Bismillahirrahmanirrahim, 2. Alhamdulillahi rabbil alamin, 3. Arrahmaanirrahiim, 4. Maaliki yaumiddiin, 5. Iyyaka nabudu waiyyaaka nastaiin, 6. Ihdinashirratal mustaqim, 7. shiratalladzina an’amta alaihim ghairil maghduubi alaihim waladhaalin",
            "translation": "1. In the name of Allah, the Most Gracious, the Most Merciful, 2. Praise be to Allah, Lord of the Worlds, 3. The Most Gracious, the Most Merciful, 4. Master of the Day of Judgment, 5. You alone we worship, and You alone we ask for help, 6. Guide us to the straight path, 7. The path of those who have received Your grace; not the path of those who have brought down wrath upon themselves, nor of those who have gone astray."
          },
          {
            "id": 3,
            "name": "Bowing (Ruku)",
            "arabic": "(3x) سُبْحَانَ رَبِّيَ الْعَظِيْمِ وَبِحَمْدِهِ",
            "latin": "Subhana Rabbiyal Adzimi Wabihamdih (3x)",
            "translation": "Glory is to my Lord, the Most Great, and praise be to Him."
          },
          {
            "id": 4,
            "name": "Prostration (Sujud)",
            "arabic": "(3x) سُبْحَانَ رَبِّىَ الْأَعْلَى وَبِحَمْدِهِ",
            "latin": "Subhaana robbiyal a'la wabihamdih (3x)",
            "translation": "Glory is to my Lord, the Most High, and praise be to Him."
          },
          {
            "id": 5,
            "name": "Sitting Between Two Prostrations",
            "arabic": "رَبِّ اغْفِرْلِيْ وَارْحَمْنِيْ وَاجْبُرْنِيْ وَارْفَعْنِيْ وَارْزُقْنِيْ وَاهْدِنِيْ وَعَافِنِيْ وَاعْفُ عَنِّيْ",
            "latin": "Rabbighfirli Warhamni Wajburnii Warfaknii Wazuqnii Wahdinii Wa'aafinii Wa'fuannii",
            "translation": "O Allah, forgive my sins, have mercy on me, and remedy my shortcomings. Elevate my status, provide for me, guide me, grant me health, and pardon me."
          },
          {
            "id": 6,
            "name": "Sitting for the Initial Tashahhud",
            "arabic": "اَلتَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ ِللهِ، السَّلاَمُ عَلَيْكَ اَيُّهَا النَّبِيُّ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِاللهِ الصَّالِحِيْنَ، أَشْهَدُ اَنْ لآ إِلَهَ إِلاَّاللهُ وَاَشْهَدُ أَنَّ مُحَمَّدًا رَسُوْلُ اللهُ، اَللهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ",
            "latin": "Attahiyyaatul mubaarokaatush sholawaatuth thoyyibaatu lillaah. Assalaamualaika ayyuhan nabiyyu wa rohmatulloohi wa barokaatuh. Assalaaamualainaa wa alaa ibaadillaahish shoolihiin. Asyhadu allaa ilaaha illallooh wa asyhadu anna Muhammadar rosuulullooh. Allahummasholli ala Sayyidina Muhammad",
            "translation": "All greetings, blessings, prayers, and good things are for Allah. Peace be upon you, O Prophet, and the mercy and blessings of Allah. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no deity except Allah, and I bear witness that Muhammad is the Messenger of Allah. O Allah, send blessings upon our master Muhammad."
          },
          {
            "id": 7,
            "name": "Sitting for the Final Tashahhud",
            "arabic": "اَلتَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ ِللهِ، السَّلاَمُ عَلَيْكَ اَيُّهَا النَّبِيُّ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِاللهِ الصَّالِحِيْنَ، أَشْهَدُ اَنْ لآ إِلَهَ إِلاَّاللهُ وَاَشْهَدُ أَنَّ مُحَمَّدًا رَسُوْلُ اللهُ، اَللهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى سَيِّدِنَا اِبْرَاهِيْمَ وَعَلَى آلِ سَيِّدِنَا اِبْرَاهِيْمَ وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَرَكْتَ عَلَى سَيِّدِنَا اِبْرَاهِيْمَ وَعَلَى آلِ سَيِّدِنَا اِبْرَاهِيْمَ فِى الْعَالَمِيْنَ إِنَّكَ حَمِيْدٌ مَجِيْدٌ",
            "latin": "Attahiyyaatul mubaarokaatush sholawaatuth thoyyibaatu lillaah. Assalaamualaika ayyuhan nabiyyu wa rohmatulloohi wa barokaatuh. Assalaaamualainaa wa alaa ibaadillaahish shoolihiin. Asyhadu allaa ilaaha illallooh wa asyhadu anna Muhammadar rosuulullooh. Allahumma Shalli Ala Sayyidina Muhammad Wa Ala Ali Sayyidina Muhammad. Kama Shollaita Ala Sayyidina Ibrahim wa alaa aali sayyidina Ibrahim, wabaarik ala Sayyidina Muhammad Wa Alaa Ali Sayyidina Muhammad, Kama barokta alaa Sayyidina Ibrahim wa alaa ali Sayyidina Ibrahim, Fil aalamiina innaka hamiidummajid",
            "translation": "All greetings, blessings, and good prayers are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no deity except Allah, and I bear witness that Muhammad is the Messenger of Allah. O Allah, send blessings upon our master Muhammad and upon the family of our master Muhammad, as You sent blessings upon our master Ibrahim and upon the family of our master Ibrahim. And bless our master Muhammad and the family of our master Muhammad as You blessed our master Ibrahim and the family of our master Ibrahim throughout the worlds. Verily, You are Praiseworthy, Glorious."
          },
          {
            "id": 8,
            "name": "Salam",
            "arabic": "اَلسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ",
            "latin": "Assalamualaikum Warohmatullahi Wabarokatuh",
            "translation": "Peace be upon you and Allah's mercy and blessings."
          }
        ]
      };
    
      // Generate the message text
      let captionText = namazData.result.map((v, i) => 
        `*${i + 1}. ${v.name}*\n` +
        `*Arabic:* ${v.arabic}\n` +
        `*Latin:* ${v.latin}\n` +
        `*Translation:* _${v.translation}_`
      ).join('\n\n');
    
      let introduction = `*「 Namaz Prayers 」*\n\n`;
      let finalMessage = `${introduction}${captionText}\n\n*Image of Namaz:* [Insert Image URL or Attachment Here]`;
       // URL for each image (replace with actual URLs or dynamic URLs)
      const imageUrl = `https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png`;
    
      // Send the message
       await PappyBotInc.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: finalMessage
        });
    }
    break;
    
    
    case 'masnoonduas': {
        // Read and parse the JSON file
        let src = JSON.parse(fs.readFileSync('./lib/doaharian.json', 'utf-8'));
    
        // Delay function to throttle requests
        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    
        // Translation function with retry logic
        async function translateText(text, targetLang) {
            let retries = 5;
            while (retries > 0) {
                try {
                    await delay(500); // Delay between requests
                    let result = await translate(text, { to: targetLang });
                    return result.text;
                } catch (error) {
                    console.error('Translation error:', error);
                    if (error.message.includes('TooManyRequestsError')) {
                        await delay(10000); // Wait for 10 seconds before retrying
                    } else {
                        return text; // Return original text if translation fails
                    }
                    retries -= 1;
                }
            }
            return text; // Return original text if all retries fail
        }
    
        // Create the caption with translations
        let caption = await Promise.all(src.map(async (v, i) => {
            // Translate title and translation to English
            let translatedTitle = await translateText(v.title, 'en');
            let translatedTranslation = await translateText(v.translation, 'en');
    
            return `
    *${i + 1}.* ${translatedTitle}
    
    ❃ Latin :
    ${v.latin}
    
    ❃ Arabic :
    ${v.arabic}
    
    ❃ Translate :
    ${translatedTranslation}
    `.trim();
        }));
    
        // Join all captions
        let captionText = caption.join('\n\n');
    
        // URL for the image (replace with actual image URL if necessary)
        const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Change this if needed
    
        // Send the caption along with the image
        await PappyBotInc.sendMessage(m.chat, {
            image: { url: imageUrl }, // Image URL
            caption: captionText // The translated text content
        });
    }
    break;
    
    
    
    case 'ayatalkursi': {
      let caption = `
    *「 Ayat Kursi 」*
    اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ
    “Alloohu laa ilaaha illaa huwal hayyul qoyyuum, laa ta’khudzuhuu sinatuw walaa naum. Lahuu maa fissamaawaati wa maa fil ardli man dzal ladzii yasyfa’u ‘indahuu illaa biidznih, ya’lamu maa baina aidiihim wamaa kholfahum wa laa yuhiithuuna bisyai’im min ‘ilmihii illaa bimaa syaa’ wasi’a kursiyyuhus samaawaati wal ardlo walaa ya’uuduhuu hifdhuhumaa wahuwal ‘aliyyul ‘adhiim.”
    
    ترجمہ:
    اللہ، کوئی معبود نہیں سوائے اس کے، جو زندہ ہے، دائمی اور مسلسل اپنے مخلوقات کی دیکھ بھال کرتا ہے؛ نہ اونگھتا ہے اور نہ ہی سوتا ہے۔ جو کچھ آسمانوں اور زمین میں ہے، وہ سب اللہ کا ہے۔ اللہ کے پاس شفاعت کرنے کا اختیار کسی کو بھی نہیں، سوائے اس کے کہ اللہ اجازت دے۔
    اللہ جانتا ہے جو کچھ ان کے سامنے ہے اور جو کچھ ان کے پیچھے ہے، اور وہ اللہ کے علم کے کسی بھی چیز کو نہیں جان سکتے سوائے اس کے جو اللہ چاہے۔ اللہ کی کرسی آسمانوں اور زمین کو محیط ہے، اور اللہ کو ان دونوں کو محفوظ رکھنے میں کوئی بوجھ نہیں محسوس ہوتا، اور اللہ بہت بلند اور عظیم ہے۔
    (QS. Al Baqarah: 255)
      `.trim();
    
      // URL for the image (replace with your preferred image URL)
      const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Update as needed
    
      // Send the caption with the image
      await PappyBotInc.sendMessage(m.chat, {
        image: { url: imageUrl }, // Image URL
        caption: caption // The caption content
      });
    }
    break;
    
    case 'niyatnamaz': {
      if (!q) return replygcpappy(`Usage Example:\nniyatnamaz Subuh`);
    
      // Array containing the prayer intentions
      const niyatnamaz = [
        {
          solat: "subuh",
          latin: "Ushalli fardhosh shubhi rok'ataini mustaqbilal qiblati adaa-an lillaahi ta'aala",
          arabic: "اُصَلِّى فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً ِللهِ تَعَالَى",
          translation_en: "I intend to perform the Fardh of Subuh (Fajr) with two raka'ats facing the Qibla for the sake of Allah Ta'ala",
        },
        {
          solat: "maghrib",
          latin: "Ushalli fardhol maghribi tsalaata raka'aatim mustaqbilal qiblati adaa-an lillaahi ta'aala",
          arabic: "اُصَلِّى فَرْضَ الْمَغْرِبِ ثَلاَثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً ِللهِ تَعَالَى",
          translation_en: "I intend to perform the Fardh of Maghrib with three raka'ats facing the Qibla for the sake of Allah Ta'ala",
        },
        {
          solat: "dzuhur",
          latin: "Ushalli fardhodl dhuhri arba'a raka'aatim mustaqbilal qiblati adaa-an lillaahi ta'aala",
          arabic: "اُصَلِّى فَرْضَ الظُّهْرِاَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً ِللهِ تَعَالَى",
          translation_en: "I intend to perform the Fardh of Dzuhur (Dhuhr) with four raka'ats facing the Qibla for the sake of Allah Ta'ala",
        },
        {
          solat: "isha",
          latin: "Ushalli fardhol 'isyaa-i arba'a raka'aatim mustaqbilal qiblati adaa-an lillaahi ta'aala",
          arabic: "صَلِّى فَرْضَ الْعِشَاءِ اَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً ِللهِ تَعَالَى",
          translation_en: "I intend to perform the Fardh of Isha with four raka'ats facing the Qibla for the sake of Allah Ta'ala",
        },
        {
          solat: "ashar",
          latin: "Ushalli fardhol 'ashri arba'a raka'aatim mustaqbilal qiblati adaa-an lillaahi ta'aala",
          arabic: "صَلِّى فَرْضَ الْعَصْرِاَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً ِللهِ تَعَالَى",
          translation_en: "I intend to perform the Fardh of Ashar (Asr) with four raka'ats facing the Qibla for the sake of Allah Ta'ala",
        }
      ];
    
      // Convert user input to lowercase for matching
      let text = q.toLowerCase() || '';
      let data = niyatnamaz.find(v => v.solat === text);
    
      // If the requested prayer is not found
      if (!data) {
        return replygcpappy(`Command ${text} Not Found\n\nList of 5 Daily Prayers:\n• Subuh\n• Maghrib\n• Dzuhur\n• Isha\n• Ashar`);
      }
    
      // Format the response
      const responseText = `
    _*Intention for the ${text.charAt(0).toUpperCase() + text.slice(1)} Prayer*_
    
    *Arabic:* ${data.arabic}
    
    *Latin:* ${data.latin}
    
    *Translation:* ${data.translation_en}`.trim();
    
      // URL for the image (replace with your preferred image URL)
      const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Update as needed
    
      // Send the response with the image and caption using replygcpappy
      await replygcpappy(responseText);
      
      // Send the image separately as the last reply
      await PappyBotInc.sendMessage(m.chat, {
        image: { url: imageUrl }, // Image URL
        caption: 'Here is the image related to your prayer intention.' // A simple caption for the image
      });
    }
    break;
    
    
    case 'quotesislami': {
      // Array of Islamic quotes
      const islami = [
        { id: "1", arabic: "مَنْ سَارَ عَلىَ الدَّرْبِ وَصَلَ", translation_en: "Whoever walks the path will reach (their goal)." },
        { id: "2", arabic: "مَنْ صَبَرَ ظَفِرَ", translation_en: "Whoever is patient will be successful." },
        { id: "3", arabic: "مَنْ جَدَّ وَجَـدَ", translation_en: "Whoever strives will achieve (success)." },
        { id: "4", arabic: "جَالِسْ أَهْلَ الصِّدْقِ وَالوَفَاءِ", translation_en: "Associate with those who are truthful and trustworthy." },
        { id: "5", arabic: "مَنْ قَلَّ صِدْقُهُ قَلَّ صَدِيْقُهُ", translation_en: "Whoever has little honesty will have few friends." },
        { id: "6", arabic: "مَوَدَّةُ الصَّدِيْقِ تَظْهَرُ وَقْتَ الضِّيْقِ", translation_en: "The affection of a friend shows in times of hardship." },
        { id: "7", arabic: "الصَّبْرُ يُعِيْنُ عَلَى كُلِّ عَمَلٍ", translation_en: "Patience helps with every task." },
        { id: "8", arabic: "وَمَا اللَّذَّةُ إِلاَّ بَعْدَ التَّعَبِ", translation_en: "There is no pleasure except after effort." },
        { id: "9", arabic: "جَرِّبْ وَلاَحِظْ تَكُنْ عَارِفًا", translation_en: "Try and observe, and you will gain knowledge." },
        { id: "10", arabic: "بَيْضَةُ اليَوْمِ خَيْرٌ مِنْ دَجَاجَةِ الغَدِ", translation_en: "Today's egg is better than tomorrow's chicken." },
        { id: "11", arabic: "أُطْلُبِ الْعِلْمَ مِنَ الْمَهْدِ إِلَى الَّلحْدِ", translation_en: "Seek knowledge from the cradle to the grave." },
        { id: "12", arabic: "الوَقْتُ أَثْمَنُ مِنَ الذَّهَبِ", translation_en: "Time is more valuable than gold." },
        { id: "13", arabic: "لاَ خَيْرَ فيِ لَذَّةٍ تَعْقِبُ نَدَماً", translation_en: "There is no good in pleasure that is followed by regret." },
        { id: "14", arabic: "أَخِي لَنْ تَنَالَ العِلْمَ إِلاَّ بِسِتَّةٍ سَأُنْبِيْكَ عَنْ تَفْصِيْلِهَا بِبَيَانٍ: ذَكَاءٌ وَحِرْصٌ وَاجْتِهَادٌ وَدِرْهَمٌ وَصُحْبَةُ أُسْتَاذٍ وَطُوْلُ زَمَانٍ", translation_en: "My brother, you will not attain knowledge except through six things: intelligence, eagerness, diligence, money, companionship with a teacher, and a long period of time." },
        { id: "15", arabic: "لاَ تَكُنْ رَطْباً فَتُعْصَرَ وَلاَ يَابِسًا فَتُكَسَّرَ", translation_en: "Do not be soft so that you are easily squeezed, nor hard so that you are easily broken." },
        { id: "16", arabic: "لِكُلِّ مَقَامٍ مَقَالٌ وَلِكُلِّ مَقَالٍ مَقَامٌ", translation_en: "Every place has its own speech, and every speech has its own place." },
        { id: "17", arabic: "خَيْرُ النَّاسِ أَحْسَنُهُمْ خُلُقاً وَأَنْفَعُهُمْ لِلنَّاسِ", translation_en: "The best of people are those who have the best manners and are the most beneficial to others." },
        { id: "18", arabic: "خَيْرُ جَلِيْسٍ في الزّمانِ كِتابُ", translation_en: "The best companion in any era is a book." },
        { id: "19", arabic: "مَنْ يَزْرَعْ يَحْصُدْ", translation_en: "Whoever plants will harvest." },
        { id: "20", arabic: "لَوْلاَ العِلْمُ لَكَانَ النَّاسُ كَالبَهَائِمِ", translation_en: "If not for knowledge, people would be like animals." },
        { id: "21", arabic: "سَلاَمَةُ الإِنْسَانِ فيِ حِفْظِ اللِّسَانِ", translation_en: "The safety of a person lies in the protection of their tongue (words)." },
        { id: "22", arabic: "الرِّفْقُ بِالضَّعِيْفِ مِنْ خُلُقِ الشَّرِيْفِ", translation_en: "Being gentle with the weak is a mark of noble character." },
        { id: "23", arabic: "وَعَامِلِ النَّاسَ بِمَا تُحِبُّ مِنْهُ دَائِماً", translation_en: "Treat people in a way that you would like to be treated." },
        { id: "24", arabic: "لَيْسَ الجَمَالُ بِأَثْوَابٍ تُزَيِّنُنُا إِنَّ الجَمَالَ جمَاَلُ العِلْمِ وَالأَدَبِ", translation_en: "Beauty is not in the clothes that adorn us, but in knowledge and manners." },
        { id: "25", arabic: "مَنْ أَعاَنَكَ عَلىَ الشَّرِّ ظَلَمَكَ", translation_en: "Whoever helps you in wrongdoing has wronged you." }
      ];
    
      // Select a random quote
      const randomIndex = Math.floor(Math.random() * islami.length);
      const randomQuote = islami[randomIndex];
      const { arabic, translation_en } = randomQuote;
    
      // Format the response text
      const responseText = `${arabic}\n\n${translation_en}`;
    
      // Now send the image with the last reply
      const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
      await PappyBotInc.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: responseText
      });
    }
    break;
    
    case 'assalamualaikum': {
      const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
      await PappyBotInc.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: "Waalaikumsalam Wa Rehmatullahi Wa Barakatuhu"
      });
    }
    break;
    
    
    
    case 'hadith': {
      const apiUrl = 'https://api.lolhuman.xyz/api/hadits/detail/Sunan_Tirmidzi/1769?apikey=dcb4198762eb793a386a9c1c';
    
      try {
        // Fetch Hadith details from the API
        let response = await fetch(apiUrl);
        let data = await response.json();
    
        if (data.status !== 200) {
          return await PappyBotInc.sendText(m.chat, "Failed to fetch Hadith details.");
        }
    
        // Extract the Hadith text and ID
        let hadith = data.result['1'];
        let hadithText = hadith.nass;
    
        // Delay function to throttle requests
        function delay(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
    
        // Translate function with retry logic
        async function translateText(text, targetLang) {
          let retries = 5;
          while (retries > 0) {
            try {
              await delay(500); // Delay between requests
              let result = await translate(text, { to: targetLang });
              return result.text;
            } catch (error) {
              console.error('Translation error:', error);
              if (error.message.includes('TooManyRequestsError')) {
                await delay(10000); // Wait for 10 seconds before retrying
              } else {
                return text; // Return original text if translation fails
              }
              retries -= 1;
            }
          }
          return text; // Return original text if all retries fail
        }
    
        // Translate the Hadith text to Urdu
        let translatedHadith = await translateText(hadithText, 'ur');
    
        // Create the caption with translations
        let captionText = `
    *Hadith ID:* ${hadith.id}
    
    ❃ Original Text:
    ${hadithText}
    
    ❃ Translated Text (Urdu):
    ${translatedHadith}
    `.trim();
    
        // Send the image with caption directly
        const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
        await PappyBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: captionText // Directly use captionText here
        });
    
      } catch (error) {
        console.error('Error fetching or processing Hadith:', error);
        return await PappyBotInc.sendText(m.chat, "An error occurred while fetching the Hadith.");
      }
    }
    break;
    
    
    case 'prophetname': {
      try {
        // Define the API URL
        const apiUrl = `${global.api}islamic/prophet-names?apikey=${global.id}`;
    
        // Fetch data from the API
        let response = await fetch(apiUrl);
        let data = await response.json();
    
        // Check if the request was successful
        if (data.status !== 200) {
          return await PappyBotInc.sendText(m.chat, "Failed to fetch Prophet's name.");
        }
    
        // Extract the Prophet's name
        let prophetName = data.result.name;
    
        // Create the message content
        let captionText = `
    *Prophet's Name:*
    ${prophetName}
    `.trim();
    
        // Now send the image with the last reply
        const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
        await PappyBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: captionText // Directly use captionText here
        });
    
      } catch (error) {
        console.error('Error fetching Prophet\'s name:', error);
        return await PappyBotInc.sendText(m.chat, "An error occurred while fetching the Prophet's name.");
      }
    }
    break;
    
            
    case 'prayertime': {
      // Extract the city name from the command input
      let city = m.text.split(' ').slice(1).join(' ');
      if (!city) {
          return await replygcpappy("Please provide a city name, e.g., `prayertime Lahore`.");
      }
    
      // Define the API URL with the city parameter using global variables
      const apiUrl = `${global.api}islamic/prayer-times?city=${encodeURIComponent(city)}&apikey=${global.id}`;
    
      try {
          // Fetch data from the API
          let response = await fetch(apiUrl);
          let data = await response.json();
    
          // Check if the request was successful
          if (data.status !== 200 || data.result.status_valid !== 1) {
              return await replygcpappy("Failed to fetch prayer times. Please check the city name and try again.");
          }
    
          // Assign emojis for each prayer time
          let fajrEmoji = '🌅';
          let dhuhrEmoji = '🌞';
          let asrEmoji = '🌤';
          let maghribEmoji = '🌇';
          let ishaEmoji = '🌙';
    
          // Extract relevant data
          let cityName = data.result.city;
          let method = data.result.prayer_method_name;
          let items = data.result.items[0];
          let fajr = fajrEmoji + ' Fajr: ' + items.fajr;
          let dhuhr = dhuhrEmoji + ' Dhuhr: ' + items.dhuhr;
          let asr = asrEmoji + ' Asr: ' + items.asr;
          let maghrib = maghribEmoji + ' Maghrib: ' + items.maghrib;
          let isha = ishaEmoji + ' Isha: ' + items.isha;
    
          // Create the message content
          let captionText = `
    *Prayer Times for ${cityName}:*
    
    ${fajr}
    ${dhuhr}
    ${asr}
    ${maghrib}
    ${isha}
    
    *Method:* ${method}
    `.trim();
    
        
          // Now send the image with the last reply
          const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
          await PappyBotInc.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: captionText // Directly use captionText here
          });
    
      } catch (error) {
          console.error('Error fetching prayer times:', error);
          return await replygcpappy("An error occurred while fetching the prayer times.");
      }
    }
    break;
    
    case 'sahihbukhari': {
      // Supported languages
      const languageNames = {
        'ar': 'Arabic',
        'ur': 'Urdu',
        'en': 'English',
        'id': 'Indonesian',
        'bn': 'Bengali',
        'rus': 'Russian',
        'tr': 'Turkish',
        'ta': 'Tamil'
      };
    
      // If no language is specified, send the list of available languages
      if (!text || !Object.keys(languageNames).includes(text.toLowerCase())) {
        let languageList = 'Available languages for Hadith:\n\n';
        for (let lang in languageNames) {
          languageList += `- ${languageNames[lang]} (${lang})\n`;
        }
        languageList += `\nPlease specify a language using the format: \`sahihbukhari <language code>\` (e.g., \`sahihbukhari en\`)`;
        return await replygcpappy(languageList);
      }
    
      // Extract the language from the text (e.g., "en" from "sahihbukhari en")
      const lang = text.toLowerCase();
    
      // If the language is not valid, show the language options
      if (!languageNames[lang]) {
        let languageList = 'Available languages for Hadith:\n\n';
        for (let langCode in languageNames) {
          languageList += `- ${languageNames[langCode]} (${langCode})\n`;
        }
        languageList += `\nPlease choose a valid language.`;
        return await replygcpappy(languageList);
      }
    
      // Generate a random Hadith number between 1 and 7560
      const randomHadithNumber = Math.floor(Math.random() * 7560) + 1;
    
      try {
        // Fetch the Hadith from the API
        let url = `${global.api}islamic/hadith-sahih-al-bukhari?q=${randomHadithNumber}/${lang}&apikey=${global.id}`;
        let response = await fetch(url);
        let data = await response.json();
    
        // Check if the response is successful and contains Hadith data
        if (data.status === 200 && data.result && data.result.data && data.result.data.hadiths) {
          let hadiths = data.result.data.hadiths;
          if (hadiths.length > 0) {
            // Display the Hadith
            let hadith = hadiths[0];
            let captionText = `*Hadith Number:* ${hadith.hadithnumber}\n`
                            + `*Text:* ${hadith.text}\n`
                            + `*Book:* ${hadith.reference.book}\n`
                            + `*Hadith:* ${hadith.reference.hadith}`;
            
          
            // Now send the image with the last reply
            const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
            await PappyBotInc.sendMessage(m.chat, {
              image: { url: imageUrl },
              caption: captionText // Use the Hadith caption here
            });
          } else {
            await PappyBotInc.sendText(m.chat, "*No Hadith found for the given query.*");
          }
        } else {
          await PappyBotInc.sendText(m.chat, "*Failed to fetch Hadith. Please try again later.*");
        }
      } catch (error) {
        await PappyBotInc.sendText(m.chat, "*Error occurred while fetching Hadith.*");
      }
    }
    break;
    
    case 'jamiattirmidhi': {
      // Supported languages
      const languageNames = {
        'ar': 'Arabic',
        'ur': 'Urdu',
        'en': 'English',
        'id': 'Indonesian',
        'bn': 'Bengali',
        'tr': 'Turkish'
      };
    
      // If no language is specified, send the list of available languages
      if (!text || !Object.keys(languageNames).includes(text.toLowerCase())) {
        let languageList = 'Available languages for Hadith:\n\n';
        for (let lang in languageNames) {
          languageList += `- ${languageNames[lang]} (${lang})\n`;
        }
        languageList += `\nPlease specify a language using the format: \`jamiattirmidhi <language code>\` (e.g., \`jamiattirmidhi en\`)`;
        return await replygcpappy(languageList);
      }
    
      // Extract the language from the text (e.g., "en" from "jamiattirmidhi en")
      const lang = text.toLowerCase();
    
      // If the language is not valid, show the language options
      if (!languageNames[lang]) {
        let languageList = 'Available languages for Hadith:\n\n';
        for (let langCode in languageNames) {
          languageList += `- ${languageNames[langCode]} (${langCode})\n`;
        }
        languageList += `\nPlease choose a valid language.`;
        return await replygcpappy(languageList);
      }
    
      // Generate a random Hadith number between 1 and 148
      const randomHadithNumber = Math.floor(Math.random() * 148) + 1;
    
      try {
        // Fetch the Hadith from the API
        let url = `${global.api}islamic/hadith-jami-at-tirmidhi?q=${randomHadithNumber}/${lang}&apikey=${global.id}`;
        let response = await fetch(url);
        let data = await response.json();
    
        // Check if the response is successful and contains Hadith data
        if (data.status === 200 && data.result && data.result.data && data.result.data.hadiths) {
          let hadiths = data.result.data.hadiths;
          if (hadiths.length > 0) {
            // Display the Hadith
            let hadith = hadiths[0];
            let captionText = `*Hadith Number:* ${hadith.hadithnumber}\n`
                            + `*Text:* ${hadith.text}\n`
                            + `*Book:* ${hadith.reference.book}\n`
                            + `*Hadith:* ${hadith.reference.hadith}\n`
                            + `*Grades:*\n${hadith.grades.map(grade => `  *${grade.name}:* ${grade.grade}`).join('\n')}`;
            
            // Send the Hadith text using replygcpappy
            await replygcpappy(captionText);
    
            // Now send the image with the final response
            const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
            await PappyBotInc.sendMessage(m.chat, {
              image: { url: imageUrl },
              caption: captionText // Use the Hadith caption here
            });
          } else {
            await PappyBotInc.sendText(m.chat, "*No Hadith found for the given query.*");
          }
        } else {
          await PappyBotInc.sendText(m.chat, "*Failed to fetch Hadith. Please try again later.*");
        }
      } catch (error) {
        await PappyBotInc.sendText(m.chat, "*Error occurred while fetching Hadith.*");
      }
    }
    break;
    
    
    case 'sunanannasai': {
      // Supported languages
      const languageNames = {
        'ar': 'Arabic',
        'ur': 'Urdu',
        'en': 'English',
        'id': 'Indonesian',
        'bn': 'Bengali',
        'tr': 'Turkish'
      };
    
      // If no language is specified, send the list of available languages
      if (!text || !Object.keys(languageNames).includes(text.toLowerCase())) {
        let languageList = 'Available languages for Hadith:\n\n';
        for (let lang in languageNames) {
          languageList += `- ${languageNames[lang]} (${lang})\n`;
        }
        languageList += `\nPlease specify a language using the format: \`sunanannasai <language code>\` (e.g., \`sunanannasai en\`)`;
        return await replygcpappy(languageList); // Send with replygcpappy for intermediate message
      }
    
      // Extract the language from the text (e.g., "en" from "sunanannasai en")
      const lang = text.toLowerCase();
    
      // If the language is not valid, show the language options
      if (!languageNames[lang]) {
        let languageList = 'Available languages for Hadith:\n\n';
        for (let langCode in languageNames) {
          languageList += `- ${languageNames[langCode]} (${langCode})\n`;
        }
        languageList += `\nPlease choose a valid language.`;
        return await replygcpappy(languageList); // Send with replygcpappy for invalid language
      }
    
      // Generate a random Hadith number between 1 and 324
      const randomHadithNumber = Math.floor(Math.random() * 324) + 1;
    
      try {
        // Fetch the Hadith from the API
        let url = `${global.api}islamic/hadith-sunan-nasai?q=${randomHadithNumber}/${lang}&apikey=${global.id}`;
        let response = await fetch(url);
        let data = await response.json();
    
        // Check if the response is successful and contains Hadith data
        if (data.status === 200 && data.result && data.result.data && data.result.data.hadiths) {
          let hadiths = data.result.data.hadiths;
          if (hadiths.length > 0) {
            // Display the Hadith
            let hadith = hadiths[0];
            let captionText = `*Hadith Number:* ${hadith.hadithnumber}\n`
                            + `*Text:* ${hadith.text}\n`
                            + `*Book:* ${hadith.reference.book}\n`
                            + `*Hadith:* ${hadith.reference.hadith}\n`
                            + `*Grades:*\n${hadith.grades.map(grade => `  *${grade.name}:* ${grade.grade}`).join('\n')}`;
    
           
    
            // Now send the final message with the image and caption
            const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
            await PappyBotInc.sendMessage(m.chat, {
              image: { url: imageUrl },
              caption: captionText // Attach the Hadith caption to the image
            });
          } else {
            await PappyBotInc.sendText(m.chat, "*No Hadith found for the given query.*");
          }
        } else {
          await PappyBotInc.sendText(m.chat, "*Failed to fetch Hadith. Please try again later.*");
        }
      } catch (error) {
        await PappyBotInc.sendText(m.chat, "*Error occurred while fetching Hadith.*");
      }
    }
    break;
    
    case 'jamiattirmidhi': {
      // Supported languages
      const languageNames = {
        'ar': 'Arabic',
        'ur': 'Urdu',
        'en': 'English',
        'id': 'Indonesian',
        'bn': 'Bengali',
        'tr': 'Turkish'
      };
    
      // If no language is specified, send the list of available languages
      if (!text || !Object.keys(languageNames).includes(text.toLowerCase())) {
        let languageList = 'Available languages for Hadith:\n\n';
        for (let lang in languageNames) {
          languageList += `- ${languageNames[lang]} (${lang})\n`;
        }
        languageList += `\nPlease specify a language using the format: \`jamiattirmidhi <language code>\` (e.g., \`jamiattirmidhi en\`)`;
        return await replygcpappy(languageList); // Send with replygcpappy for intermediate message
      }
    
      // Extract the language from the text (e.g., "en" from "jamiattirmidhi en")
      const lang = text.toLowerCase();
    
      // If the language is not valid, show the language options
      if (!languageNames[lang]) {
        let languageList = 'Available languages for Hadith:\n\n';
        for (let langCode in languageNames) {
          languageList += `- ${languageNames[langCode]} (${langCode})\n`;
        }
        languageList += `\nPlease choose a valid language.`;
        return await replygcpappy(languageList); // Send with replygcpappy for invalid language
      }
    
      // Generate a random Hadith number between 1 and 148
      const randomHadithNumber = Math.floor(Math.random() * 148) + 1;
    
      try {
        // Fetch the Hadith from the API
        let url = `${global.api}islamic/hadith-jami-at-tirmidhi?q=${randomHadithNumber}/${lang}&apikey=${global.id}`;
        let response = await fetch(url);
        let data = await response.json();
    
        // Check if the response is successful and contains Hadith data
        if (data.status === 200 && data.result && data.result.data && data.result.data.hadiths) {
          let hadiths = data.result.data.hadiths;
          if (hadiths.length > 0) {
            // Display the Hadith
            let hadith = hadiths[0];
            let captionText = `*Hadith Number:* ${hadith.hadithnumber}\n`
                            + `*Text:* ${hadith.text}\n`
                            + `*Book:* ${hadith.reference.book}\n`
                            + `*Hadith:* ${hadith.reference.hadith}\n`
                            + `*Grades:*\n${hadith.grades.map(grade => `  *${grade.name}:* ${grade.grade}`).join('\n')}`;
    
            
            // Now send the final message with the image and caption
            const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
            await PappyBotInc.sendMessage(m.chat, {
              image: { url: imageUrl },
              caption: captionText // Attach the Hadith caption to the image
            });
          } else {
            await PappyBotInc.sendText(m.chat, "*No Hadith found for the given query.*");
          }
        } else {
          await PappyBotInc.sendText(m.chat, "*Failed to fetch Hadith. Please try again later.*");
        }
      } catch (error) {
        await PappyBotInc.sendText(m.chat, "*Error occurred while fetching Hadith.*");
      }
    }
    break;
    
    


//-------------------------------------------------------------------------------------------------------------//


//  ▄▀▄ █▄ █ ▀█▀ █▄ ▄█ █▀▀   █▀▀ █▀█ █▄ ▄█ █▄ ▄█ █▄ █ ▄▀▄ █▀▄ █▀▀ 
//  █▀█ █ ▀█ ▄█▄ █ ▀ █ ██▄   █▄▄ █▄█ █ ▀ █ █ ▀ █ █ ▀█ █▀█ █▄▀ ▄██ 


case 'searchanime': {
  if (!text) return replygcpappy(`Which anime are you looking for?`);

  const malScraper = require('mal-scraper');
  await PappyStickWait();

  try {
      // Fetch anime info
      const anime = await malScraper.getInfoFromName(text).catch(() => null);
      if (!anime) return replygcpappy(`Could not find any anime with the name "${text}"`);

      // Prepare anime info message
      let animetxt = `
🎀 *Title:* ${anime.title}
🎋 *Type:* ${anime.type}
🎐 *Premiered on:* ${anime.premiered}
💠 *Total Episodes:* ${anime.episodes}
📈 *Status:* ${anime.status}
💮 *Genres:* ${anime.genres}
🌟 *Score:* ${anime.score}
💎 *Rating:* ${anime.rating}
🏅 *Rank:* ${anime.ranked}
🌐 *URL:* ${anime.url}
❄ *Description:* ${anime.synopsis}`;

      // Send the message with anime image and info
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: anime.picture },
          caption: `Hi ${m.pushName}\n_*Here is the result of ${text}*_\n\n${animetxt}`
      }, { quoted: m });

  } catch (e) {
      console.error(e);
      return replygcpappy("❗ Error fetching the anime. Please try again.");
  }
}
break;


case 'animequote': {
  try {
    const res = await fetch('https://some-random-api.com/animu/quote');
    if (!res.ok) throw await res.text()
    const json = await res.json()
    const { sentence, character, anime } = json
    const message = `🌟Quote\n${sentence}\n\n🌟Character: \`\`\`${character}\`\`\`\n🌟Anime: \`\`\`${anime}\`\`\`\n`
    
    // Send the message using replygcpappy
    return replygcpappy(message)
  } catch (error) {
    console.error(error)
  }
 }
  break


case 'loli': {
  let baseUrl = 'https://weeb-api.vercel.app/';
  const response = await fetch(baseUrl + 'loli');  // Replace with 'loli' command
  const imageBuffer = await response.buffer();  // Get image buffer

  // Send the image with a simple message
  await PappyBotInc.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `Hi ${m.pushName} 👋\n_*Here is the result of loli 🍭*_`
  }, { quoted: m });
}
break;

case 'waifu': {
  let baseUrl = 'https://weeb-api.vercel.app/';
  const response = await fetch(baseUrl + 'waifu');  // Replace with 'waifu' command
  const imageBuffer = await response.buffer();  // Get image buffer

  // Send the image with a simple message
  await PappyBotInc.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `Hi ${m.pushName} 👋\n_*Here is the result of waifu 💖*_`
  }, { quoted: m });
}
break;

case 'neko': {
  let baseUrl = 'https://weeb-api.vercel.app/';
  const response = await fetch(baseUrl + 'neko');  // Replace with 'neko' command
  const imageBuffer = await response.buffer();  // Get image buffer

  // Send the image with a simple message
  await PappyBotInc.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `Hi ${m.pushName} 👋\n_*Here is the result of neko 🐾🐱*_`
  }, { quoted: m });
}
break;

    case 'traceanime': {
  try {
      let q = m.quoted ? m.quoted : m;
      let mime = (q.msg || q).mimetype || q.mediaType || "";
      if (!mime.startsWith('image')) {
          return replygcpappy("*Respond to an image*");
      }
      let data = await q.download();
      let image = await uploadImage(data);
      let apiUrl = `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(image)}`;
      let response = await fetch(apiUrl);
      let result = await response.json();
      if (!result || result.error || result.result.length === 0) {
          return replygcpappy("*Error: Could not track the anime.*");
      }
      let { anilist, from, to, similarity, video, episode } = result.result[0];
      let animeTitle = anilist.title ? anilist.title.romaji || anilist.title.native : "Unknown Title";
      let message = `*Anime:* ${animeTitle}\n`;
      if (anilist.synonyms && anilist.synonyms.length > 0) {
          message += `*Synonyms:* ${anilist.synonyms.join(", ")}\n`;
      }
      message += `*Similarity:* ${similarity.toFixed(2)}%\n`;
      message += `*Time:* ${formatDuration(from * 1000)} - ${formatDuration(to * 1000)}\n`;
      if (episode) {
          message += `*Episode:* ${episode}\n`;
      }

      // Send the video with anime information as the caption
      await PappyBotInc.sendMessage(m.chat, {
          video: { url: video },
          caption: message
      }, { quoted: m });
  } catch (error) {
      console.error("Error:", error);
      replygcpappy("*Error: Could not track the anime or send the video.*");
  }
}
break;


//Stickers of anime and manga
    case 'shinobu':{
axios.get(`https://api.waifu.pics/sfw/shinobu`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickhandhold': {
axios.get(`https://api.waifu.pics/sfw/handhold`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickshinobu': {
axios.get(`https://api.waifu.pics/sfw/shinobu`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickhighfive': {
axios.get(`https://api.waifu.pics/sfw/highfive`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickcuddle': {
axios.get(`https://api.waifu.pics/sfw/cuddle`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickcringe': {
axios.get(`https://api.waifu.pics/sfw/cringe`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickdance': {
axios.get(`https://api.waifu.pics/sfw/dance`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickhappy': {
axios.get(`https://api.waifu.pics/sfw/happy`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickglomp': {
axios.get(`https://api.waifu.pics/sfw/glomp`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'sticksmug': {
axios.get(`https://api.waifu.pics/sfw/smug`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickblush': {
axios.get(`https://api.waifu.pics/sfw/blush`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickawoo': {
axios.get(`https://api.waifu.pics/sfw/awoo`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickwave': {
axios.get(`https://api.waifu.pics/sfw/wave`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'sticksmile': {
axios.get(`https://api.waifu.pics/sfw/smile`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
      
case 'stickslap': {
axios.get(`https://api.waifu.pics/sfw/slap`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'sticknom': {
axios.get(`https://api.waifu.pics/sfw/nom`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickpoke': {
axios.get(`https://api.waifu.pics/sfw/poke`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickwink': {
axios.get(`https://api.waifu.pics/sfw/wink`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickbonk': {
axios.get(`https://api.waifu.pics/sfw/bonk`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickbully': {
axios.get(`https://api.waifu.pics/sfw/bully`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickyeet': {
axios.get(`https://api.waifu.pics/sfw/yeet`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickbite': {
axios.get(`https://api.waifu.pics/sfw/bite`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickkiss': {
axios.get(`https://api.waifu.pics/sfw/kiss`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'sticklick': {
axios.get(`https://api.waifu.pics/sfw/lick`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickpat': {
axios.get(`https://api.waifu.pics/sfw/pat`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickhug': {
axios.get(`https://api.waifu.pics/sfw/hug`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickkill': {
axios.get(`https://api.waifu.pics/sfw/kill`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickcry': {
axios.get(`https://api.waifu.pics/sfw/cry`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'stickspank':{
              axios.get(`https://nekos.life/api/v2/img/spank`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
      
case 'sticktickle':{
              axios.get(`https://nekos.life/api/v2/img/tickle`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break




case 'animeinfo': {
  if (!text) return replygcpappy(`Which anime are you looking for?`);

  const fetchAnimeInfo = async (animeName) => {
    const api = `https://abra.abrahamdw882.workers.dev/search/${encodeURIComponent(animeName)}`;

    try {
      const response = await axios.get(api);
      if (response.status !== 200 || !response.data.results || response.data.results.length === 0) {
        console.error('No results found in API response');
        return null;
      }
      return response.data.results;
    } catch (error) {
      console.error('Error fetching anime info:', error);
      return null;
    }
  };

  await PappyStickWait();
  const animeName = text.trim();
  const results = await fetchAnimeInfo(animeName);

  if (!results) {
    return replygcpappy('❌ Failed to fetch anime information. Please try again.');
  }

  let animetxt = `Anime Information for *"${animeName}"*:\n\n`;
  results.forEach(anime => {
    animetxt += `🎀 *Title:* ${anime.title}\n🎋 *Release Date:* ${anime.releaseDate}\n🆔 *ID:* ${anime.id}\n🌐 *Link:* ${anime.link}\n🖼️ *Image:* ${anime.img}\n\n`;
  });

  await PappyBotInc.sendMessage(m.chat, {
    text: `Hi ${m.pushName}\n_*Here is the result of ${animeName}*_\n\n${animetxt}`,
    image: { url: results[0].img },
    quoted: m
  });

}
break;
               

case 'sendanimeid': {
  if (!text) return replygcpappy(`Please provide the anime name to fetch IDs.`);

  const fetchAnimeIds = async (animeName) => {
    const api = `https://abra.abrahamdw882.workers.dev/search/${encodeURIComponent(animeName)}`;

    try {
      const response = await fetch(api);
      if (!response.ok) {
        console.error(`API response not OK: ${response.status} ${response.statusText}`);
        throw new Error('API response not OK');
      }
      const json = await response.json();
      if (json.results && json.results.length > 0) {
        return json.results.map(anime => ({ id: anime.id, title: anime.title })); // Return list of anime IDs and titles
      } else {
        console.error('No results found in API response');
      }
    } catch (error) {
      console.error(`Error fetching from ${api}:`, error);
    }
    return null; // Return null if no results found
  };

  await PappyStickWait();
  const animeName = text.trim();
  const animeData = await fetchAnimeIds(animeName);

  if (!animeData) {
    return replygcpappy('❌ Failed to fetch anime IDs. Please try again.');
  }

  if (animeData.length === 0) {
    return replygcpappy(`No anime IDs found for "${animeName}".`);
  }

  // Generate detailed text with title first, then ID
  let idText = `🎌 *Anime IDs for "${animeName}"* 🎌\n\n`;
  animeData.forEach((anime, index) => {
    idText += `🎥 *Title:* ${anime.title}\n🆔 *ID:* ${anime.id}\n\n`;
  });

  // Send the detailed ID and title list
  await PappyBotInc.sendMessage(m.chat, { text: idText });
}
break;

case 'animedl': {
  if (!isPremium) return replyprem(mess.premium);
  if (!text) return replygcpappy(`Example: ${prefix + command} one-piece,1`);

  await PappyStickWait();

  try {
      const [animeId, episode] = text.split(',');
      if (!animeId || !episode) {
          return replygcpappy('Invalid format. Please use: .animedl <anime-id>,<episode-number>');
      }

      const formattedText = `${animeId.trim()}-episode-${episode.trim()}`;
      const apiUrls = [
          `https://api2.abrahamdw882.workers.dev/download/${formattedText}`,
          `https://abra.abrahamdw882.workers.dev/download/${formattedText}`,
          `https://api1.toontamilindia.workers.dev/download/${formattedText}`
      ];

      let videoUrl = '';
      for (let apiUrl of apiUrls) {
          try {
              const response = await axios.get(apiUrl);
              if (response.status === 200) {
                  const json = response.data;
                  const keys = Object.keys(json.results);
                  if (keys.length >= 2) {
                      videoUrl = json.results[keys[1]]; // First fallback to the second result
                  }
                  if (!videoUrl && keys.length >= 1) {
                      videoUrl = json.results[keys[0]]; // Fallback to the first result if second isn't available
                  }
                  if (videoUrl) break;
              }
          } catch (error) {
              console.warn(`Failed to fetch from ${apiUrl}:`, error);
          }
      }

      if (!videoUrl) {
          return replygcpappy('❌ No video link found. Please check the ID and episode number, and try again.');
      }

      // Prepare video details message
      const animeName = animeId.replace(/-/g, ' ');
      const caption = `📹 *Anime Video Downloaded*\n\n🌐 *Anime Website:* _Gogoanime_\n📂 *Anime Name:* _${animeName}_\n📅 *Episode No:* _${episode.trim()}_\n🆔 *Episode Id:* _${formattedText}_\n🌐 *Resolution:* _Auto_\n📜 *Subtitles Language:* _English_\n💻 *Server:* _Kali Linux_\n📅 *Download Date:* _${new Date().toLocaleDateString()}_\n⏰ *Download Time:* _${new Date().toLocaleTimeString()}_\n📥 *Downloaded By:* _PAPPY-V4_\n👤 *Feature By:* _Pappy_`;

      // Send video and details
      await PappyBotInc.sendMessage(m.chat, {
          video: { url: videoUrl },
          caption: caption
      }, { quoted: m });

      await PappyBotInc.sendMessage(m.chat, { react: { text: "☑️", key: m.key } });

  } catch (error) {
      console.error('Error fetching video:', error);
      await PappyBotInc.sendMessage(m.chat, { react: { text: "✖️", key: m.key } });
      replygcpappy('❌ An error occurred while fetching the video. Please try again later.');
  }
}
break;
              
                
 //Manga Cmds               

case 'mangainfo': {
  const mangaTitle = text.trim();
  if (!mangaTitle) {
    return replygcpappy('❌ Provide a manga title, e.g., mangainfo One Piece');
  }

  try {
    const mangaSearchUrl = `https://api.mangadex.org/manga?title=${encodeURIComponent(mangaTitle)}&limit=1&availableTranslatedLanguage[]=en`;
    const searchResponse = await axios.get(mangaSearchUrl);

    if (!searchResponse.data || !searchResponse.data.data || searchResponse.data.data.length === 0) {
      return replygcpappy(`❌ No English manga found with the title "${mangaTitle}".`);
    }

    const manga = searchResponse.data.data[0];
    const { title, description, status, tags } = manga.attributes;

    const genres = tags
      .map((tag) => tag.attributes.name.en)
      .join(', ') || 'Unknown';

    const replyText = `
*📖 Manga Info:*
📚 *Title:* ${title.en || 'No title available'}
📜 *Description:* ${description.en || 'No description available'}
🔖 *Status:* ${status || 'Unknown'}
🎭 *Genres:* ${genres}
`;

    return replygcpappy(replyText);
  } catch (error) {
    console.error('Error fetching manga info:', error.message);
    return replygcpappy(`❌ Error fetching manga info: ${error.message}`);
  }
}
break;

case 'searchchapter': {
  const mangaTitle = text.trim();
  if (!mangaTitle) {
    return replygcpappy('❌ Provide a manga title, e.g., searchchapter One Piece');
  }

  try {
    const mangaSearchUrl = `https://api.mangadex.org/manga?title=${encodeURIComponent(mangaTitle)}&limit=1&availableTranslatedLanguage[]=en`;
    const searchResponse = await axios.get(mangaSearchUrl);

    if (!searchResponse.data || !searchResponse.data.data || searchResponse.data.data.length === 0) {
      return replygcpappy(`❌ No English manga found with the title "${mangaTitle}".`);
    }

    const mangaId = searchResponse.data.data[0].id;
    const chaptersUrl = `https://api.mangadex.org/chapter?manga=${mangaId}&translatedLanguage[]=en&limit=10`;
    const chaptersResponse = await axios.get(chaptersUrl);

    if (!chaptersResponse.data || chaptersResponse.data.data.length === 0) {
      return replygcpappy(`❌ No chapters found for "${mangaTitle}".`);
    }

    const chaptersList = chaptersResponse.data.data
      .map(
        (chapter) =>
          `📘 Chapter ${chapter.attributes.chapter}: ${chapter.attributes.title || "Untitled"}`
      )
      .join('\n');

    const replyText = `*📚 Available Chapters for "${mangaTitle}":*\n${chaptersList}`;
    return replygcpappy(replyText);
  } catch (error) {
    console.error('Error fetching chapters:', error.message);
    return replygcpappy(`❌ Error fetching chapters: ${error.message}`);
  }
}
break;


case 'mangachapter': {
  const input = text.trim();
  if (!input) {
    return replygcpappy('❌ Please provide a manga title and chapter, e.g., One Piece chapter 1120.');
  }

  const match = input.match(/(.+?)\s+chapter\s+(\d+)/i);
  if (!match) {
    return replygcpappy('❌ Invalid format. Use: <title> chapter <number>');
  }
  await PappyStickWait();
  await replygcpappy('PLEASE WAIT 30SEC');
  const mangaTitle = match[1].trim();
  const chapterNumber = match[2];
  const baseUrl = 'https://api.mangadex.org';

  try {
    // Search for manga
    const searchResponse = await axios.get(`${baseUrl}/manga`, {
      params: { title: mangaTitle, limit: 1, availableTranslatedLanguage: ['en'] },
    });

    if (searchResponse.data.data.length === 0) {
      return replygcpappy(`❌ No manga found with the title "${mangaTitle}".`);
    }

    const mangaId = searchResponse.data.data[0].id;

    // Get the chapter
    const chapterResponse = await axios.get(`${baseUrl}/chapter`, {
      params: { manga: mangaId, chapter: chapterNumber, translatedLanguage: ['en'] },
    });

    if (chapterResponse.data.data.length === 0) {
      return replygcpappy(`❌ No chapter ${chapterNumber} found for "${mangaTitle}".`);
    }

    const chapterId = chapterResponse.data.data[0].id;
    const serverResponse = await axios.get(`${baseUrl}/at-home/server/${chapterId}`);
    const { baseUrl: chapterBaseUrl, chapter } = serverResponse.data;

    const imageUrls = chapter.data.map(
      (fileName) => `${chapterBaseUrl}/data/${chapter.hash}/${fileName}`
    );

    if (imageUrls.length === 0) {
      return replygcpappy(`❌ No images found for chapter ${chapterNumber} of "${mangaTitle}".`);
    }

    // P4/P5: Send chapter pages as native album (up to 10 per album) instead of PDF
    const pageLimit = Math.min(imageUrls.length, 30);
    const pagesToSend = imageUrls.slice(0, pageLimit);
    await replygcpappy(`📖 Sending ${pagesToSend.length} pages of *${mangaTitle}* Ch.${chapterNumber} as albums...`);

    // Fetch all page buffers
    const pageBuffers = [];
    for (const imgUrl of pagesToSend) {
      try {
        const buf = (await axios.get(imgUrl, { responseType: 'arraybuffer' })).data;
        pageBuffers.push(Buffer.from(buf));
      } catch { pageBuffers.push(null); }
    }
    const validPages = pageBuffers.filter(Boolean);

    // Send in albums of up to 10
    for (let i = 0; i < validPages.length; i += 10) {
      const batch = validPages.slice(i, i + 10);
      await PappyBotInc.sendMessage(m.chat, {
        album: batch.map((buf, idx) => ({
          image: buf,
          caption: idx === 0 ? `📖 *${mangaTitle}* — Chapter ${chapterNumber} (pages ${i + 1}–${i + batch.length})` : undefined
        }))
      }, { quoted: m });
      await sleep(1500);
    }

  } catch (error) {
    console.error('Error fetching manga chapter:', error.message);
    return replygcpappy('❌ An error occurred while fetching the chapter. Please try again later.');
  }
}
break;

        
        case 'mangachapter2': {
            
  const input = text.trim();
  if (!input) {
    return replygcpappy('❌ Please provide a manga title and chapter, e.g., One Piece chapter 1120.');
  }
  const apiUrl = 'https://api.mangadex.org'; 
  const match = input.match(/(.+?)\s+chapter\s+(\d+)/i);
  if (!match) {
    return replygcpappy('❌ Invalid format. Use: <title> chapter <number>');
  }

  await PappyStickWait();
  await replygcpappy('PLEASE WAIT 30SEC');

  const mangaTitle = match[1].trim();
  const chapterNumber = match[2];

  try {
    // Search for manga
    const mangaResults = await searchManga(mangaTitle, 1, 1);
    if (mangaResults.length === 0) {
      return replygcpappy(`❌ No manga found with the title "${mangaTitle}".`);
    }

    const mangaId = mangaResults[0].id;

    // Get chapter
    const chapterResponse = await axios.get(`${apiUrl}/chapter`, {
      params: { manga: mangaId, chapter: chapterNumber, translatedLanguage: ['en'] },
    });

    if (!chapterResponse.data.data || chapterResponse.data.data.length === 0) {
      return replygcpappy(`❌ No chapter ${chapterNumber} found for "${mangaTitle}".`);
    }

    const chapterId = chapterResponse.data.data[0].id;

    // Fetch chapter pages
    const pages = await fetchChapterPages(chapterId);

    if (pages.length === 0) {
      return replygcpappy(`❌ No images found for chapter ${chapterNumber} of "${mangaTitle}".`);
    }

    // Create PDF
    const pdfPath = `/tmp/manga_${mangaTitle}_chapter_${chapterNumber}.pdf`;
    const pdfDoc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);

    pdfDoc.pipe(writeStream);

    for (const page of pages) {
      const imageBuffer = (await axios.get(page.img, { responseType: 'arraybuffer' })).data;
      pdfDoc.addPage().image(imageBuffer, { fit: [500, 700], align: 'center', valign: 'center' });
    }

    pdfDoc.end();

    writeStream.on('finish', async () => {
      await PappyBotInc.sendMessage(m.chat, {
        document: { url: pdfPath },
        fileName: `Manga_${mangaTitle}_Chapter_${chapterNumber}.pdf`,
        mimetype: 'application/pdf',
      }, { quoted: m });

      fs.unlinkSync(pdfPath);
    });
  } catch (error) {
    console.error('Error fetching manga chapter:', error.message);
    return replygcpappy('❌ An error occurred while fetching the chapter. Please try again later.');
  }
}
break;

case 'randommanga': {
  try {
    const offset = Math.floor(Math.random() * 1000);
    const randomUrl = `https://api.mangadex.org/manga?limit=1&offset=${offset}&availableTranslatedLanguage[]=en`;
    const response = await axios.get(randomUrl);

    if (!response.data || !response.data.data || response.data.data.length === 0) {
      return replygcpappy('❌ Could not fetch a random manga. Please try again.');
    }

    const manga = response.data.data[0];
    const { title, description, status, tags } = manga.attributes;

    const genres = tags.map(tag => tag.attributes.name.en).join(", ") || "N/A";
    const mangaDetails = `
*📖 Random Manga Suggestion:*
⭐ *Title:* ${title.en || "N/A"}
📝 *Description:* ${description?.en || "No description available"}
📚 *Status:* ${status || "Unknown"}
🎭 *Genres:* ${genres}
    `;

    return replygcpappy(mangaDetails);
  } catch (error) {
    console.error('Error fetching random manga:', error.message);
    return replygcpappy(`❌ Error fetching random manga: ${error.message}`);
  }
}
break;

case 'animeedit': case 'amv': {
  PappyStickWait(); // Indicate that the bot is processing the request

  try {
      // List of available API URLs
      const apiUrls = [
          'https://aemt.uk.to/download/storyanime',
          'https://meitang.xyz/download/storyanime',
          'https://btch.us.kg/download/storyanime',
          'https://api.tioo.eu.org/download/storyanime',
          'https://api.tioprm.eu.org/download/storyanime'
      ];

      // Select a random API URL
      const randomApiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)];

      // Fetch anime status video from the selected API
      const response = await axios.get(randomApiUrl, {
          headers: {
              accept: 'application/json' // Set the accept header to request JSON response
          }
      });
      console.log('API Response:', response.data); // Log the response for debugging

      // Check if the response is successful and contains the result
      if (!response.data.status || !response.data.result) {
          throw new Error('Failed to fetch anime status video.');
      }

      const { title, url } = response.data.result;

      // Prepare caption and send video
      const caption = `🎬 *Enjoy your Anime Edit!* ✨`;

      await PappyBotInc.sendMessage(m.chat, {
          video: { url: url },
          caption: caption,
          mimetype: 'video/mp4', // Specify the MIME type
      }, { quoted: m });
  } catch (error) {
      console.error('Error in storyanime command:', error.message); // Log specific error message
      replygcpappy('⚠️ An error occurred while fetching the anime status video.');
  }
}
break;



case 'wallhp': case 'akira': case 'akiyama': case 'ana': case 'art': case 'asuna': case 'ayuzawa': case 'boruto': case 'bts': case 'chiho': case 'chitoge': case 'cosplay': case 'cosplayloli': case 'cosplaysagiri': case 'cyber': case 'deidara': case 'doraemon': case 'elaina': case 'emilia': case 'erza': case 'exo':  case 'gamewallpaper': case 'gremory': case 'hacker': case 'hestia': case 'husbu': case 'inori': case 'islamic': case 'isuzu': case 'itachi': case 'itori': case 'jennie': case 'jiso': case 'justina': case 'kaga': case 'kagura': case 'kakasih': case 'kaori': case 'cartoon': case 'shortquote': case 'keneki': case 'kotori': case 'kurumi': case 'lisa': case 'loli2': case 'madara': case 'megumin': case 'mikasa': case 'mikey': case 'miku': case 'minato': case 'mountain': case 'naruto': case 'nekonime': case 'nezuko': case 'onepiece': case 'pentol': case 'pokemon': case 'programming':  case 'randomnime': case 'randomnime2': case 'rize': case 'rose': case 'sagiri': case 'sakura': case 'sasuke': case 'satanic': case 'shina': case 'shinka': case 'shinomiya': case 'shizuka': case 'shota': case 'space': case 'technology': case 'tejina': case 'toukachan': case 'tsunade': case 'waifu2': case 'yotsuba': case 'yuki': case 'yulibocil': case 'yumeko': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      let heyy;
      if (/akira/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/akira.json')
if (/akiyama/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/akiyama.json')
if (/ana/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/ana.json')
if (/art/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/art.json')
if (/asuna/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/asuna.json')
if (/ayuzawa/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/ayuzawa.json')
if (/boneka/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/boneka.json')
if (/boruto/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/boruto.json')
if (/bts/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/bts.json')
if (/cecan/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/cecan.json')
if (/chiho/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/chiho.json')
if (/chitoge/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/chitoge.json')
if (/cogan/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/cogan.json')
if (/cosplay/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/cosplay.json')
if (/cosplayloli/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/cosplayloli.json')
if (/cosplaysagiri/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/cosplaysagiri.json')
if (/cyber/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/cyber.json')
if (/deidara/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/deidara.json')
if (/doraemon/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/doraemon.json')
if (/eba/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/eba.json')
if (/elaina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/elaina.json')
if (/emilia/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/emilia.json')
if (/erza/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/erza.json')
if (/exo/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/exo.json')
if (/femdom/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/femdom.json')
if (/freefire/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/freefire.json')
if (/gamewallpaper/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/gamewallpaper.json')
if (/glasses/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/glasses.json')
if (/gremory/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/gremory.json')
if (/hacker/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/hekel.json')
if (/hestia/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/hestia.json')
if (/husbu/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/husbu.json')
if (/inori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/inori.json')
if (/islamic/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/islamic.json')
if (/isuzu/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/isuzu.json')
if (/itachi/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/itachi.json')
if (/itori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/itori.json')
if (/jennie/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/jeni.json')
if (/jiso/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/jiso.json')
if (/justina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/justina.json')
if (/kaga/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/kaga.json')
if (/kagura/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/kagura.json')
if (/kakasih/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/kakasih.json')
if (/kaori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/kaori.json')
if (/cartoon/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/kartun.json')
if (/shortquote/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/katakata.json')
if (/keneki/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/keneki.json')
if (/kotori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/kotori.json')
if (/kpop/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/kpop.json')
if (/kucing/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/kucing.json')
if (/kurumi/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/kurumi.json')
if (/lisa/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/lisa.json')
if (/loli2/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/loli.json')
if (/madara/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/madara.json')
if (/megumin/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/megumin.json')
if (/mikasa/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/mikasa.json')
if (/mikey/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/mikey.json')
if (/miku/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/miku.json')
if (/minato/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/minato.json')
if (/mobile/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/mobil.json')
if (/motor/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/motor.json')
if (/mountain/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/mountain.json')
if (/naruto/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/naruto.json')
if (/nekonime/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/nekonime.json')
if (/nezuko/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/nezuko.json')
if (/onepiece/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/onepiece.json')
if (/pentol/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/pentol.json')
if (/pokemon/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/pokemon.json')
if (/profil/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/profil.json')
if (/progamming/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/programming.json')
if (/pubg/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/pubg.json')
if (/randblackpink/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/randblackpink.json')
if (/randomnime/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/randomnime.json')
if (/randomnime2/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/randomnime2.json')
if (/rize/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/rize.json')
if (/rose/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/rose.json')
if (/ryujin/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/ryujin.json')
if (/sagiri/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/sagiri.json')
if (/sakura/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/sakura.json')
if (/sasuke/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/sasuke.json')
if (/satanic/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/satanic.json')
if (/shina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/shina.json')
if (/shinka/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/shinka.json')
if (/shinomiya/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/shinomiya.json')
if (/shizuka/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/shizuka.json')
if (/shota/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/shota.json')
if (/space/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/tatasurya.json')
if (/technology/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/technology.json')
if (/tejina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/tejina.json')
if (/toukachan/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/toukachan.json')
if (/tsunade/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/tsunade.json')
if (/waifu2/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/waifu.json')
if (/wallhp/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/wallhp.json')
if (/wallml/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/wallml.json')
if (/wallmlnime/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/wallnime.json')
if (/yotsuba/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/yotsuba.json')
if (/yuki/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/yuki.json')
if (/yulibocil/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/yulibocil.json')
if (/yumeko/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/master/yumeko.json')

      let yeha = heyy[Math.floor(Math.random() * heyy.length)];

      // Prepare and send the image with caption
      const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_`;
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: yeha },
          caption: caption,
      }, { quoted: m });

  } catch (error) {
      console.error('Error in wallhp command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later. 😓');
  }
}
break;


//------------------------------------------------------------------------------------------------//
case 'anime': {
    // Get the anime name from the user's input
    let queryText = args.join(' ');

    // Check if queryText is provided
    if (!queryText) {
        return await PappyBotInc.sendText(m.chat, "⚠️ Please provide the name of the anime.");
    }

    // Check if the query includes '-tr' for translation
    const translateFlag = queryText.endsWith('-tr');
    if (translateFlag) {
        queryText = queryText.slice(0, -4).trim(); // Remove the '-tr' from the query
    }

    // Define the API URL with the user's query
    const apiUrl = `https://api.lolhuman.xyz/api/anime?apikey=dcb4198762eb793a386a9c1c&query=${encodeURIComponent(queryText)}`;

    try {
        // Fetch data from the API
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status !== 200 || !data.result || data.result.length === 0) {
            return await PappyBotInc.sendText(m.chat, "❌ Failed to fetch anime details. Please check the query and try again.");
        }

        const anime = data.result;

        // Extract relevant data with safety checks
        const title = anime.title?.english || anime.title?.romaji || anime.title?.native || 'Unknown Title';
        const description = anime.description || 'No description available.';
        const genres = anime.genres?.join(', ') || 'Unknown';
        const status = anime.status || 'Unknown';
        const episodes = anime.episodes || 'Unknown';
        const duration = anime.duration || 'Unknown';
        const startDate = anime.startDate ? `${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}` : 'N/A';
        const endDate = anime.endDate ? `${anime.endDate.year}-${anime.endDate.month}-${anime.endDate.day}` : 'N/A';

        // Delay function to throttle requests
        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // Translate function with retry logic
        async function translateText(text, targetLang) {
            let retries = 5;
            while (retries > 0) {
                try {
                    await delay(500); // Delay between requests
                    let result = await translate(text, { to: targetLang });
                    return result.text;
                } catch (error) {
                    console.error('Translation error:', error);
                    if (error.message.includes('TooManyRequestsError')) {
                        await delay(10000); // Wait for 10 seconds before retrying
                    } else {
                        return text; // Return original text if translation fails
                    }
                    retries -= 1;
                }
            }
            return text; // Return original text if all retries fail
        }

        // Translate description if needed
        let translatedDescription = description;
        if (translateFlag) {
            translatedDescription = await translateText(description, 'ur');
        }

        // Create the caption with translations and emojis
        const captionText = `*🌟 Title:* ${title}

✨ *Genres:* ${genres}
✨ *Status:* ${status}
✨ *Episodes:* ${episodes}
✨ *Duration:* ${duration} minutes per episode
✨ *Start Date:* ${startDate}
✨ *End Date:* ${endDate}

📝 *Description:* ${translatedDescription}
`.trim();

        // Use the anime cover image URL directly
        const imageUrl = anime.coverImage?.large || 'https://via.placeholder.com/500';

        // Send the message with the image URL and the caption
        await PappyBotInc.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: captionText,  // caption text with translated description (if applicable)
            mentions: [m.sender]   // Mention the sender
        });

    } catch (error) {
        console.error('API Fetch Error:', error);
        return await PappyBotInc.sendText(m.chat, "❌ An error occurred while fetching the anime details.");
    }
}
break;


case 'animeawoo': {
  await PappyStickWait();

  try {
      // Fetch Awoo image from the waifu.pics API
      waifudd = await axios.get(`https://waifu.pics/api/sfw/awoo`);

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });

  } catch (error) {
      console.error('Error fetching AnimeAwoo image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

      
case 'animemegumin': {
  await PappyStickWait();
  try {
      // Fetch Megumin image
      waifudd = await axios.get(`https://waifu.pics/api/sfw/megumin`);

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });

  } catch (error) {
      console.error('Error fetching AnimeMegumin image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animeshinobu': {
  await PappyStickWait();
  try {
      // Fetch Shinobu image
      waifudd = await axios.get(`https://waifu.pics/api/sfw/shinobu`);

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });

  } catch (error) {
      console.error('Error fetching AnimeShinobu image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animehandhold': {
  await PappyStickWait();
  try {
      // Fetch Handhold image
      waifudd = await axios.get(`https://waifu.pics/api/sfw/handhold`);

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });

  } catch (error) {
      console.error('Error fetching AnimeHandhold image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animehighfive': {
  await PappyStickWait();
  try {
      // Fetch Highfive image
      waifudd = await axios.get(`https://waifu.pics/api/sfw/highfive`);

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
          caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });

  } catch (error) {
      console.error('Error fetching AnimeHighfive image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

      
case 'animedance': {
  await PappyStickWait();
  try {
      // Fetch Dance image
      waifudd = await axios.get(`https://waifu.pics/api/sfw/dance`);

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });

  } catch (error) {
      console.error('Error fetching AnimeDance image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animehappy': {
  await PappyStickWait();
  try {
      // Fetch Happy image
      waifudd = await axios.get(`https://waifu.pics/api/sfw/happy`);

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
          caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });

  } catch (error) {
      console.error('Error fetching AnimeHappy image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animeglomp': {
  await PappyStickWait();
  try {
      // Fetch Glomp image
      waifudd = await axios.get(`https://waifu.pics/api/sfw/glomp`);

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });

  } catch (error) {
      console.error('Error fetching AnimeGlomp image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animesmug': {
  await PappyStickWait();
  try {
      // Fetch Smug image
      waifudd = await axios.get(`https://waifu.pics/api/sfw/smug`);

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
          caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });

  } catch (error) {
      console.error('Error fetching AnimeSmug image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animeblush': {
  await PappyStickWait();
  try {
      // Fetch Blush image
      waifudd = await axios.get(`https://waifu.pics/api/sfw/blush`);

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
          caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });

  } catch (error) {
      console.error('Error fetching AnimeBlush image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animewave': {
  await PappyStickWait();
  try {
      // Fetch Wave image
      waifudd = await axios.get(`https://waifu.pics/api/sfw/wave`);

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
        caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });

  } catch (error) {
      console.error('Error fetching AnimeWave image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;
      
case 'animesmile': {
  await PappyStickWait();
  try {
      // Fetch Smile image
      waifudd = await axios.get(`https://waifu.pics/api/sfw/smile`);

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });

  } catch (error) {
      console.error('Error fetching AnimeSmile image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;
      
case 'animepoke': {
  await PappyStickWait();
  try {
      // Fetch Poke image
      waifudd = await axios.get(`https://waifu.pics/api/sfw/poke`);

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
          caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });

  } catch (error) {
      console.error('Error fetching AnimePoke image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animewink': {
  await PappyStickWait();
  try {
      // Fetch Wink image
      waifudd = await axios.get(`https://waifu.pics/api/sfw/wink`);

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });

  } catch (error) {
      console.error('Error fetching AnimeWink image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animebonk': {
  await PappyStickWait();
  try {
      // Fetch Bonk image
      waifudd = await axios.get(`https://waifu.pics/api/sfw/bonk`);

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
          caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });

  } catch (error) {
      console.error('Error fetching AnimeBonk image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animebully': {
  await PappyStickWait();
  try {
      // Fetch Bully image
      waifudd = await axios.get(`https://waifu.pics/api/sfw/bully`);

      // Send the image with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
          caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });

  } catch (error) {
      console.error('Error fetching AnimeBully image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;
      
case 'animeyeet': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://waifu.pics/api/sfw/yeet`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeYeet image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animebite': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://waifu.pics/api/sfw/bite`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
          caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeBite image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animelick': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://waifu.pics/api/sfw/lick`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeLick image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animekill': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://waifu.pics/api/sfw/kill`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeKill image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animecry': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://waifu.pics/api/sfw/cry`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeCry image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;
      
case 'animewlp': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/wallpaper`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeWLP image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animekiss': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/kiss`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeKiss image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animehug': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/hug`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeHug image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animeneko': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://waifu.pics/api/sfw/neko`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeNeko image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animepat': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/pat`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimePat image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;
      
case 'animeslap': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/slap`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeSlap image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animecuddle': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/cuddle`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeCuddle image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

//ANIME GIRLS PICS        
case 'animewaifu': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/waifu`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeWaifu image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animenom': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/nom`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeNom image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animefoxgirl': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/fox_girl`);
      await PappyBotInc.sendMessage(m.chat, {
          
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeFoxGirl image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animetickle': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/tickle`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
          caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeTickle image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animegecg': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/gecg`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeGecg image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;


//-------------------------------------------------------------------------------------------------------------//

//  █▀█ ▄▀▄ █▄ █ █▀▄ █▀█ █▄ ▄█   █▀█ █▄█ █▀█ ▀█▀ █▀█ 
//  █▀▄ █▀█ █ ▀█ █▄▀ █▄█ █ ▀ █   █▀▀ █ █ █▄█  █  █▄█ 


case 'aesthetic': {
  await PappyStickWait();
  var notnot = JSON.parse(fs.readFileSync('./src/media/randompics/aesthetic.json'));
  var hasil = pickRandom(notnot);

  // Formatting the reply message with emojis
  const replyMessage = `🌟 Hi ${m.pushName} 🌟\n\n`
      + `✨ *Here is the result of: ${command}* ✨\n\n`
      + `🖼️ *Image URL:* ${hasil.url}\n`
      + `💡 *Enjoy the aesthetic!*`;

  // Sending the image and caption directly
  await PappyBotInc.sendMessage(m.chat, {
      image: { url: hasil.url },
      caption: replyMessage,
      mentions: [m.sender]
  });

}
break;



case 'coffee': case 'kopi': {
  await PappyStickWait()    
  try {
      // Get a random coffee image
      const imageUrl = 'https://coffee.alexflipnote.dev/random';
      const imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' }).then(res => Buffer.from(res.data));

      // Create the message content with emojis
      const caption = `☕ Hi ${m.pushName}!\n_*Here is the result of: ${command}*_`;

      // Send the message with the coffee image
      await PappyBotInc.sendMessage(m.chat, {
          image: imageBuffer,
          caption: caption,
          mentions: [m.sender]
      });

  } catch (e) {
      console.error('Error:', e);
      return replygcpappy('❗ *Error:* Something went wrong! ⚠️');
  }
}
break;

          case 'wallpaper': {
  if (!text) return replygcpappy('Enter Query Title');

  await PappyStickWait();
  let { wallpaper } = require('./lib/scraper');
  anuwallpep = await wallpaper(text);
  let result = anuwallpep[Math.floor(Math.random() * anuwallpep.length)];

  const reply = `Hi ${m.pushName}\n_*Here is the result of ${text}*_\n\n`
      + `🌟 *Title:* ${result.title}\n`
      + `📁 *Category:* ${result.type}\n`
      + `📄 *Detail:* ${result.source}\n`
      + `🔗 *Media URL:* ${result.image[2] || result.image[1] || result.image[0]}`;

  await PappyBotInc.sendMessage(m.chat, {
      image: { url: result.image[0] },
      caption: reply,
      mentions: [m.sender]
  });
}
break;

case 'wallpaper2': {
  if (!text) return replygcpappy('🌍 *Enter Query Title for Wallpaper Search* 🔍');

  await PappyStickWait(); // Indicate that the bot is processing the request

  try {
      // List of API URLs to choose from
      const apiUrls = [
          'https://aemt.uk.to/googleimage?query=',
          'https://meitang.xyz/googleimage?query=',
          'https://btch.us.kg/googleimage?query=',
          'https://api.tioo.eu.org/googleimage?query=',
          'https://api.tioprm.eu.org/googleimage?query='
      ];

      // Randomly select an API URL
      const apiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)] + encodeURIComponent(text);

      // Fetch the wallpaper directly from the selected API
      let response = await fetch(apiUrl);

      // Check if the response is okay
      if (!response.ok) {
          return replygcpappy('❌ *Failed to fetch the wallpaper.* Please try again. 🔄');
      }

      // Get the image URL directly from the response
      let wallpaperUrl = await response.json().then(data => data.result[0].url); // Assuming response structure includes a 'result' array

      // Send the wallpaper with a caption
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: wallpaperUrl },
          caption: `🌟 *Wallpaper Search Results* 🌟\n\n_*Here is the wallpaper for: ${text}*_ 🖼️`
      }, { quoted: m });

  } catch (e) {
      console.error(e);
      return replygcpappy("❗ *Error fetching the wallpaper.* Please try again. ⚠️");
  }
}
break;




          case 'wikimedia': {
  if (!text) return replygcpappy('Enter Query Title');

  await PappyStickWait();
  let { wikimedia } = require('./lib/scraper');
  let anumedia = await wikimedia(text);
  let result = anumedia[Math.floor(Math.random() * anumedia.length)];

  // Formatting the reply message
  const replyMessage = `Hi ${m.pushName}\n\n`
      + `🔎 *Title:* ${result.title}\n`
      + `🌐 *Source:* ${result.source}\n`
      + `📸 *Media URL:* ${result.image}`;

  // Sending the response directly with image and text
  await PappyBotInc.sendMessage(m.chat, {
      image: { url: result.image },
      caption: replyMessage,
      mentions: [m.sender]
  });

}
break;


case 'dogwoof': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/woof`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
          caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching DogWoof image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case '8ballpool': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/8ball`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
          caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching 8BallPool image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'goosebird': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/goose`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
          caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching GooseBird image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animefeed': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/feed`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
          caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeFeed image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'animeavatar': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/avatar`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
          caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching AnimeAvatar image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'lizardpic': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/lizard`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
          caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching LizardPic image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'catmeow': {
  await PappyStickWait();
  try {
      let waifudd = await axios.get(`https://nekos.life/api/v2/img/meow`);
      await PappyBotInc.sendMessage(m.chat, {
          image: { url: waifudd.data.url },
         caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
      }, { quoted: m });
  } catch (error) {
      console.error('Error fetching CatMeow image:', error);
      replygcpappy('⚠️ An error occurred while fetching the image. Please try again later.');
  }
}
break;

case 'bike':
  await PappyStickWait(); // Notify the user that the process is starting
  var notnot = JSON.parse(fs.readFileSync('./src/media/randompics/bike.json')); // Load bike image data
  var hasil = pickRandom(notnot); // Pick a random image from the JSON
  PappyBotInc.sendMessage(m.chat, { caption: mess.success, image: { url: hasil.url } }, { quoted: m }); // Send the image to the chat
  break;


  case 'car':
  await PappyStickWait(); // Notify the user that the process is starting
  var notnot = JSON.parse(fs.readFileSync('./src/media/randompics/car.json')); // Load car image data
  var hasil = pickRandom(notnot); // Pick a random image from the JSON
  PappyBotInc.sendMessage(m.chat, { caption: mess.success, image: { url: hasil.url } }, { quoted: m }); // Send the image to the chat
  break;

  case 'profilepic':
    case 'profilepicture':
      await PappyStickWait(); // Notify the user that the process is starting
      var notnot = JSON.parse(fs.readFileSync('./src/media/randompics/profile.json')); // Load profile image data
      var hasil = pickRandom(notnot); // Pick a random image from the JSON
      PappyBotInc.sendMessage(m.chat, { caption: mess.success, image: { url: hasil.url } }, { quoted: m }); // Send the image to the chat
      break;
    
case 'couplepp':
case 'ppcouple': {
  let anu = require('./src/media/randompics/ppcouple.json'); // Load couple profile pictures
  let random = anu[Math.floor(Math.random() * anu.length)]; // Pick a random couple
  PappyBotInc.sendMessage(from, {
    image: { url: random.male },
    caption: `👨‍⚖️ *Couple Profile Picture for Male* 👨‍⚖️\n💑 Here is a profile picture for the male in a couple. Use it to show your love! 💖`,
  }, { quoted: m }); // Send male profile picture

  PappyBotInc.sendMessage(from, {
    image: { url: random.female },
    caption: `👩‍⚖️ *Couple Profile Picture for Female* 👩‍⚖️\n💖 Here is a profile picture for the female in a couple. Let your love shine! ✨`,
  }, { quoted: m }); // Send female profile picture
}
break;

case 'pubg':
  await PappyStickWait(); // Notify the user that the bot is processing
  var notnot = JSON.parse(fs.readFileSync('./src/media/randompics/pubg.json')); // Load PUBG images
  var hasil = pickRandom(notnot); // Pick a random PUBG image
  PappyBotInc.sendMessage(m.chat, {
    caption: `🎮 *PUBG Image* 🚨\nHere’s a cool PUBG image for you! Ready to drop into the battlefield? 🏆💥`,
    image: { url: hasil.url },
  }, { quoted: m }); // Send the PUBG image to the chat
break;

case 'blackpink':
  await PappyStickWait(); // Notify the user that the bot is processing
  var notnot = JSON.parse(fs.readFileSync('./src/media/randompics/blackpink.json')); // Load Blackpink images
  var hasil = pickRandom(notnot); // Pick a random Blackpink image
  PappyBotInc.sendMessage(m.chat, {
    caption: `💖 *Blackpink Image* 💥\nHere's a fabulous Blackpink moment! 🎶💃🕺\nEnjoy the K-pop vibes! 😍🔥`,
    image: { url: hasil.url },
  }, { quoted: m }); // Send the Blackpink image to the chat
break;

case 'chinese': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/china.json'));
      var hasil = pickRandom(notnot);

      // Prepare and send the image with caption
      const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🎉 Enjoy the Chinese TikTok pic! 🇨🇳`;

      await PappyBotInc.sendMessage(m.chat, {
          image: { url: hasil.url },  // Send image instead of video
          caption: caption,
      }, { quoted: m });

  } catch (error) {
      console.error('Error in chinese command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
  }
}
break;

case 'hijab': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/hijab.json'));
      var hasil = pickRandom(notnot);

      // Prepare and send the image with caption
      const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n💖 Enjoy the beautiful hijab TikTok pic! 🧕`;

      await PappyBotInc.sendMessage(m.chat, {
          image: { url: hasil.url },  // Send image instead of video
          caption: caption,
      }, { quoted: m });

  } catch (error) {
      console.error('Error in hijab command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
  }
}
break;

case 'japanese': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/japan.json'));
      var hasil = pickRandom(notnot);

      // Prepare and send the image with caption
      const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🎏 Enjoy the Japanese TikTok pic! 🇯🇵`;

      await PappyBotInc.sendMessage(m.chat, {
          image: { url: hasil.url },  // Send image instead of video
          caption: caption,
      }, { quoted: m });

  } catch (error) {
      console.error('Error in japanese command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
  }
}
break;

case 'korean': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/korea.json'));
      var hasil = pickRandom(notnot);

      // Prepare and send the image with caption
      const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🇰🇷 Enjoy the Korean TikTok pic! 🎶`;

      await PappyBotInc.sendMessage(m.chat, {
          image: { url: hasil.url },  // Send image instead of video
          caption: caption,
      }, { quoted: m });

  } catch (error) {
      console.error('Error in korean command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
  }
}
break;

case 'malay': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/malaysia.json'));
      var hasil = pickRandom(notnot);

      // Prepare and send the image with caption
      const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🇲🇾 Enjoy the Malay TikTok pic! 🌸`;

      await PappyBotInc.sendMessage(m.chat, {
          image: { url: hasil.url },  // Send image instead of video
          caption: caption,
      }, { quoted: m });

  } catch (error) {
      console.error('Error in malay command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
  }
}
break;

case 'randomgirl': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/random.json'));
      var hasil = pickRandom(notnot);

      // Prepare and send the image with caption
      const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🌟 Enjoy this random TikTok girl pic! 💖`;

      await PappyBotInc.sendMessage(m.chat, {
          image: { url: hasil.url },  // Send image instead of video
          caption: caption,
      }, { quoted: m });

  } catch (error) {
      console.error('Error in randomgirl command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
  }
}
break;

case 'randomboy': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/random2.json'));
      var hasil = pickRandom(notnot);

      // Prepare and send the image with caption
      const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🌟 Enjoy this random TikTok boy pic! 💙`;

      await PappyBotInc.sendMessage(m.chat, {
          image: { url: hasil.url },  // Send image instead of video
          caption: caption,
      }, { quoted: m });

  } catch (error) {
      console.error('Error in randomboy command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
  }
}
break;

case 'thai': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/thailand.json'));
      var hasil = pickRandom(notnot);

      // Prepare and send the image with caption
      const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🇹🇭 Enjoy the Thai TikTok pic! 🍀`;

      await PappyBotInc.sendMessage(m.chat, {
          image: { url: hasil.url },  // Send image instead of video
          caption: caption,
      }, { quoted: m });

  } catch (error) {
      console.error('Error in thai command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
  }
}
break;

case 'vietnamese': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/vietnam.json'));
      var hasil = pickRandom(notnot);

      // Prepare and send the image with caption
      const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🇻🇳 Enjoy the Vietnamese TikTok pic! 🎋`;

      await PappyBotInc.sendMessage(m.chat, {
          image: { url: hasil.url },  // Send image instead of video
          caption: caption,
      }, { quoted: m });

  } catch (error) {
      console.error('Error in vietnamese command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
  }
}
break;

case 'indo': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/indonesia.json'));
      var hasil = pickRandom(notnot);

      // Prepare and send the image with caption
      const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🇮🇩 Enjoy the Indonesian TikTok pic! 🌸`;

      await PappyBotInc.sendMessage(m.chat, {
          image: { url: hasil.url },  // Send image instead of video
          caption: caption,
      }, { quoted: m });

  } catch (error) {
      console.error('Error in indo command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
  }
}
break;
  

//-------------------------------------------------------------------------------------------------------------//



//  █▀█ ▄▀▄ █▄ █ █▀▄ █▀█ █▄ ▄█   █ █ ▀█▀ █▀▄ █▀▀ █▀█ 
//  █▀▄ █▀█ █ ▀█ █▄▀ █▄█ █ ▀ █   ▀▄▀ ▄█▄ █▄▀ ██▄ █▄█ 



case 'tiktokgirl': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      // Load the list of TikTok videos from the JSON file
      var asupan = JSON.parse(fs.readFileSync('./src/media/tiktokvids/tiktokgirl.json'));
      
      // Select a random TikTok video from the list
      var hasil = pickRandom(asupan);

      // Send the video directly with a caption
      const caption = `👋 Hi ${m.pushName}\n_*Here is the result of: ${command}*_ 🎉`;


      await PappyBotInc.sendMessage(m.chat, {
          video: { url: hasil.url },
          caption: caption,
          mimetype: 'video/mp4', // Specify the MIME type
      }, { quoted: m });

  } catch (error) {
      // Handle errors gracefully and send a message to the user
      console.error('Error in tiktokgirl command:', error.message);  // Log specific error message
      replygcpappy('⚠️ An error occurred while fetching the TikTok video. Please try again later.');
  }
}
break;

case 'tiktokghea': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var gheayubi = JSON.parse(fs.readFileSync('./src/media/tiktokvids/gheayubi.json'));
      var hasil = pickRandom(gheayubi);

      // Prepare and send the video with caption
      const caption = `👋 Hi ${m.pushName}\n_*Here is the result of: ${command}*_ 🎉`;


      await PappyBotInc.sendMessage(m.chat, {
          video: { url: hasil.url },
          caption: caption,
          mimetype: 'video/mp4', // Specify the MIME type
      }, { quoted: m });

  } catch (error) {
      console.error('Error in tiktokghea command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok video. Please try again later.');
  }
}
break;

case 'tiktokbocil': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var bocil = JSON.parse(fs.readFileSync('./src/media/tiktokvids/bocil.json'));
      var hasil = pickRandom(bocil);

      // Prepare and send the video with caption
      const caption = `👋 Hi ${m.pushName}\n_*Here is the result of: ${command}*_ 🎉`;


      await PappyBotInc.sendMessage(m.chat, {
          video: { url: hasil.url },
          caption: caption,
          mimetype: 'video/mp4', // Specify the MIME type
      }, { quoted: m });

  } catch (error) {
      console.error('Error in tiktokbocil command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok video. Please try again later.');
  }
}
break;

case 'tiktoknukhty': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var ukhty = JSON.parse(fs.readFileSync('./src/media/tiktokvids/ukhty.json'));
      var hasil = pickRandom(ukhty);

      // Prepare and send the video with caption
      const caption = `👋 Hi ${m.pushName}\n_*Here is the result of: ${command}*_ 🎉`;


      await PappyBotInc.sendMessage(m.chat, {
          video: { url: hasil.url },
          caption: caption,
          mimetype: 'video/mp4', // Specify the MIME type
      }, { quoted: m });

  } catch (error) {
      console.error('Error in tiktoknukhty command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok video. Please try again later.');
  }
}
break;

case 'tiktoksantuy': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var santuy = JSON.parse(fs.readFileSync('./src/media/tiktokvids/santuy.json'));
      var hasil = pickRandom(santuy);

      // Prepare and send the video with caption
      const caption = `👋 Hi ${m.pushName}\n_*Here is the result of: ${command}*_ 🎉`;


      await PappyBotInc.sendMessage(m.chat, {
          video: { url: hasil.url },
          caption: caption,
          mimetype: 'video/mp4', // Specify the MIME type
      }, { quoted: m });

  } catch (error) {
      console.error('Error in tiktoksantuy command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok video. Please try again later.');
  }
}
break;

case 'tiktokkayes': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var kayes = JSON.parse(fs.readFileSync('./src/media/tiktokvids/kayes.json'));
      var hasil = pickRandom(kayes);

      // Prepare and send the video with caption
      const caption = `👋 Hi ${m.pushName}\n_*Here is the result of: ${command}*_ 🎉`;


      await PappyBotInc.sendMessage(m.chat, {
          video: { url: hasil.url },
          caption: caption,
          mimetype: 'video/mp4', // Specify the MIME type
      }, { quoted: m });

  } catch (error) {
      console.error('Error in tiktokkayes command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok video. Please try again later.');
  }
}
break;

case 'tiktokpanrika': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var rikagusriani = JSON.parse(fs.readFileSync('./src/media/tiktokvids/panrika.json'));
      var hasil = pickRandom(rikagusriani);

      // Prepare and send the video with caption
      const caption = `👋 Hi ${m.pushName}\n_*Here is the result of: ${command}*_ 🎉`;


      await PappyBotInc.sendMessage(m.chat, {
          video: { url: hasil.url },
          caption: caption,
          mimetype: 'video/mp4', // Specify the MIME type
      }, { quoted: m });

  } catch (error) {
      console.error('Error in tiktokpanrika command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok video. Please try again later.');
  }
}
break;

case 'tiktoknotnot': {
  await PappyStickWait();  // Indicate that the bot is processing the request

  try {
      var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokvids/notnot.json'));
      var hasil = pickRandom(notnot);

      // Prepare and send the video with caption
      const caption = `👋 Hi ${m.pushName}\n_*Here is the result of: ${command}*_ 🎉`;


      await PappyBotInc.sendMessage(m.chat, {
          video: { url: hasil.url },
          caption: caption,
          mimetype: 'video/mp4', // Specify the MIME type
      }, { quoted: m });

  } catch (error) {
      console.error('Error in tiktoknotnot command:', error.message);
      replygcpappy('⚠️ An error occurred while fetching the TikTok video. Please try again later.');
  }
}
break;








//-------------------------------------------------------------------------------------------------------------//


//█▀▀ ▀█▀ ▀█▀ █▀▀ █▄▀ █▀▀ █▀█   █▀▀ █▀█ █▄ ▄█ █▄ ▄█ ▄▀▄ █▄ █ █▀▄ █▀▀ 
//▄██  █  ▄█▄ █▄▄ █ █ ██▄ █▀▄   █▄▄ █▄█ █ ▀ █ █ ▀ █ █▀█ █ ▀█ █▄▀ ▄██ 




case 'woof':
case '8ball':
case 'goose':
case 'gecg':
case 'feed':
case 'avatar':
case 'fox_girl':
case 'lizard':
case 'meow':{
                axios.get(`https://nekos.life/api/v2/img/${command}`)
.then(({data}) => {
PappyBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break

case 'telestick': {
	if (m.isGroup) return PappyStickPrivate()
		if (args[0] && args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) {
		let pappyresources = await Telesticker(args[0])
		await replygcpappy(`Sending ${pappyresources.length} stickers...`)
		if (m.isGroup && pappyresources.length > 30) {
			await replygcpappy('Number of stickers more than 30, bot will send it in private chat.')
			for (let i = 0; i < pappyresources.length; i++) {
				PappyBotInc.sendMessage(m.sender, { sticker: { url: pappyresources[i].url }})
			}
		} else {
			for (let i = 0; i < pappyresources.length; i++) {
				PappyBotInc.sendMessage(m.chat, { sticker: { url: pappyresources[i].url }})
			}
		}
	} else replygcpappy(`Where is the telegram sticker link?\nExample. ${prefix + command} https://t.me/addstickers/FriendlyDeath`)
}
break
        
case 'gura':
  case 'gurastick':{
  var ano = await fetchJson('https://raw.githubusercontent.com/Pappy/XeonMedia/main/gura')
  var wifegerak = ano.split('\n')
  var wifegerakx = wifegerak[Math.floor(Math.random() * wifegerak.length)]
  encmedia = await PappyBotInc.sendImageAsSticker(m.chat, wifegerakx, m, { packname: global.packname, author: global.author, })
  
  }
  break
  




//-------------------------------------------------------------------------------------------------------------//




//█▀▀ ▀█▀ █▀█ █▀█ █▀▀   █▀▀ █▀█ █▄ ▄█ █▄ ▄█ ▄▀▄ █▄ █ █▀▄ █▀▀ 
//▄██  █  █▄█ █▀▄ ██▄   █▄▄ █▄█ █ ▀ █ █ ▀ █ █▀█ █ ▀█ █▄▀ ▄██ 




case 'store':
case 'shop': 
case 'list': {
let teks = '┌──⭓「 *LIST STORE* 」\n│\n'
for (let x of db_respon_list) {
teks += `│⭔ ${x.key}\n`
}
teks += `│\n└────────────⭓\n\n`
replygcpappy(teks)
}
break


case 'addlist':
if (!PappyTheCreator) return PappyStickOwner()
if (!m.isGroup) return PappyStickGroup()
var args1 = text.split("@")[0]
var args2 = text.split("@")[1]
if (!q.includes("@")) return replygcpappy(`Usage Example: ${prefix+command} *Item Name@Item*\n\n_Example_\n\n${prefix+command} namelist@List`)
if (isAlreadyResponList(m.chat, args1, db_respon_list)) return replygcpappy(`List of responses with key : *${args1}* already in this group.`)
if (/image/.test(mime)) {
media = await PappyBotInc.downloadAndSaveMediaMessage(quoted)
mem = await TelegraPh(media)
addResponList(m.chat, args1, args2, true, `${mem}`, db_respon_list)
replygcpappy(`Successfully set list message with key : *${args1}*`)
if (fs.existsSync(media)) fs.unlinkSync(media)
} else {
addResponList(m.chat, args1, args2, false, '-', db_respon_list)
replygcpappy(`Successful Add List With Key : *${args1}*`)
}
break

      
case 'dellist':
if (!PappyTheCreator) return PappyStickOwner()
if (!m.isGroup) return PappyStickGroup()
if (db_respon_list.length === 0) return replygcpappy(`There is no message list in the database yet`)
if (!q) return replygcpappy(`Usage Example: ${prefix + command} *Item name*\n\n_Example_\n\n${prefix + command} listname`)
if (!isAlreadyResponList(m.chat, q, db_respon_list)) return replygcpappy(`Item list by Name *${q}* not in the database!`)
delResponList(m.chat, q, db_respon_list)
replygcpappy(`Successfully delete list message with key *${q}*`)
break








//-------------------------------------------------------------------------------------------------------------//



//█▀▀ ▀█▀ ▄▀▄ █   █▄▀ █▀▀ █▀█   █▀▀ █▀█ █▄ ▄█ █▄ ▄█ ▄▀▄ █▄ █ █▀▄ █▀▀ 
//▄██  █  █▀█ █▄▄ █ █ ██▄ █▀▄   █▄▄ █▄█ █ ▀ █ █ ▀ █ █▀█ █ ▀█ █▄▀ ▄██ 




case 'ghstalk': case 'githubstalk': {
  if (!q) return replygcpappy(`*Example:* ${prefix + command} DGPappy`);

  await PappyStickWait();
  let githubstalk = require('./lib/scraper');
  let aj = await githubstalk.githubstalk(`${q}`);

  // Create a formatted message with emojis and styling
  let caption = `🌐 *Github Stalker* 🌐\n\n` +
                `👤 *Username:* ${aj.username}\n` +
                `🆔 *Nickname:* ${aj.nickname}\n` +
                `📝 *Bio:* ${aj.bio}\n` +
                `🔍 *Id:* ${aj.id}\n` +
                `🔗 *NodeId:* ${aj.nodeId}\n` +
                `📸 *Profile Picture:* ${aj.profile_pic}\n` +
                `🌍 *Url Github:* ${aj.url}\n` +
                `🏷️ *Type:* ${aj.type}\n` +
                `👥 *Admin:* ${aj.admin}\n` +
                `🏢 *Company:* ${aj.company}\n` +
                `📝 *Blog:* ${aj.blog}\n` +
                `📍 *Location:* ${aj.location}\n` +
                `✉️ *Email:* ${aj.email}\n` +
                `📦 *Public Repos:* ${aj.public_repo}\n` +
                `📜 *Public Gists:* ${aj.public_gists}\n` +
                `👥 *Followers:* ${aj.followers}\n` +
                `👣 *Following:* ${aj.following}\n` +
                `📅 *Created At:* ${aj.created_at}\n` +
                `🔄 *Updated At:* ${aj.updated_at}`;

  // Send the message with the user's profile picture
  PappyBotInc.sendMessage(m.chat, { 
      image: { url: aj.profile_pic }, 
      caption: caption 
  }, { quoted: m });
}
break;
              
case 'npmstalk': {
  if (!q) return replygcpappy(`*Example:* ${prefix + command} pappyapi`);

  await PappyStickWait();
  let npmstalk = require('./lib/scraper');
  let eha = await npmstalk.npmstalk(q);
  
  // Create a formatted message for npm stalk
  let npmCaption = `📦 *NPM Stalker* 📦\n\n` +
                   `🌟 *Name:* ${eha.name}\n` +
                   `🔄 *Version Latest:* ${eha.versionLatest}\n` +
                   `🛠️ *Version Publish:* ${eha.versionPublish}\n` +
                   `🔧 *Version Update:* ${eha.versionUpdate}\n` +
                   `📈 *Latest Dependencies:* ${eha.latestDependencies}\n` +
                   `📅 *Publish Dependencies:* ${eha.publishDependencies}\n` +
                   `🕒 *Publish Time:* ${eha.publishTime}\n` +
                   `📆 *Latest Publish Time:* ${eha.latestPublishTime}`;
  
  replygcpappy(npmCaption);
}
break;

case 'ffstalk': {
  if (!q) return replygcpappy(`*Example:* ${prefix + command} 946716486`);

  await PappyStickWait();
  let ffstalk = require('./lib/scraper');
  let eeh = await ffstalk.ffstalk(`${q}`);
  
  // Create a formatted message for Free Fire stalk
  let ffCaption = `🔥 *Free Fire Stalker* 🔥\n\n` +
                  `🆔 *ID:* ${eeh.id}\n` +
                  `👤 *Nickname:* ${eeh.nickname}`;
  
  replygcpappy(ffCaption);
}
break;

case 'mlstalk': {
  if (!q) return replygcpappy(`*Example:* ${prefix + command} 530793138|8129`);

  await PappyStickWait();
  let mlstalk = require('./lib/scraper');
  let dat = await mlstalk.mlstalk(q.split("|")[0], q.split("|")[1]);
  
  // Create a formatted message for Mobile Legend stalk
  let mlCaption = `📱 *Mobile Legend Stalker* 📱\n\n` +
                  `👤 *Username:* ${dat.userName}\n` +
                  `🆔 *ID:* ${q.split("|")[0]}\n` +
                  `🌍 *ID Zone:* ${q.split("|")[1]}`;
  
  replygcpappy(mlCaption);
}
break;
              
case 'tiktokstalk': {
if (!text) return replygcpappy(`Please provide a TikTok username.`);

const username = text;
const apiUrl = `${global.api}stalking/tiktok-user2?apikey=${global.id}&user=${username}`;

try {
  // Fetch TikTok user data
  let res = await fetchJson(apiUrl);
  
  if (!res.status) {
    await PappyBotInc.sendMessage(m.chat, { text: '❌ Unable to fetch data. Please try again later.' }, { quoted: m });
    return;
  }

  const user = res.result;
  let txt = `
┌──「 *TIKTOK STALK* 」
▢ *🔖 Name:* ${user.nickname}
▢ *🔖 Username:* ${user.username}
▢ *👥 Followers:* ${user.followerCount}
▢ *🫂 Following:* ${user.followingCount}
▢ *💖 Hearts:* ${user.heartCount}
▢ *📌 Description:* ${user.signature || 'No description available.'}
▢ *🔗 Link:* https://tiktok.com/${user.username}
└────────────`;

  // Send the message with user profile image
  await PappyBotInc.sendMessage(m.chat, { image: { url: user.avatarLarger }, caption: txt }, { quoted: m });

} catch (error) {
  console.error('Error fetching TikTok user data:', error.message);
  await PappyBotInc.sendMessage(m.chat, { text: '❌ An error occurred while processing the request. Please try again later.' }, { quoted: m });
}
}
break;

case 'telestalk': {
if (!text) return replygcpappy(`*Where is the Telegram Username?*\n_Example:_\n${prefix}${command} pappy`);

try {
  // Fetch Telegram user data using the provided API
  const apiUrl = `${global.api}stalking/telegram-user?apikey=${global.id}&user=${encodeURIComponent(text)}`;
  let api = await fetchJson(apiUrl);

  // Log the API response for debugging
  console.log('Telegram API Response:', api);

  if (!api || api.status !== 200 || !api.result) {
    console.error('API response is invalid or no results found:', api);
    await PappyBotInc.sendMessage(m.chat, '❌ No results found on Telegram. Please try again with a different username.', { quoted: m });
    return;
  }

  // Prepare the response message with user information
  const userInfo = `*📱 T E L E G R A M - U S E R 📱*\n\n` +
                   `• 👤 *Name*: ${api.result.name}\n` +
                   `• 🆔 *Username*: ${api.result.username}\n` +
                   `• 📜 *Bio*: ${api.result.bio}\n` +
                   `• 🔗 *Profile Photo*: ${api.result.photo}`;

  // Send the user info to the user
  await PappyBotInc.sendMessage(m.chat, { text: userInfo }, { quoted: m });

  // Send the Telegram user's profile photo
  await PappyBotInc.sendMessage(m.chat, {
    image: { url: api.result.photo },
    caption: `*Profile Photo of ${api.result.name}*`
  }, { quoted: m });

} catch (error) {
  console.error('Error fetching Telegram data:', error.message);
  await PappyBotInc.sendMessage(m.chat, { text: '❌ An error occurred while fetching the Telegram data. Please try again later.' }, { quoted: m });
}
}
break;


case 'wachannelstalk': {
if (!text) return replygcpappy(`*Where is the WhatsApp Channel URL?*\n_Example:_\n${prefix}${command} https://whatsapp.com/channel/0029VaGvk6XId7nHNGfiRs0m`);

try {
  // Fetch WhatsApp channel data using the provided API
  const apiUrl = `${global.api}stalking/whatsapp-channel?apikey=${global.id}&url=${encodeURIComponent(text)}`;
  let api = await fetchJson(apiUrl);

  // Log the API response for debugging
  console.log('WhatsApp Channel API Response:', api);

  if (!api || api.status !== 200 || !api.result) {
    console.error('API response is invalid or no results found:', api);
    await PappyBotInc.sendMessage(m.chat, '❌ No results found on WhatsApp Channel. Please try again with a different URL.', { quoted: m });
    return;
  }

  // Prepare the response message with channel information
  const channelInfo = `*🌐 W H A T S A P P - C H A N N E L 🌐*\n\n` +
                      `• 🏷️ *Title*: ${api.result.title}\n` +
                      `• 📜 *Description*: ${api.result.description}\n` +
                      `• 👥 *Followers*: ${api.result.followers}\n` +
                      `• 🔗 *Channel Link*: ${text}`;

  // Send the channel info to the user
  await PappyBotInc.sendMessage(m.chat, { text: channelInfo }, { quoted: m });

  // Send the WhatsApp channel's image
  await PappyBotInc.sendMessage(m.chat, {
    image: { url: api.result.img },
    caption: `*Channel Image for ${api.result.title}*`
  }, { quoted: m });

} catch (error) {
  console.error('Error fetching WhatsApp channel data:', error.message);
  await PappyBotInc.sendMessage(m.chat, { text: '❌ An error occurred while fetching the WhatsApp channel data. Please try again later.' }, { quoted: m });
}
}
break;








//-------------------------------------------------------------------------------------------------------------//




//▀█▀ █▀█ █▀█ █     █▀▀ █▀█ █▄ ▄█ █▄ ▄█ ▄▀▄ █▄ █ █▀▄ █▀▀ 
// █  █▄█ █▄█ █▄▄   █▄▄ █▄█ █ ▀ █ █ ▀ █ █▀█ █ ▀█ █▄▀ ▄██ 


case 'rentbot':
    // Image URL to use (this can be customized)
    const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png'; // Replace with your desired image URL

    // Message text with emojis
    const messageText = `Type ${prefix}owner and chat him 💬👑`;

    // Send the message with the image and the text
    await PappyBotInc.sendMessage(m.chat, {
        image: { url: imageUrl }, // Directly use the URL for the image
        caption: messageText, // The custom message with emojis
    });
    break;

        
        

        
case 'repo': case 'repository': {
  try {
    const [, username, repoName] = botscript.match(/github\.com\/([^/]+)\/([^/]+)/)
    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`)
    if (response.status === 200) {
      const repoData = response.data
      const formattedInfo = `
✨ *Repository Name:* _${repoData.name}_
📄 *Description:* _${repoData.description || 'No description provided.'}_
👤 *Owner:* _${repoData.owner.login}_
⭐ *Stars:* _${repoData.stargazers_count}_
🍴 *Forks:* _${repoData.forks_count}_
🔗 *URL:* ${repoData.html_url}
      `.trim()
      await PappyBotInc.relayMessage(m.chat, {
        requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: 69000,
          requestFrom: m.sender,
          noteMessage: {
            extendedTextMessage: {
              text: formattedInfo,
              contextInfo: {
                externalAdReply: {
                  showAdAttribution: true
                }
              }
            }
          }
        }
      }, { quoted: m })
    } else {
      await replygcpappy(`Unable to fetch repository information`)
    }
  } catch (error) {
    console.error(error)
    await replygcpappy(`Repository currently not available`)
  }
}
break

			
            case 'myip':
            case 'ipbot':
                if (!PappyTheCreator) return PappyStickOwner()
                var http = require('http')
                http.get({
                    'host': 'api.ipify.org',
                    'port': 80,
                    'path': '/'
                }, function(resp) {
                    resp.on('data', function(ip) {
                        replygcpappy("🔎 My public IP address is: " + ip);
                    })
                })
            break
        
           
    case 'request': case 'reportbug': {
    if (!text) return replygcpappy(`Example : ${prefix + command} hi dev play command is not working 🐞`);

    const textt = `*| REQUEST/BUG |* 📝`;
    const teks1 = `\n\n*User* : @${m.sender.split("@")[0]} 👤\n*Request/Bug* : ${text} 🛠️`;
    const teks2 = `\n\n*Hii ${m.pushName},* Your request has been forwarded to my Owners 👑.\n*Please wait...* ⏳`;

    // Send to all owners
    for (let i of owner) {
        PappyBotInc.sendMessage(i + "@s.whatsapp.net", {
            text: textt + teks1,
            mentions: [m.sender],
        }, {
            quoted: m,
        });
    }

    // Send response to the user
    PappyBotInc.sendMessage(m.chat, {
        text: textt + teks2 + teks1,
        mentions: [m.sender],
    }, {
        quoted: m,
    });
}
break;
    
case 'socialmedia': 
case 'sosmed': 
case 'update': {
    const slides = [
        [
            'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png', // Image URL
            '', // Title
            `🎥 *Subscribe to the Developer's YouTube Channel for Updates*`, // Body message
            botname, // Footer message
            '🔗 Visit', // Button display text
            'https://t.me/pappylung', // Command (URL in this case)
            'cta_url', // Button type
            'https://t.me/pappylung' // URL (used in image generation)
        ], 
        [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1024px-Telegram_2019_Logo.svg.png', // Image URL
            '', // Title
            `📱 *Join the Developer's Telegram Channel for Updates*`, // Body message
            botname, // Footer message
            '🔗 Visit', // Button display text
            'https://t.me/pappylung', // Command (URL in this case)
            'cta_url', // Button type
            'https://t.me/pappylung' // URL (used in image generation)
        ], 
        [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/360px-GitHub_Invertocat_Logo.svg.png', // Image URL
            '', // Title
            `🐱 *Follow the Developer on GitHub*`, // Body message
            botname, // Footer message
            '🔗 Visit', // Button display text
            'https://github.com/pappy999666-dotcom', // Command (URL in this case)
            'cta_url', // Button type
            'https://github.com/pappy999666-dotcom' // URL (used in image generation)
        ], 
        [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/264px-Instagram_logo_2016.svg.png', // Image URL
            '', // Title
            `📸 *Follow the Developer on Instagram*`, // Body message
            botname, // Footer message
            '🔗 Visit', // Button display text
            'https://t.me/pappylung', // Command (URL in this case)
            'cta_url', // Button type
            'https://t.me/pappylung' // URL (used in image generation)
        ], 
        [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png', // Image URL
            '', // Title
            `💬 *Contact the Developer on WhatsApp*`, // Body message
            botname, // Footer message
            '🔗 Visit', // Button display text
            'https://t.me/pappylung', // Command (URL in this case)
            'cta_url', // Button type
            'https://t.me/pappylung' // URL (used in image generation)
        ], 
    ];

    const sendSlide = async (jid, title, message, footer, slides) => {
        const cards = slides.map(async slide => {
            const [
                image,
                titMess,
                boMessage,
                fooMess,
                textCommand,
                command,
                buttonType,
                url,
            ] = slide;
            let buttonParamsJson = {};
            
            
            switch (buttonType) {
    //button messages of slides            
    // Case for a URL button - triggers a URL when clicked
    case "cta_url":
        buttonParamsJson = {
            display_text: textCommand,  // The text displayed on the button
            url: url,                   // The URL to open when clicked
            merchant_url: url,          // The merchant URL (used in commerce contexts)
        };
        break;

    // Case for a call button - triggers a call when clicked
    case "cta_call":
        buttonParamsJson = { 
            display_text: textCommand,  // The text displayed on the button
            id: command,                // The identifier for the call action
        };
        break;

    // Case for a copy button - copies text to the clipboard when clicked
    case "cta_copy":
        buttonParamsJson = {
            display_text: textCommand,  // The text displayed on the button
            id: "",                     // ID is not needed for a copy button
            copy_code: command,         // The text to be copied to the clipboard
        };
        break;

    // Cases for reminder-related buttons or address message buttons
    case "cta_reminder":
    case "cta_cancel_reminder":
    case "address_message":
        buttonParamsJson = {
            display_text: textCommand,  // The text displayed on the button
            id: command,                // The ID or action associated with the reminder/address
        };
        break;

    // Case for a location-sharing button - allows the user to share their location
    case "send_location":
        buttonParamsJson = {};  // No extra parameters are needed for location sharing
        break;

    // Case for a quick reply button - triggers a quick response when clicked
    case "quick_reply":
        buttonParamsJson = {
            display_text: textCommand,  // The text displayed on the button
            id: command,                // The ID of the quick reply action
        };
        break;

    // Default case - no action, can be used for unknown button types    
                default:
                    break;
            }
            const buttonParamsJsonString = JSON.stringify(buttonParamsJson);
            return {
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: boMessage,
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: fooMess,
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: titMess,
                    hasMediaAttachment: true,
                    ...(await prepareWAMessageMedia(
                        { image: { url: image } },
                        { upload: PappyBotInc.waUploadToServer },
                    )),
                }),
                nativeFlowMessage:
                    proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                        buttons: [
                            {
                                name: buttonType,
                                buttonParamsJson: buttonParamsJsonString,
                            },
                        ],
                    }),
            };
        });
        
        const msg = generateWAMessageFromContent(
            jid,
            {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2,
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                            body: proto.Message.InteractiveMessage.Body.fromObject({
                                text: message,
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                                text: footer,
                            }),
                            header: proto.Message.InteractiveMessage.Header.fromObject({
                                title: title,
                                subtitle: title,
                                hasMediaAttachment: false,
                            }),
                            carouselMessage:
                                proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                    cards: await Promise.all(cards),
                                }),
                            contextInfo: {
                                mentionedJid: [m.sender], 
                                forwardingScore: 999,
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363232303807350@newsletter' /* update to new channel JID when known */,
                                    newsletterName: 'Pappy Bot V2',
                                    serverMessageId: 143
                                }
                            }
                        }),
                    },
                },
            },
            { quoted: m},
        );
        await PappyBotInc.relayMessage(jid, msg.message, {
            messageId: msg.key.id,
        });
    };

    // Send the slide to the group or user
    await sendSlide(m.chat, 'Social Media Links', 'Check out the Developer’s social media for updates!', botname, slides);

    // Send the social media links in a formatted way
    await replygcpappy(`
Here are the Developer's Social Media Links for Updates:

🎥 *Subscribe to the Developer's YouTube Channel for Updates*  
🔗 Visit: https://t.me/pappylung

📱 *Join the Developer's Telegram Channel for Updates*  
🔗 Visit: https://t.me/pappylung

🐱 *Follow the Developer on GitHub*  
🔗 Visit: https://github.com/pappy999666-dotcom

📸 *Follow the Developer on Instagram*  
🔗 Visit: https://t.me/pappylung

💬 *Contact the Developer on WhatsApp*  
🔗 Visit: https://t.me/pappylung

For more updates, check out the links above!
`);

    // Send a regular reply to confirm the action
    await replygcpappy('Here are the social media links and updates for the Developer! 🌐✨');
}
break;



  
          
case 'truecaller': {
  let phoneNumber = '';

  // Determine the phone number from text, quoted message, or mentioned user
  if (text) {
    phoneNumber = text.replace(/[^0-9]/g, '');
  } else if (m.quoted) {
    phoneNumber = m.quoted.sender.replace(/[^0-9]/g, '');
  } else if (m.mentionedJid && m.mentionedJid[0]) {
    phoneNumber = m.mentionedJid[0].replace(/[^0-9]/g, '');
  } else {
    return await PappyBotInc.sendText(m.chat, "Please provide a number in international format without +, quote a user, or mention a user.");
  }

  try {
    const installationId = 'a1i0Z--jzbJC6kx-2_s3OMNW2X7O2Qe3ca-XwmHexijCBA6MNKAO2ciUw756zhWj';
    const apiUrl = `https://truecaller-api.vercel.app/search?phone=${encodeURIComponent(phoneNumber)}&id=${installationId}`;

    let response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    let json = await response.json();
    json.creator = 'PAPPY'; // Change creator to Pappy

    let details = '';
    for (let prop in json) {
      if (prop === 'flagURL') continue;

      if (prop === 'addresses') {
        details += `⚝ *${prop}:*\n`;
        for (let addressProp in json[prop][0]) {
          details += `  ⚝ *${addressProp}:* ${json[prop][0][addressProp]}\n`;
        }
      } else if (prop === 'countryDetails') {
        details += `⚝ *${prop}:*\n`;
        for (let countryProp in json[prop]) {
          if (Array.isArray(json[prop][countryProp])) {
            details += `  ⚝ *${countryProp}:* ${json[prop][countryProp].join(', ')}\n`;
          } else {
            details += `  ⚝ *${countryProp}:* ${json[prop][countryProp]}\n`;
          }
        }
      } else {
        if (prop !== 'flagURL') {
          details += `⚝ *${prop}:* ${json[prop]}\n`;
        }
      }
    }

    // Send the details message with an image link
    const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

    await PappyBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: details,
      mentions: [m.sender]
    });

  } catch (error) {
    console.error('API Fetch Error:', error);
    return await PappyBotInc.sendText(m.chat, "An error occurred while fetching the phone details. Please try again.");
  }
}
break;


case 'matches':
case 'match':
case 'cricket':
  {
    let res = await fetchJson(`https://api-smd.onrender.com/api/match`);
    const matches = res.results;
    console.log(matches);

    let outputMessage = ""; // Initialize the output message
    matches.forEach((match) => {
      // Change 'matches' to 'match'
      outputMessage += `🏏 *Match*: ${match.title}\n`;
      outputMessage += `🔗 *Link*: ${match.link}\n\n`;
    });

    replygcpappy(
      `${outputMessage}\n\nType *${prefix}score cricbuzz link* to get detailed result...`
    );
  }
  break;

// Scores Command
case 'scores':
case 'score':
  {
    if (!args[0]) {
      return replygcPappy(
        `⚠️ *Cricbuzz match Link is required*. Type *${prefix}matches* to get links...`
      );
    }

    let res = await fetchJson(
      `https://api-smd.onrender.com/api/score?url=${args[0]}`
    );
    if (res.error) {
      return replygcPappy("❌ *No Data Found or Invalid URL...*");
    }

    let txt = `🏏 *Match Summary:*\n\n*${res.results.names}*\n\n`;
    txt += `📝 *Details:*\n`;
    res.results.details.forEach(detail => {
      txt += `📌 ${detail}\n`;
    });
    txt += `\n*Summary*: ${res.results.preview}`;

    replygcpappy(txt);
  }
  break;



    case 'sc': case 'script': case 'donate': case 'cekupdate': case 'updatebot': case 'cekbot': case 'sourcecode': {
    let me = m.sender;
    let teks = `✨ *${global.botname} Script* ✨\n\n` +
               `📺 *YouTube:* ${global.websitex}\n` +
               `🐙 *GitHub:* ${global.botscript}\n\n` +
               `👋 *Hi* @${me.split('@')[0]}! \n` +
               `💖 _Don't forget to donate to support us!_ 🍜👇\n` +
               `https://i.ibb.co/SBXWb1R/donate.jpg`;

    sendPappyBotIncMessage(m.chat, { 
        text: teks,
        mentions: [me],
        contextInfo: {
            forwardingScore: 9999999,
            isForwarded: true,
            mentionedJid: [me],
            "externalAdReply": {
                "showAdAttribution": true,
                "renderLargerThumbnail": true,
                "title": global.botname, 
                "containsAutoReply": true,
                "mediaType": 1, 
                "thumbnail": fs.readFileSync("./PappyMedia/theme/PappyPic.jpg"),
                "mediaUrl": `${wagc}`,
                "sourceUrl": `${wagc}`
            }
        }
    });
}
break;

                
case 'runtime': {
    // Format the uptime string with emojis and decorations
    let lowq = `*⛩️ Bot Uptime ⛩️*\n\n` +
               `🕰️ *The Bot Has Been Online For:*  \n` +
               `💫 ${runtime(process.uptime())} \n\n` +
               `🎉 *Let's keep the chat lively!* `;

    replygcpappy(lowq);
}
break;
			case 'settings': {
    if (PappyTheCreator) {
        // Show the current settings
        let settingsBot = Object.entries(db.settings[botNumber]).map(([key, value]) => {
            let qhk = (typeof value === 'boolean') ? (value ? '✅ On' : '❌ Off') : value;
            return `*${key.charAt(0).toUpperCase() + key.slice(1)}*: ${qhk}`;
        }).join('\n');
        
        replygcpappy(`*Current Settings:*\n${settingsBot}`);  // Return settings list

        // Handle specific commands to toggle settings on/off
        if (text === 'anticall on') {
            db.settings[botNumber].anticall = true;
            replygcpappy('✅ *Anticall Activated*');
        }
        else if (text === 'anticall off') {
            db.settings[botNumber].anticall = false;
            replygcpappy('❌ *Anticall Deactivated*');
        }
        else if (text === 'autobio on') {
            db.settings[botNumber].autobio = true;
            replygcpappy('✅ *Autobio Activated*');
        }
        else if (text === 'autobio off') {
            db.settings[botNumber].autobio = false;
            replygcpappy('❌ *Autobio Deactivated*');
        }
        else if (text === 'autoread on') {
            db.settings[botNumber].autoread = true;
            replygcpappy('✅ *Autoread Activated*');
        }
        else if (text === 'autoread off') {
            db.settings[botNumber].autoread = false;
            replygcpappy('❌ *Autoread Deactivated*');
        }
        else if (text === 'autotype on') {
            db.settings[botNumber].autotyping = true;
            replygcpappy('✅ *Autotype Activated*');
        }
        else if (text === 'autotype off') {
            db.settings[botNumber].autotyping = false;
            replygcpappy('❌ *Autotype Deactivated*');
        }
        else if (text === 'antiswview on') {
            db.settings[botNumber].readsw = true;
            replygcpappy('✅ *Read SW Activated*');
        }
        else if (text === 'antiswview off') {
            db.settings[botNumber].readsw = false;
            replygcpappy('❌ *Read SW Deactivated*');
        }
    } else {
        replygcpappy('⚠️ *You are not authorized to view or change settings.*');
    }
}
break;

                
        

		case 'translate': {
    if (!q) return replygcpappy(`*❓ Where is the text?*\n\n📌 *Example usage:*\n*${prefix + command} <language id> <text>*\n*${prefix + command} ja yo wassup*`);
        await PappyStickWait()    

    const defaultLang = 'en';
    let lang = args[0];
    let text = args.slice(1).join(' ');

    if ((args[0] || '').length !== 2) {
        lang = defaultLang;
        text = args.join(' ');
    }

    if (!text && m.quoted && m.quoted.text) text = m.quoted.text;

    try {
        let result = await translate(text, { to: lang, autoCorrect: true }).catch(_ => null);
        if (!result || !result.text) return replygcpappy('⚠️ Translation failed. Please try again.');

        const caption = `🌐 *Translated Text:* ${result.text}\n\n*🔤 From:* ${text}\n*🔠 To:* ${lang}`;
        const imageUrl = 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png';

        // Send the message with the image URL directly
        await PappyBotInc.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: caption,
            mentions: [m.sender]
        }, { quoted: m });

    } catch (e) {
        console.error('Error in translation:', e);
        replygcpappy('⚠️ An error occurred. Please try again later.');
    }
}
break;


   
   
			case 'ebinary': {
if (!q) return replygcpappy(`Send/reply text with captions ${prefix + command}`)
await PappyStickWait()                
let { eBinary } = require('./lib/binary')
let eb = await eBinary(`${q}`)
replygcpappy(eb)
}
break
        
case 'dbinary': {
if (!q) return replygcpappy(`Send/reply text with captions ${prefix + command}`)
await PappyStickWait()    
let { dBinary } = require('./lib/binary')
let db = await dBinary(`${q}`)
replygcpappy(db)
}
break
        
			  case 'volaudio': {
if (!args.join(" ")) return replygcpappy(`Example: ${prefix + command} 10`)
await PappyStickWait()                  
media = await PappyBotInc.downloadAndSaveMediaMessage(quoted, "volume")
rname = getRandom('.mp3')
exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
fs.unlinkSync(media)
if (err) return replygcpappy('Error!')
jadie = fs.readFileSync(rname)
PappyBotInc.sendMessage(m.chat, {audio:jadie, mimetype: 'audio/mp4', ptt: true}, {quoted: m})
fs.unlinkSync(rname)
})
}
break
        
case 'volvideo': {
if (!args.join(" ")) return replygcpappy(`Example: ${prefix + command} 10`)
await PappyStickWait()    
media = await PappyBotInc.downloadAndSaveMediaMessage(quoted, "volume")
rname = getRandom('.mp4')
exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
fs.unlinkSync(media)
if (err) return replygcpappy('Error!')
jadie = fs.readFileSync(rname)
PappyBotInc.sendMessage(m.chat, {video:jadie, mimetype: 'video/mp4'}, {quoted: m})
fs.unlinkSync(rname)
})
}
break
        
			case 'emojimix': {
                let [emoji1, emoji2] = text.split`+`
                if (!emoji1) return replygcpappy(`Example : ${prefix + command} 😅+🤔`)
                if (!emoji2) return replygcpappy(`Example : ${prefix + command} 😅+🤔`)
                await PappyStickWait()
                let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
                for (let res of anu.results) {
                    let encmedia = await PappyBotInc.sendImageAsSticker(m.chat, res.url, m, {
                        packname: global.packname,
                        author: global.author,
                        categories: res.tags
                    })
                }
            }
            break
        
			case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'squirrel':
                try {
                let set
                if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
                if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
                if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
                if (/earrape/.test(command)) set = '-af volume=12'
                if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
                if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
                if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
                if (/reverse/.test(command)) set = '-filter_complex "areverse"'
                if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
                if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
                if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
                if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
                if (/audio/.test(mime)) {
                await PappyStickWait()
                let media = await PappyBotInc.downloadAndSaveMediaMessage(quoted)
                let ran = getRandom('.mp3')
                exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return replygcpappy(err)
                let buff = fs.readFileSync(ran)
                PappyBotInc.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : m })
                fs.unlinkSync(ran)
                })
                } else replygcpappy(`Reply to the audio you want to change with a caption *${prefix + command}*`)
                } catch (e) {
                replygcpappy(e)
                }
                break
        
			case 'toonce':
            case 'toviewonce': {
                if (!m.quoted) return replygcpappy(`Reply Image/Video`)
                await PappyStickWait()
                if (/image/.test(mime)) {
                    anuan = await PappyBotInc.downloadAndSaveMediaMessage(quoted)
                    PappyBotInc.sendMessage(m.chat, {
                        image: {
                            url: anuan
                        },
                        caption: mess.done,
                        fileLength: "999",
                        viewOnce: true
                    }, {
                        quoted: m
                    })
                } else if (/video/.test(mime)) {
                    anuanuan = await PappyBotInc.downloadAndSaveMediaMessage(quoted)
                    PappyBotInc.sendMessage(m.chat, {
                        video: {
                            url: anuanuan
                        },
                        caption: mess.done,
                        fileLength: "99999999",
                        viewOnce: true
                    }, {
                        quoted: m
                    })
                } else if (/audio/.test(mime)) {
                   bebasap = await PappyBotInc.downloadAndSaveMediaMessage(quoted)
                   PappyBotInc.sendMessage(m.chat, {
                     audio: {
                        url: bebasap
                     },
                     mimetype: 'audio/mpeg',
                     ptt: true,
                     viewOnce: true
                   })
                }
            }
        
            break
        
        
			case 'fliptext': {
                if (args.length < 1) return replygcpappy(`Example:\n${prefix}fliptext dgpappy`)
                quere = args.join(" ")
                flipe = quere.split('').reverse().join('')
                replygcpappy(`\`\`\`「 FLIP TEXT 」\`\`\`\n*•> Normal :*\n${quere}\n*•> Flip :*\n${flipe}`)
            }
            break
        
			case 'style': case 'styletext': {
		if (!text) return replygcpappy('Enter Query text!')
                let anu = await styletext(text)
                let teks = `Style Text From ${text}\n\n`
                for (let i of anu) {
                    teks += `${themeemoji} *${i.name}* : ${i.result}\n\n`
                }
                replygcpappy(teks)
	    }
	    break
        
			case 'obfus': case 'obfuscate':{
if (!text) return replygcpappy(`Example ${prefix+command} const pappybot = require('baileys')`)
await PappyStickWait()                
try {
let meg = await obfus(text)
replygcpappy(`Success
${meg.result}`)
} catch {
	replygcpappy(`Use the command properly\nExample ${prefix+command} const pappybot = require('baileys')`)
}
}
break
        
        
		    
        
           
        


        

	            
                
       

			  
           
           
        

        
        
        
			

        
        
			



			
		
			
		
        
        
       
       
        
              
			

			


		    
        
			      
			
			// Group Menu
			
			case 'delete': case 'del': case 'd': {
				if (!m.quoted) return replygcpappy('Reply to the message you want to delete')
				await PappyBotInc.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: m.isBotAdmin ? false : true, id: m.quoted.id, participant: m.quoted.sender }})
			}
			break
			case 'linkgroup': case 'linkgrup': case 'linkgc': case 'urlgroup': case 'urlgrup': case 'urlgc': {
				if (!m.isGroup) return PappyStickGroup()
				if (!m.isAdmin) return PappyStickAdmin()
				if (!m.isBotAdmin) return PappyStickBotAdmin()
				let response = await PappyBotInc.groupInviteCode(m.chat)
				await PappyBotInc.sendMessage(m.chat, { text: `https://chat.whatsapp.com/${response}\n\nLink Group : ${(await PappyBotInc.groupMetadata(m.chat)).subject}`, detectLink: true }, { quoted: m });
			}
			break
			
			case 'group': case 'grup': {
				if (!m.isGroup) return PappyStickGroup()
				if (!m.isAdmin) return PappyStickAdmin()
				if (!m.isBotAdmin) return PappyStickBotAdmin()
				if (text === 'close') {
					await PappyBotInc.groupSettingUpdate(m.chat, 'announcement').then((res) => replygcpappy(`*Successfully Closing The Group*`))
				} else if (text === 'open') {
					await PappyBotInc.groupSettingUpdate(m.chat, 'not_announcement').then((res) => replygcpappy(`*Successfully Opening The Group*`))
				} else {
					let button = [{
						name: 'single_select',
						buttonParamsJson: {
							title: 'SELECT',
							sections: [{
								title: 'Group Mode',
								rows: [
									{ title: 'Open Group', description: 'Open Group', id: 'grup open' },
									{ title: 'Close Group', description: 'Close Group', id: 'grup close' },
								]
							}]
						}
					}]
					await PappyBotInc.sendButtonMsg(m.chat, 'Group Mode', pappyytimewisher, 'Please choose', null, button, m);
				}
			}
			break
			
    case 'deleteppbot': case 'delbotpp': case 'delppbot': {
if (!PappyTheCreator) return PappyStickOwner()
    await PappyBotInc.removeProfilePicture(PappyBotInc.user.id)
    replygcpappy(`Success in deleting bot's profile picture`)
    }
    break
			

			
			case 'listonline': case 'liston': {
				if (!m.isGroup) return PappyStickGroup()
				let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
				let online = [...Object.keys(store.presences[id]), botNumber]
				await PappyBotInc.sendMessage(m.chat, { text: 'List Online:\n\n' + online.map(v => `${setv} @` + v.replace(/@.+/, '')).join`\n`, mentions: online }, { quoted: m }).catch((e) => replygcpappy('Fail'))
			}
			break
			
			// Bot Menu
			case 'owner': {
				let list = []
for (let i of owner) {
list.push({
	    	displayName: await PappyBotInc.getName(i),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await PappyBotInc.getName(i)}\nFN:${await PappyBotInc.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${ytname}\nitem2.X-ABLabel:YouTube\nitem3.URL:${socialm}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
                PappyBotInc.sendMessage(m.chat, {
                    contacts: {
                        displayName: `${list.length} Contact`,
                        contacts: list
                    }, contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                title: botname,
                                body: ownername,
                                thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
                                sourceUrl: wagc,
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                }, {
                    quoted: m
                })
            }
            break
			
			case 'req': case 'request': {
				if (!text) return replygcpappy('What do you want to request from the owner??')
				await PappyBotInc.sendMessage(m.chat, { text: `*Request Has Been Sent To Owner*\n_Thank You🙏_` }, { quoted: m })
				await PappyBotInc.sendFromOwner(ownernumber, `Order From : @${m.sender.split('@')[0]}\nFor Owners\n\nRequest ${text}`, m, { contextInfo: { mentionedJid: [m.sender], isForwarded: true }})
			}
			break
			
                
case 'runcode': {
    if (!text) return replygcpappy(`Example: ${prefix + command} <JavaScript code>`);

    try {
        // Variable to capture console output
        let consoleOutput = '';
        const customConsole = {
            log: (...args) => {
                consoleOutput += args.join(' ') + '\n'; // Capture console.log output
            }
        };

        // Wrap the code execution in a Function and pass in the custom console
        const codeFunction = new Function('console', text);
        let result = codeFunction(customConsole); // Execute the code

        // If the result is a Promise (async code), await it
        if (result instanceof Promise) {
            result = await result;
        }

        // Prepare the output message
        const output = consoleOutput ? `\n🖥️ *Console Output:*\n\`\`\`${consoleOutput}\`\`\`` : '';
        const resultMessage = result !== undefined ? `\n✅ *Execution Result:*\n\`\`\`${result}\`\`\`` : '';

        replygcpappy(`${resultMessage}${output || ''}`);
    } catch (error) {
        // Return an error message if execution fails
        replygcpappy(`❌ *Error:* \n\`\`\`${error.message}\`\`\``);
    }
}
break;

                
            case 'p': case 'ping': case 'botstatus': case 'statusbot': {
    const _t0  = performance.now();
    const _t1  = performance.now();
    const _lat = (_t1 - _t0).toFixed(2);
    const _run = runtime(process.uptime());
    const _ram = `${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}`;
    const _mode = PappyBotInc.public ? '🌍 Public' : '🔒 Self';

    // Rich interactive ping card with channel footer
    try {
        const _pingMsg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `🐾 *PAPPY BOT V2 — Status*\n\n` +
                                  `⚡ *Response:* ${_lat}ms\n` +
                                  `⏱ *Uptime:* ${_run}\n` +
                                  `🗄 *RAM:* ${_ram}\n` +
                                  `🌐 *Mode:* ${_mode}\n` +
                                  `👥 *Users:* ${Object.keys(global.db.users).length}`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: wagc }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ buttons: [{}] }),
                        contextInfo: {
                            forwardingScore: 999, isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363232303807350@newsletter',
                                newsletterName: 'Pappy Bot V2', serverMessageId: 143
                            }
                        }
                    })
                }
            }
        }, { quoted: m });
        await PappyBotInc.relayMessage(m.chat, _pingMsg.message, {});
    } catch {
        // Fallback to plain text if interactive not supported
        replygcpappy(`🐾 *PAPPY BOT V2*\n\n⚡ ${_lat}ms | ⏱ ${_run} | 🗄 ${_ram} | ${_mode}`);
    }
}
break;
    
			
			case 'p2': case 'ping2': case 'botstatus2': case 'statusbot2': {
    const used = process.memoryUsage();
    const cpus = os.cpus().map(cpu => {
        cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
        return cpu;
    });
    
    const cpu = cpus.reduce((last, cpu, _, { length }) => {
        last.total += cpu.total;
        last.speed += cpu.speed / length;
        last.times.user += cpu.times.user;
        last.times.nice += cpu.times.nice;
        last.times.sys += cpu.times.sys;
        last.times.idle += cpu.times.idle;
        last.times.irq += cpu.times.irq;
        return last;
    }, {
        speed: 0,
        total: 0,
        times: {
            user: 0,
            nice: 0,
            sys: 0,
            idle: 0,
            irq: 0
        }
    });
    
    let timestamp = speed();
    let latensi = speed() - timestamp;
    neww = performance.now();
    oldd = performance.now();

    respon = `
📡 *Response Speed*: ${latensi.toFixed(4)} _seconds_
🕒 ${oldd - neww} _milliseconds_
⏱ *Runtime*: ${runtime(process.uptime())}

💻 *Server Info*
🗄 *RAM Usage*: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

🛠 *NodeJS Memory Usage*
${Object.keys(used)
    .map(
        (key, _, arr) =>
            `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${formatp(used[key])}`
    )
    .join('\n')}

${cpus[0] ? `🖥️ *Total CPU Usage*
${cpus[0].model.trim()} (${cpu.speed} MHz)
${Object.keys(cpu.times)
    .map(
        type =>
            `- ${type.padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`
    )
    .join('\n')}

*CPU Core(s) Usage* (${cpus.length} Core CPU)
${cpus
    .map(
        (cpu, i) =>
            `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHz)\n${Object.keys(cpu.times)
                .map(
                    type =>
                        `- ${type.padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`
                )
                .join('\n')}`
    )
    .join('\n\n')}` : ''}`.trim();

    replygcpappy(respon);
}
break;



case 'speedtest':
case 'speed': {
    replygcpappy('⚡ Testing Speed... ⚡');
    let cp = require('child_process');
    let { promisify } = require('util');
    let exec = promisify(cp.exec).bind(cp);
    let o;
    
    try {
        o = await exec('python3 speed.py');
    } catch (e) {
        o = e;
    } finally {
        let { stdout, stderr } = o;
        if (stdout.trim()) replygcpappy(`🌟 Speed Test Results 🌟\n\n${stdout}`);
        if (stderr.trim()) replygcpappy(`⚠️ Error:\n${stderr}`);
    }
}
break;
			case 'afk': {
				let user = global.db.users[m.sender]
				user.afkTime = + new Date
				user.afkReason = text
				replygcpappy(`@${m.sender.split('@')[0]} Been Afk ${text ? ': ' + text : ''}`)
			}
			break
        
			case 'inspect': {
				if (!text) return replygcpappy('Enter Group Link!')
				let code = q.match(/chat.whatsapp.com\/([\w\d]*)/g);
				if (code === null) return replygcpappy('No invite url detected.');
				code = code[0].replace('chat.whatsapp.com/', '');
				await PappyBotInc.groupGetInviteInfo(code).then(anu => {
					let { id, subject, owner, subjectOwner, creation, desc, descId, participants, size, descOwner } = anu
					console.log(anu);
					let par = `*Gc Name* : ${subject}\n*ID* : ${id}\n${owner ? `*Creator* : @${owner.split('@')[0]}` : '*Creator* : -'}\n*Number of Members* : ${size}\n*Gc Created Date* : ${new Date(creation * 1000).toLocaleString()}\n*DescID* : ${descId ? descId : '-'}\n${subjectOwner ? `*GC Name Changed By* : @${subjectOwner.split('@')[0]}` : '*GC Name Changed By* : -'}\n${descOwner ? `*Desc changed by* : @${descOwner.split('@')[0]}` : '*Desc changed by* : -'}\n\n*Desc* : ${desc ? desc : '-'}\n`;
					PappyBotInc.sendTextMentions(m.chat, par, m);
				}).catch((res) => {
					if (res.data == 406) return replygcpappy('Group Not Found❗');
					if (res.data == 410) return replygcpappy('Group URL Has Been Reset❗');
				});
			}
			break
                
                
			case 'q': case 'quoted': {
				if (!m.quoted) return replygcpappy('Reply the message!')
				const anu = await m.getQuotedObj()
				if (!anu) return replygcpappy('Format Not Available!')
				if (!anu.quoted) return replygcpappy('The Message You Reply Does Not Contain a Reply')
				await PappyBotInc.relayMessage(m.chat, { [anu.quoted.type]: anu.quoted.msg }, {})
			}
			break
                
                
			case 'confes': case 'confess': case 'menfes': case 'menfess': {
				if (m.isGroup) return PappyStickPrivate();
				if (game.menfes[m.sender]) return replygcpappy(`You're In Session ${command}!`)
				if (!text) return replygcpappy(`Example : ${prefix + command} 91xxxx|Fake name`)
				let [teks1, teks2] = text.split`|`
				if (!isNaN(teks1) && !teks1.startsWith('0') && teks1) {
					const tujuan = teks1.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
					const onWa = await PappyBotInc.onWhatsApp(tujuan)
					if (!onWa.length > 0) return replygcpappy('This number is not registered on WhatsApp!')
					game.menfes[m.sender] = {
						tujuan: tujuan,
						nama: teks2,
						waktu: setTimeout(() => {
							if (game.menfes[m.sender]) replygcpappy(`_Time ${command} finished_`)
							delete game.menfes[m.sender];
						}, 600000)
					};
					game.menfes[tujuan] = {
						tujuan: m.sender,
						nama: 'Recipient',
						waktu: setTimeout(() => {
							if (game.menfes[tujuan]) PappyBotInc.sendMessage(tujuan, { text: `_Time ${command} finished_` });
							delete game.menfes[tujuan];
						}, 600000)
					};
					PappyBotInc.sendMessage(tujuan, { text: `_${command} connected_\n*Note :* if you want to end, type _*${prefix}del${command}*_` });
					replygcpappy(`_Start ${command}..._\n*Please start sending messages/media*\n*Duration ${command} only for 10 minutes*\n*Note :* if you want to end, type _*${prefix}del${command}*_`)
				} else {
					replygcpappy(`Enter the number!\nExample : ${prefix + command} 91xxxx|Fake name`)
				}
			}
			break
                
			case 'delconfes': case 'delconfess': case 'delmenfes': case 'delmenfess': {
				if (!game.menfes[m.sender]) return replygcpappy(`You Are Not In ${command.split('del')[1]} session!`)
				let anu = game.menfes[m.sender]
				PappyBotInc.sendMessage(anu.tujuan, { text: `Chat Ended By ${anu.nama ? anu.nama : 'Somebody'}` })
				replygcpappy(`Successfully Ends Session ${command.split('del')[1]}!`)
				delete game.menfes[anu.tujuan];
				delete game.menfes[m.sender];
			}
			break
			
			// Tools Menu
			case 'fetch': case 'get': {
				if (!text.startsWith('http')) return replygcpappy(`No Query?\n\nExample : ${prefix + command} https://google.com`)
				try {
					const res = await axios.get(isUrl(text) ? isUrl(text)[0] : text)
					if (!/json|html|plain/.test(res.headers['content-type'])) {
						await replygcpappy(text)
					} else {
						replygcpappy(util.format(res.data))
					}
				} catch (e) {
					replygcpappy(util.format(e))
				}
			}
			break
                
			case 'toaud': case 'toaudio': {
				if (!/video/.test(mime) && !/audio/.test(mime)) return replygcpappy(`Send/Reply Video/Audio that you want to make into audio with captions ${prefix + command}`)
				PappyStickWait()
				let media = await (m.quoted ? m.quoted.download() : m.download())
				let audio = await toAudio(media, 'mp4')
				await PappyBotInc.sendMessage(m.chat, { audio: audio, mimetype: 'audio/mpeg'}, { quoted : m })
			}
			break
                
			case 'tomp3': {
				if (!/video/.test(mime) && !/audio/.test(mime)) return replygcpappy(`Send/Reply Video/Audio that you want to make into audio with captions ${prefix + command}`)
				PappyStickWait()
				let media = await (m.quoted ? m.quoted.download() : m.download())
				let audio = await toAudio(media, 'mp4')
				await PappyBotInc.sendMessage(m.chat, { document: audio, mimetype: 'audio/mpeg', fileName: `dgpappy.mp3`}, { quoted : m })
			}
			break
                
			case 'tovn': case 'toptt': case 'tovoice': {
				if (!/video/.test(mime) && !/audio/.test(mime)) return replygcpappy(`Send/Reply Video/Audio that you want to make into audio with captions ${prefix + command}`)
				PappyStickWait()
				let media = await (m.quoted ? m.quoted.download() : m.download())
				let audio = await toPTT(media, 'mp4')
				await PappyBotInc.sendMessage(m.chat, { audio: audio, mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted: m })
			}
			break
                
			case 'togif': {
				if (!/webp/.test(mime) && !/video/.test(mime)) return replygcpappy(`Reply Video/Sticker with caption *${prefix + command}*`)
				PappyStickWait()
				let { webp2mp4File } = require('./lib/uploader')
				let media = await PappyBotInc.downloadAndSaveMediaMessage(qmsg)
				let webpToMp4 = await webp2mp4File(media)
				await PappyBotInc.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
				await fs.unlinkSync(media)
			}
			break
                
			case 'tovideo': case 'tomp4': {
				if (!/webp/.test(mime) && !/video/.test(mime)) return replygcpappy(`Reply Video/Sticker with caption *${prefix + command}*`)
				PappyStickWait()
				let { webp2mp4File } = require('./lib/uploader')
				let media = await PappyBotInc.downloadAndSaveMediaMessage(qmsg)
				let webpToMp4 = await webp2mp4File(media)
				await PappyBotInc.sendMessage(m.chat, { video: { url: webpToMp4.result }, caption: 'Convert Webp To Video' }, { quoted: m })
				await fs.unlinkSync(media)
			}
			break
                
			case 'toimage': case 'toimg': {
				if (!/webp/.test(mime)) return replygcpappy(`Reply Video/Sticker with caption *${prefix + command}*`)
				PappyStickWait()
				let media = await PappyBotInc.downloadAndSaveMediaMessage(qmsg)
				let ran = await getRandom('.png')
				exec(`ffmpeg -i ${media} ${ran}`, (err) => {
					fs.unlinkSync(media)
					if (err) return replygcpappy('Fail❗')
					let buffer = fs.readFileSync(ran)
					PappyBotInc.sendMessage(m.chat, { image: buffer }, { quoted: m })
					fs.unlinkSync(ran)
				})
			}
			break
                
			case 'toptv': {
				if (!/video/.test(mime)) return replygcpappy(`Send/Reply the video you want to use as a PTV message with caption ${prefix + command}`)
				if ((m.quoted ? m.quoted.type : m.type) === 'videoMessage') {
					const anu = await (m.quoted ? m.quoted.download() : m.download())
					const msg = await generateWAMessageContent({ video: anu }, { upload: PappyBotInc.waUploadToServer })
					await PappyBotInc.relayMessage(m.chat, { ptvMessage: msg.videoMessage }, {})
				} else {
					replygcpappy('Reply Videos You Want to Convert to PTV Messages!')
				}
			}
			break
                
case 'tourl': {
  if (!isMedia) return replygcpappy("Where Is The Media?");
  PappyStickWait();
  let media = await PappyBotInc.downloadAndSaveMediaMessage(quoted);
  let mediaUrl = await handleMediaUpload(m, mime);  // Call the media upload function

  if (mediaUrl.startsWith("http")) {  // If media was successfully uploaded
    replygcpappy('Url : ' + mediaUrl);  // Reply with the media URL
  } else {
    replygcpappy(mediaUrl);  // If the response was an error message
  }
}
break;
 
        
case 'pixelate': {
  if (!isMedia) return replygcpappy("Where Is The Image");
  
  let media = await PappyBotInc.downloadAndSaveMediaMessage(quoted);
  let mediaUrl = await handleMediaUpload(m, mime);  // Call the media upload function

  if (mediaUrl.startsWith("http")) {  // If media was successfully uploaded
    PappyBotInc.sendMessage(m.chat, {
      image: { url: `https://bk9.fun/maker/pixelate?url=${mediaUrl}&no=10` },
      caption: "Here you go!"
    }, { quoted: m });
  } else {
    replygcpappy(mediaUrl);  // If the response was an error message
  }
}
break;


			case 'texttospeech-indo': case 'tts-indo': case 'ttsindo': {
				if (!text) return replygcpappy('Where is the text you want to convert to audio??')
				let { tts } = require('./lib/tts')
				let anu = await tts(text)
				PappyBotInc.sendMessage(m.chat, { audio: anu, ptt: true, mimetype: 'audio/mpeg' }, { quoted: m })
			}
			break


			case 'say': case 'tts': case 'gtts':{
if (!text) return replygcpappy('Where is the text?')
            let texttts = text
            const pappyrl = googleTTS.getAudioUrl(texttts, {
                lang: "en",
                slow: false,
                host: "https://translate.google.com",
            })
            return PappyBotInc.sendMessage(m.chat, {
                audio: {
                    url: pappyrl,
                },
                mimetype: 'audio/mp4',
                ptt: true,
                fileName: `${text}.mp3`
            }, {
                quoted: m,
            })
        }
        break
                
			case 'toqr': case 'qr': {
				if (!text) return replygcpappy(`Please include a text or link\n\nFor Example:\n*${prefix + command}* wassup`)
				PappyStickWait()
				await PappyBotInc.sendMessage(m.chat, { image: { url: 'https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=' + text }, caption: 'Here you go!' }, { quoted: m })
			}
			break
                
                
			case 'ssweb': {
				if (!text) return replygcpappy(`Example: ${prefix + command} https://github.com/pappy999666-dotcom`)
				if (!text.startsWith('http')) {
					let buf = 'https://image.thum.io/get/width/1900/crop/1000/fullpage/https://' + q;
					await PappyBotInc.sendMessage(m.chat, { image: { url: buf }, caption: 'Done' }, { quoted: m })
				} else {
					let buf = 'https://image.thum.io/get/width/1900/crop/1000/fullpage/' + q;
					await PappyBotInc.sendMessage(m.chat, { image: { url: buf }, caption: 'Done' }, { quoted: m })
				}
			}
			break
                
			case'smeta': {
if (!/webp/.test(mime)) return replygcpappy('Reply sticker!')
  var stiker = false
    try {
        let [packname, ...author] = q.split('|')
            //var author = (author  []).join('|')
                let mime = m.quoted.mimetype || ''
                        //let img = await q.download()
                            let img = await PappyBotInc.downloadAndSaveMediaMessage(quoted, makeid(5))
                                if (!img) return replygcpappy('Reply a sticker!')
                                    var stiker = await addExifAvatar(img, `Made by`, `Cheems Bot`)
                                      } catch (e) {
                                          console.error(e)
                                              if (Buffer.isBuffer(e)) stiker = e
                                                } finally {
                                                    if (stiker) PappyBotInc.sendMessage(m.chat, {
                                                          sticker: stiker
                                                              }, {
                                                                    quoted: m
                                                                        })
                                                                            else return replygcpappy('reply sticker')
                                                                              }
                                                                              }       
                                                                              break
			
            case 's': case 'sticker': case 'stiker': {
if (!quoted) return replygcpappy(`Send/Reply Images/Videos/Gifs With Captions ${prefix+command}\nVideo Duration 1-9 Seconds`)
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await PappyBotInc.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return replygcpappy('Send/Reply Images/Videos/Gifs With Captions ${prefix+command}\nVideo Duration 1-9 Seconds')
let media = await quoted.download()
let encmedia = await PappyBotInc.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
} else {
replygcpappy(`Send/Reply Images/Videos/Gifs With Captions ${prefix+command}\nVideo Duration 1-9 Seconds`)
}
}
break

case 'swm': case 'steal': case 'stickerwm': case 'take':{
if (!args.join(" ")) return replygcpappy(`Where is the text?`)
const swn = args.join(" ")
const pcknm = swn.split("|")[0]
const atnm = swn.split("|")[1]
if (m.quoted.isAnimated === true) {
PappyBotInc.downloadAndSaveMediaMessage(quoted, "gifee")
PappyBotInc.sendMessage(m.chat, {sticker:fs.readFileSync("gifee.webp")}, m, { packname: pcknm, author: atnm })
} else if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await PappyBotInc.sendImageAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return replygcpappy('Maximum 10 Seconds!')
let media = await quoted.download()
let encmedia = await PappyBotInc.sendVideoAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
} else {
replygcpappy(`Photo/Video?`)
}
}
break
			case 'smeme': case 'stickermeme': case 'stickmeme': {
if (!/webp/.test(mime) && /image/.test(mime)) {
if (!text) return replygcpappy(`Usage: ${prefix + command} text1|text2`)
let { TelegraPh } = require('./lib/uploader')
atas = text.split('|')[0] ? text.split('|')[0] : '-'
bawah = text.split('|')[1] ? text.split('|')[1] : '-'
mee = await PappyBotInc.downloadAndSaveMediaMessage(quoted)
mem = await TelegraPh(mee)
meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${mem}`
memek = await PappyBotInc.sendImageAsSticker(m.chat, meme, m, { packname: global.packname, author: global.author })
} else {
replygcpappy(`Send/reply image with caption ${prefix + command} text1|text2`)
}
}
break
                
			case 'write': {
				replygcpappy(`*Example*\n${prefix}writeleft text\n${prefix}writeright text\n${prefix}folioleft text\n${prefix}folioright text`)
			}
			break
                
			case 'writeleft': {
				if (!text) return replygcpappy(`Send command *${prefix + command}* text`)
				PappyStickWait()
				const splitText = text.replace(/(\S+\s*){1,9}/g, '$&\n')
				const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
				spawn('convert', [
					'./src/write/images/book/beforeleft.jpg',
					'-font',
					'./src/write/font/Indie-Flower.ttf',
					'-size',
					'960x1280',
					'-pointsize',
					'23',
					'-interline-spacing',
					'2',
					'-annotate',
					'+140+153',
					fixHeight,
					'./src/write/images/book/afterleft.jpg'
				])
				.on('error', () => replygcpappy(mess.error))
				.on('exit', () => {
					PappyBotInc.sendMessage(m.chat, { image: fs.readFileSync('./src/write/images/book/afterleft.jpg'), caption: 'Here you go!' }, { quoted: m })
				})
			}
			break
                
			case 'writeright': {
				if (!text) return replygcpappy(`Send command *${prefix + command}* text`)
				PappyStickWait()
				const splitText = text.replace(/(\S+\s*){1,9}/g, '$&\n')
				const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
				spawn('convert', [
					'./src/write/images/book/beforeright.jpg',
					'-font',
					'./src/write/font/Indie-Flower.ttf',
					'-size',
					'960x1280',
					'-pointsize',
					'23',
					'-interline-spacing',
					'2',
					'-annotate',
					'+128+129',
					fixHeight,
					'./src/write/images/book/afterright.jpg'
				])
				.on('error', () => replygcpappy(mess.error))
				.on('exit', () => {
					PappyBotInc.sendMessage(m.chat, { image: fs.readFileSync('./src/write/images/book/afterright.jpg'), caption: 'Here you go!' }, { quoted: m })
				})
			}
			break
                
			case 'folioleft': {
				if (!text) return replygcpappy(`Send command *${prefix + command}* text`)
				PappyStickWait()
				const splitText = text.replace(/(\S+\s*){1,9}/g, '$&\n')
				const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
				spawn('convert', [
					'./src/write/images/folio/beforeleft.jpg',
					'-font',
					'./src/write/font/Indie-Flower.ttf',
					'-size',
					'1720x1280',
					'-pointsize',
					'23',
					'-interline-spacing',
					'4',
					'-annotate',
					'+48+185',
					fixHeight,
					'./src/write/images/folio/afterleft.jpg'
				])
				.on('error', () => replygcpappy(mess.error))
				.on('exit', () => {
					PappyBotInc.sendMessage(m.chat, { image: fs.readFileSync('./src/write/images/folio/afterleft.jpg'), caption: 'Here you go!' }, { quoted: m })
				})
			}
			break
                
			case 'folioright': {
				if (!text) return replygcpappy(`Send command *${prefix + command}* text`)
				PappyStickWait()
				const splitText = text.replace(/(\S+\s*){1,9}/g, '$&\n')
				const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
				spawn('convert', [
					'./src/write/images/folio/beforeright.jpg',
					'-font',
					'./src/write/font/Indie-Flower.ttf',
					'-size',
					'1720x1280',
					'-pointsize',
					'23',
					'-interline-spacing',
					'4',
					'-annotate',
					'+89+190',
					fixHeight,
					'./src/write/images/folio/afterright.jpg'
				])
				.on('error', () => replygcpappy(mess.error))
				.on('exit', () => {
					PappyBotInc.sendMessage(m.chat, { image: fs.readFileSync('./src/write/images/folio/afterright.jpg'), caption: 'Here you go!' }, { quoted: m })
				})
			}
			break
			




//--------------------------------------------------------------------------------------------------//



// █▄ ▄█ █▀▀ █▄ █ █ █   █▀▀ █▀█ █▄ ▄█ █▄ ▄█ ▄▀▄ █▄ █ █▀▄ █▀▀ 
// █ ▀ █ ██▄ █ ▀█ █▄█   █▄▄ █▄█ █ ▀ █ █ ▀ █ █▀█ █ ▀█ █▄▀ ▄██ 
		
      
			

    
      

			// Menu
		    case 'menu': case 'help': case 'alive': {
            const timestampe = speed()
            const latensie = speed() - timestampe
            const a = db.users[sender]
            const me = m.sender
			const xmenu_oh = `
╭───❍「 *🤖 GREETING* 」
│ ✨ *Hello!* 👋
│ 🏷️ *Name* : ${m.pushName || 'No Name'}
│ 🎉 *${pappyytimewisher}* 😄
╰───────────❍
${readmore}
╭───❍「 *👤 USER INFO* 」
│ 🪪 *Name* : ${m.pushName || 'No Name'}
│ 📱 *Number* : +${me.split('@')[0]}
│ 🆔 *ID* : @${m.sender.split('@')[0]}
│ 🌟 *Status* : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
│ 🎯 *Limit* : ${isVip ? 'VIP' : global.db.users[m.sender].limit}
│ 💰 *Money* : ${global.db.users[m.sender]?.uang.toLocaleString('en-IN') || '0'}
╰───────────❍

╭───❍「 *📊 BOT INFO* 」
│ ⚡ *Speed* : ${latensie.toFixed(4)} ms
│ ⏳ *Runtime* : ${runtime(process.uptime())}
│ 🏠 *Host* : ${os.hostname()}
│ 💻 *Platform* : ${os.platform()}
│ 🤖 *Bot Name* : ${global.botname}
│ 👑 *Owner* : @${ownernumber[0].split('@')[0]}
│ 🌐 *Mode* : ${PappyBotInc.public ? 'Public' : 'Self'}
│ 👥 *Total Users* : ${Object.keys(global.db.users).length}
│ 📈 *Total Hits* : ${global.db.settings[botNumber].totalhit}
│ 💬 *Total Chats* : ${Object.keys(global.db.groups).length}
│ ✳️ *Prefix* : ${xprefix}
╰───────────❍

╭───❍「 *🕒 TIME INFO* 」
│ 📅 *Date* : ${xdate}
│ 📆 *Day* : ${xday}
│ 🕰️ *Time* : ${xtime}
╰───────────❍

╭───❍「 *📜 MENU* 」
│ 🗂️ ${prefix}allmenu
│ 🔍 ${prefix}searchmenu
│ 📥 ${prefix}downloadmenu
│ 🎮 ${prefix}gamemenu
│ 🎭 ${prefix}funmenu
│ 🤖 ${prefix}aimenu
│ 👥 ${prefix}groupmenu
│ 👑 ${prefix}ownermenu
│ 🔄 ${prefix}convertmenu
│ 📃 ${prefix}listmenu
│ 🛐 ${prefix}religionmenu
│ 🎌 ${prefix}animemenu
│ 🖼️ ${prefix}randomphotomenu
│ 🎥 ${prefix}randomvideomenu
│ 🖌️ ${prefix}stickermenu
│ 💾 ${prefix}databasemenu
│ 🛍️ ${prefix}storemenu
│ 🔍 ${prefix}stalkermenu
│ ⚙️ ${prefix}othermenu
╰───────────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v8') {
  // P4: Interactive list menu with category sections
  const menuSections = [
    {
      title: '🤖 Core',
      rows: [
        { id: `${prefix}allmenu`,        title: '📖 All Commands',    description: 'Full command list' },
        { id: `${prefix}aimenu`,         title: '🤖 AI Tools',        description: 'GPT, Blackbox, DALL-E' },
        { id: `${prefix}downloadmenu`,   title: '⬇️ Downloaders',     description: 'YT, TikTok, IG, Spotify' },
      ]
    },
    {
      title: '🎮 Fun & Games',
      rows: [
        { id: `${prefix}gamemenu`,       title: '🎮 Games',           description: 'TTT, Slots, Suit PvP' },
        { id: `${prefix}funmenu`,        title: '🎭 Fun',             description: 'Truth, Dare, Random' },
        { id: `${prefix}animemenu`,      title: '🎌 Anime',           description: 'Hug, Kiss, Actions' },
      ]
    },
    {
      title: '🛠️ Tools & Group',
      rows: [
        { id: `${prefix}groupmenu`,      title: '👥 Group',           description: 'Admin commands' },
        { id: `${prefix}stickermenu`,    title: '🖌️ Stickers',        description: 'Make & steal stickers' },
        { id: `${prefix}convertmenu`,    title: '🔄 Convert',         description: 'Media conversion' },
        { id: `${prefix}stalkermenu`,    title: '🔍 Stalker',         description: 'Profile & info lookup' },
      ]
    },
    {
      title: '⚙️ Bot Config',
      rows: [
        { id: `${prefix}ownermenu`,      title: '👑 Owner Only',      description: 'Bot owner commands' },
        { id: `${prefix}databasemenu`,   title: '💾 Database',        description: 'Custom responses' },
        { id: `${prefix}othermenu`,      title: '⚙️ Other',           description: 'Misc utilities' },
      ]
    }
  ];
  // Convert to listMessage format
  const listSections = menuSections.map(sec => ({
    title: sec.title,
    rows: sec.rows.map(r => ({ rowId: r.id, title: r.title, description: r.description }))
  }));
  await PappyBotInc.sendMessage(m.chat, {
    listMessage: {
      title: `🐾 ${global.botname}`,
      description: `⚡ ${latensie.toFixed(2)}ms | 👥 ${Object.keys(global.db.users).length} users | 🌐 ${PappyBotInc.public ? 'Public' : 'Self'}`,
      buttonText: 'Select Category',
      listType: 1,
      sections: listSections
    }
  }, { quoted: m });
}
}


break
case 'allmenu': {
let xmenu_oh = `
╭──❍「 *🤖 GREETING* 」❍
├ ✨ *Hi 👋*
├ 🏷️ *Name* : ${m.pushName || 'No Name'}
├ 🎉 *${pappyytimewisher}* 😄
╰─┬────❍ ${readmore}
╭─┴❍「 *📖 GUIDE* 」❍
├ 🅞 = 👑 *For Owner*
├ 🅕 = 🌟 *For Free User*
├ 🅟 = 💎 *For Premium User*
╰─┬────❍
╭─┴❍「 *👑 Owner* 」❍
│${setv} ${prefix}delsession 🅞
│${setv} ${prefix}update-repo 🅞
│${setv} ${prefix}addbadword 🅞
│${setv} ${prefix}delbadword 🅞
│${setv} ${prefix}autoread 🅞
│${setv} ${prefix}autobio 🅞
│${setv} ${prefix}autotype 🅞
│${setv} ${prefix}unavailable 🅞
│${setv} ${prefix}autorecord 🅞
│${setv} ${prefix}autorecordtype 🅞
│${setv} ${prefix}autoswview 🅞
│${setv} ${prefix}setautoblock 🅞
│${setv} ${prefix}setantiforeign 🅞
│${setv} ${prefix}autoblock 🅞
│${setv} ${prefix}onlygc 🅞
│${setv} ${prefix}onlypc 🅞
│${setv} ${prefix}onlyindia 🅞
│${setv} ${prefix}onlyindo 🅞
│${setv} ${prefix}anticall 🅞
│${setv} ${prefix}self 🅞
│${setv} ${prefix}public 🅞
│${setv} ${prefix}join 🅞
│${setv} ${prefix}poll 🅞
│${setv} ${prefix}spam 🅞
│${setv} ${prefix}bc 🅞
│${setv} ${prefix}bcgroup 🅞
│${setv} ${prefix}setmenu 🅞
│${setv} ${prefix}setimgmenu 🅞
│${setv} ${prefix}setvidmenu 🅞
│${setv} ${prefix}setgifmenu 🅞
│${setv} ${prefix}setreply 🅞
│${setv} ${prefix}resethit 🅞
│${setv} ${prefix}resetuser 🅞
│${setv} ${prefix}creategc 🅞
│${setv} ${prefix}setexif 🅞
│${setv} ${prefix}getexif 🅞
│${setv} ${prefix}getautoblocknumber 🅞
│${setv} ${prefix}getantiforeignnumber 🅞
│${setv} ${prefix}userjid 🅞
│${setv} ${prefix}setbotbio 🅞
│${setv} ${prefix}delppbot 🅞
│${setv} ${prefix}shutdown 🅞
│${setv} ${prefix}setppbot 🅞
│${setv} ${prefix}addprem 🅞
│${setv} ${prefix}delprem 🅞
│${setv} ${prefix}addowner 🅞
│${setv} ${prefix}delowner 🅞
│${setv} ${prefix}addvn 🅞
│${setv} ${prefix}addapk 🅞
│${setv} ${prefix}addzip 🅞
│${setv} ${prefix}addpdf 🅞
│${setv} ${prefix}delapk 🅞
│${setv} ${prefix}delzip 🅞
│${setv} ${prefix}delpdf 🅞
│${setv} ${prefix}delvn 🅞
│${setv} ${prefix}addsticker 🅞
│${setv} ${prefix}delsticker 🅞
│${setv} ${prefix}addimage 🅞
│${setv} ${prefix}delimage 🅞
│${setv} ${prefix}addvideo 🅞
│${setv} ${prefix}delvideo 🅞
│${setv} ${prefix}upswtext 🅞
│${setv} ${prefix}upswvideo 🅞
│${setv} ${prefix}upswimage 🅞
│${setv} ${prefix}upswaudio 🅞
│${setv} ${prefix}autosticker 🅞
│${setv} ${prefix}block 🅞
│${setv} ${prefix}unblock 🅞
│${setv} ${prefix}leavegc 🅞
│${setv} ${prefix}pushcontact 🅞
│${setv} ${prefix}pushcontactv2 🅞
│${setv} ${prefix}pushcontactv3 🅞
│${setv} ${prefix}jpm 🅞
│${setv} ${prefix}checkmember 🅞
│${setv} ${prefix}post 🅞
│${setv} ${prefix}clearchat 🅞
│${setv} ${prefix}setprefix 🅞
│${setv} $ 🅞
│${setv} > 🅞
│${setv} < 🅞
╰─┬────❍
╭─┴❍「 *👥 Group* 」❍
│${setv} ${prefix}antibot 🅖
│${setv} ${prefix}antiviewonce 🅖
│${setv} ${prefix}readviewonce 🅖
│${setv} ${prefix}welcome 🅖
│${setv} ${prefix}adminevent 🅖
│${setv} ${prefix}groupevent 🅖
│${setv} ${prefix}antiforeign 🅖
│${setv} ${prefix}antimedia 🅖
│${setv} ${prefix}antiaudio 🅖
│${setv} ${prefix}antivideo 🅖
│${setv} ${prefix}antiimage 🅖
│${setv} ${prefix}antidocument 🅖
│${setv} ${prefix}antilocation 🅖
│${setv} ${prefix}anticontact 🅖
│${setv} ${prefix}antisticker 🅖
│${setv} ${prefix}antipoll 🅖
│${setv} ${prefix}antilink 🅖
│${setv} ${prefix}antiemoji 🅖
│${setv} ${prefix}antipromotion 🅖
│${setv} ${prefix}antivirtex 🅖
│${setv} ${prefix}grouplink 🅖
│${setv} ${prefix}listadmin 🅖
│${setv} ${prefix}invite 🅖
│${setv} ${prefix}ephemeral 🅖
│${setv} ${prefix}delete 🅖
│${setv} ${prefix}setppgroup 🅖
│${setv} ${prefix}delppgroup 🅖
│${setv} ${prefix}setnamegc 🅖
│${setv} ${prefix}setdesc 🅖
│${setv} ${prefix}add 🅖
│${setv} ${prefix}kick 🅖
│${setv} ${prefix}promote 🅖
│${setv} ${prefix}demote 🅖
│${setv} ${prefix}kickall 🅖
│${setv} ${prefix}promoteall 🅖
│${setv} ${prefix}demoteall 🅖
│${setv} ${prefix}getcontact 🅞
│${setv} ${prefix}savecontact 🅞
│${setv} ${prefix}sendcontact 🅞
│${setv} ${prefix}contactag 🅞
│${setv} ${prefix}hidetag 🅖
│${setv} ${prefix}totag 🅖
│${setv} ${prefix}tagall 🅖
│${setv} ${prefix}editinfo 🅖
│${setv} ${prefix}opentime 🅖
│${setv} ${prefix}closetime 🅖
│${setv} ${prefix}resetlink 🅖
│${setv} ${prefix}getbio 🅖
│${setv} ${prefix}vote 🅖
│${setv} ${prefix}upvote 🅖
│${setv} ${prefix}downvote 🅖
│${setv} ${prefix}checkvote 🅖
│${setv} ${prefix}delvote 🅖
│${setv} ${prefix}antivirus 🅖
│${setv} ${prefix}antibadword 🅖
│${setv} ${prefix}nsfw 🅖
│${setv} ${prefix}react 🅖
│${setv} ${prefix}getjoinrequest 🅖
╰─┬────❍
╭─┴❍「 *🔍 Search* 」❍
│${setv} ${prefix}google 🅕
│${setv} ${prefix}wikipedia 🅕
│${setv} ${prefix}ytsearch 🅕
│${setv} ${prefix}apksearch 🅕
│${setv} ${prefix}stickersearch 🅕
│${setv} ${prefix}imdb 🅕
│${setv} ${prefix}wanumber 🅕
│${setv} ${prefix}friend 🅕
│${setv} ${prefix}lyrics 🅕
│${setv} ${prefix}pixiv 🅕
╰─┬────❍
╭─┴❍「 *📥 Download* 」❍
│${setv} ${prefix}itunes 🅕
│${setv} ${prefix}play 🅕
│${setv} ${prefix}play2 🅕
│${setv} ${prefix}ytplay - termux 🅕
│${setv} ${prefix}ytmp3 - termux 🅕
│${setv} ${prefix}ytmp4 - termux 🅕
│${setv} ${prefix}yta 🅕
│${setv} ${prefix}ytv 🅕
│${setv} ${prefix}yta2 🅕
│${setv} ${prefix}ytv2 🅕
│${setv} ${prefix}image 🅕
│${setv} ${prefix}gimage 🅕
│${setv} ${prefix}live-wallpaper 🅕
│${setv} ${prefix}tiktok 🅕
│${setv} ${prefix}tiktokaudio 🅕
│${setv} ${prefix}tiktokvideo 🅕
│${setv} ${prefix}likee 🅕
│${setv} ${prefix}capcut 🅕
│${setv} ${prefix}instagram 🅕
│${setv} ${prefix}igimg 🅕
│${setv} ${prefix}facebook 🅕
│${setv} ${prefix}twitter 🅕
│${setv} ${prefix}apk 🅕
│${setv} ${prefix}bilibili 🅕
│${setv} ${prefix}dailymotion 🅕
│${setv} ${prefix}mega 🅕
│${setv} ${prefix}mediafire 🅕
│${setv} ${prefix}searchsoundcloud 🅕
│${setv} ${prefix}soundcloud 🅕
│${setv} ${prefix}google 🅕
│${setv} ${prefix}gimage 🅕
│${setv} ${prefix}weather 🅕
│${setv} ${prefix} 🅟
│${setv} ${prefix}gitclone 🅕
│${setv} ${prefix}happymod 🅕
│${setv} ${prefix}gdrive 🅕
│${setv} ${prefix}pinterest 🅕
│${setv} ${prefix}pindl 🅕
│${setv} ${prefix}ringtone 🅕
│${setv} ${prefix}autodownload 🅞
╰─┬────❍
╭─┴❍「 *🔨 Tool Menu* 」❍
│${setv} ${prefix}obfuscate 🅕
│${setv} ${prefix}styletext 🅕
│${setv} ${prefix}fliptext 🅕
│${setv} ${prefix}tts 🅕
│${setv} ${prefix}say 🅕
│${setv} ${prefix}togif 🅕
│${setv} ${prefix}toqr 🅕
│${setv} ${prefix}bass 🅕
│${setv} ${prefix}blown 🅕
│${setv} ${prefix}deep 🅕
│${setv} ${prefix}earrape 🅕
│${setv} ${prefix}fast 🅕
│${setv} ${prefix}fat 🅕
│${setv} ${prefix}nightcore 🅕
│${setv} ${prefix}reverse 🅕
│${setv} ${prefix}robot 🅕
│${setv} ${prefix}slow 🅕
│${setv} ${prefix}smooth 🅕
│${setv} ${prefix}squirrel 🅕
│${setv} ${prefix}tinyurl 🅕
│${setv} ${prefix}tovn 🅕
│${setv} ${prefix}t 🅕
│${setv} ${prefix}toaudio 🅕
│${setv} ${prefix}tomp3 🅕
│${setv} ${prefix}tomp4🅕
│${setv} ${prefix}toimg 🅕
│${setv} ${prefix}toonce 🅕
│${setv} ${prefix}toptv 🅕
│${setv} ${prefix}sticker 🅕
│${setv} ${prefix}smeme 🅕
│${setv} ${prefix}smeta 🅕
│${setv} ${prefix}take 🅟
│${setv} ${prefix}emojimix 🅕
│${setv} ${prefix}volaudio 🅕
│${setv} ${prefix}volvideo 🅕
│${setv} ${prefix}ebinary 🅕
│${setv} ${prefix}dbinary 🅕
│${setv} ${prefix}ssweb 🅕
│${setv} ${prefix}quoted 🅕
│${setv} ${prefix}translate 🅕
│${setv} ${prefix}get 🅕
│${setv} ${prefix}tourl 🅕
│${setv} ${prefix}write 🅕
╰─┬────❍
╭─┴❍「 *📃 List Menu* 」❍
│${setv} ${prefix}listprem 🅕
│${setv} ${prefix}listowner 🅕
│${setv} ${prefix}liststicker 🅕
│${setv} ${prefix}listimage 🅕
│${setv} ${prefix}listvideo 🅕
│${setv} ${prefix}listvn 🅕
│${setv} ${prefix}listapk 🅕
│${setv} ${prefix}listzip 🅕
│${setv} ${prefix}listpdf 🅕
│${setv} ${prefix}listbadword 🅕
│${setv} ${prefix}listpc 🅕
│${setv} ${prefix}listgc 🅕
╰─┬────❍
╭─┴❍「 *🖼️ Random Photo* 」❍
│${setv} ${prefix}aesthetic 🅕
│${setv} ${prefix}coffee 🅕
│${setv} ${prefix}wikimedia 🅕
│${setv} ${prefix}wallpaper 🅕
│${setv} ${prefix}art 🅕
│${setv} ${prefix}bts 🅕
│${setv} ${prefix}dogwoof 🅕
│${setv} ${prefix}catmeow 🅕
│${setv} ${prefix}lizardpic 🅕
│${setv} ${prefix}goosebird 🅕
│${setv} ${prefix}8ballpool 🅕
│${setv} ${prefix}cosplay 🅕
│${setv} ${prefix}hacker 🅕
│${setv} ${prefix}cyber 🅕
│${setv} ${prefix}gamewallpaper 🅕
│${setv} ${prefix}islamic 🅕
│${setv} ${prefix}jennie 🅕
│${setv} ${prefix}jiso 🅕
│${setv} ${prefix}satanic 🅕
│${setv} ${prefix}justina 🅕
│${setv} ${prefix}cartoon 🅕
│${setv} ${prefix}pentol 🅕
│${setv} ${prefix}cat 🅕
│${setv} ${prefix}kpop 🅕
│${setv} ${prefix}exo 🅕
│${setv} ${prefix}lisa 🅕
│${setv} ${prefix}space 🅕
│${setv} ${prefix}car 🅕
│${setv} ${prefix}technology 🅕
│${setv} ${prefix}bike 🅕
│${setv} ${prefix}shortquote 🅕
│${setv} ${prefix}antiwork 🅕
│${setv} ${prefix}hacking 🅕
│${setv} ${prefix}boneka 🅕
│${setv} ${prefix}rose 🅕
│${setv} ${prefix}ryujin 🅕
│${setv} ${prefix}ulzzangboy 🅕
│${setv} ${prefix}ulzzanggirl 🅕
│${setv} ${prefix}wallml 🅕
│${setv} ${prefix}wallphone 🅕
│${setv} ${prefix}mountain 🅕
│${setv} ${prefix}goose 🅕
│${setv} ${prefix}profilepic 🅕
│${setv} ${prefix}couplepp 🅕
│${setv} ${prefix}programming 🅕
│${setv} ${prefix}pubg 🅕
│${setv} ${prefix}blackpink 🅕
│${setv} ${prefix}randomboy 🅕  
│${setv} ${prefix}randomgirl 🅕
│${setv} ${prefix}hijab 🅕  
│${setv} ${prefix}chinese 🅕
│${setv} ${prefix}indo 🅕
│${setv} ${prefix}japanese 🅕
│${setv} ${prefix}korean 🅕
│${setv} ${prefix}malay 🅕
│${setv} ${prefix}thai 🅕
│${setv} ${prefix}vietnamese 🅕
╰─┬────❍
╭─┴❍「 *🎥 Random Video* 」❍
│${setv} ${prefix}tiktokgirl 🅕
│${setv} ${prefix}tiktoknukthy 🅕
│${setv} ${prefix}tiktokkayes 🅕
│${setv} ${prefix}tiktokpanrika 🅕
│${setv} ${prefix}tiktoknotnot 🅕
│${setv} ${prefix}tiktokghea 🅕
│${setv} ${prefix}tiktoksantuy 🅕
│${setv} ${prefix}tiktokbocil 🅕
╰─┬────❍
╭─┴❍「 *🔍 Stalker* 」❍
│${setv} ${prefix}tiktokstalk 🅕
│${setv} ${prefix}mlstalk 🅕
│${setv} ${prefix}npmstalk 🅕
│${setv} ${prefix}ghstalk 🅕
│${setv} ${prefix}telestalk 🅕
│${setv} ${prefix}wachannelstalk 🅕
╰─┬────❍
╭─┴❍「 *🤖 OpenAI* 」❍
│${setv} ${prefix}🅕
│${setv} ${prefix}travel-assistant 🅕
│${setv} ${prefix}realistic 🅕
│${setv} ${prefix}mangaimg 🅕
│${setv} ${prefix}animeimg 🅕
│${setv} ${prefix}lexica 🅕
│${setv} ${prefix}chechkgpt 🅕
│${setv} ${prefix}3dmodel 🅕
│${setv} ${prefix}photoleap 🅕
│${setv} ${prefix}chatgpt 🅕
│${setv} ${prefix}darky 🅕
│${setv} ${prefix}bing 🅕
│${setv} ${prefix}mathsai 🅕
│${setv} ${prefix}openai 🅕
│${setv} ${prefix}dalle 🅕
│${setv} ${prefix}stablediffusion 🅕
│${setv} ${prefix}ai 🅕
│${setv} ${prefix}remini 🅕
╰─┬────❍
╭─┴❍「 *🎮 Game* 」❍
│${setv} ${prefix}truth 🅕
│${setv} ${prefix}dare 🅕
│${setv} ${prefix}suit 🅕
│${setv} ${prefix}tictactoe 🅕
│${setv} ${prefix}math 🅕
│${setv} ${prefix}playbomb 🅕
│${setv} ${prefix}casino 🅕
│${setv} ${prefix}rob 🅕
│${setv} ${prefix}slot 🅕
│${setv} ${prefix}dice 🅕 
│${setv} ${prefix}profile 🅕
│${setv} ${prefix}claim 🅕
│${setv} ${prefix}tmoney 🅕
│${setv} ${prefix}tflimit 🅕
╰─┬────❍
╭─┴❍「 *🎭 Fun* 」❍
│${setv} ${prefix}define 🅕
│${setv} ${prefix}readmore 🅕
│${setv} ${prefix}yomamajoke 🅕
│${setv} ${prefix}fact 🅕
│${setv} ${prefix}couple 🅕
│${setv} ${prefix}soulmate 🅕
│${setv} ${prefix}stupidcheck 🅕
│${setv} ${prefix}handsomecheck 🅕
│${setv} ${prefix}uncleancheck 🅕
│${setv} ${prefix}hotcheck 🅕
│${setv} ${prefix}smartcheck 🅕
│${setv} ${prefix}greatcheck 🅕
│${setv} ${prefix}evilcheck 🅕
│${setv} ${prefix}dogcheck 🅕
│${setv} ${prefix}coolcheck 🅕
│${setv} ${prefix}waifucheck 🅕
│${setv} ${prefix}awesomecheck 🅕
│${setv} ${prefix}gaycheck 🅕
│${setv} ${prefix}cutecheck 🅕
│${setv} ${prefix}lesbiancheck 🅕
│${setv} ${prefix}hornycheck 🅕
│${setv} ${prefix}prettycheck 🅕
│${setv} ${prefix}lovelycheck 🅕
│${setv} ${prefix}uglycheck 🅕
│${setv} ${prefix}pick 🅕
│${setv} ${prefix}pickupline 🅕
│${setv} ${prefix}quotes 🅕
│${setv} ${prefix}can 🅕
│${setv} ${prefix}is 🅕
│${setv} ${prefix}when 🅕
│${setv} ${prefix}where 🅕
│${setv} ${prefix}what 🅕
│${setv} ${prefix}how 🅕
│${setv} ${prefix}rate 🅕
│${setv} ${prefix}cry 🅕
│${setv} ${prefix}kill 🅕
│${setv} ${prefix}hug 🅕
│${setv} ${prefix}pat 🅕
│${setv} ${prefix}lick 🅕 
│${setv} ${prefix}kiss 🅕
│${setv} ${prefix}bite 🅕
│${setv} ${prefix}yeet 🅕
│${setv} ${prefix}bully 🅕
│${setv} ${prefix}bonk 🅕
│${setv} ${prefix}wink 🅕
│${setv} ${prefix}poke 🅕
│${setv} ${prefix}nom 🅕
│${setv} ${prefix}slap 🅕
│${setv} ${prefix}smile 🅕 
│${setv} ${prefix}wave 🅕
│${setv} ${prefix}awoo 🅕
│${setv} ${prefix}blush 🅕
│${setv} ${prefix}smug 🅕
│${setv} ${prefix}glomp 🅕 
│${setv} ${prefix}happy 🅕
│${setv} ${prefix}dance 🅕
│${setv} ${prefix}cringe 🅕
│${setv} ${prefix}cuddle 🅕
│${setv} ${prefix}highfive 🅕 
│${setv} ${prefix}handhold 🅕
│${setv} ${prefix}spank 🅕
│${setv} ${prefix}tickle 🅕
│${setv} ${prefix}feed 🅕
│${setv} ${prefix}checkme 🅕
│${setv} ${prefix}sound1 - sound161 🅕
╰─┬────❍
╭─┴❍「 *🖌️ Sticker* 」❍
│${setv} ${prefix}goose 🅕
│${setv} ${prefix}woof 🅕
│${setv} ${prefix}8ball 🅕
│${setv} ${prefix}lizard 🅕
│${setv} ${prefix}meow 🅕
│${setv} ${prefix}gura 🅕
│${setv} ${prefix}telestick 🅕
╰─┬────❍
╭─┴❍「 *🎌 Anime* 」❍
│${setv} ${prefix}searchanime 🅕
│${setv} ${prefix}animeinfo  🅕
│${setv} ${prefix}animeid 🅕
│${setv} ${prefix}animedl 🅕
│${setv} ${prefix}searchmanga 🅕
│${setv} ${prefix}amv 🅕
│${setv} ${prefix}mangainfo 🅕
│${setv} ${prefix}searchchapter 🅕
│${setv} ${prefix}mangachapter 🅕
│${setv} ${prefix}mangachapter2 🅕
│${setv} ${prefix}randommanga 🅕
│${setv} ${prefix}stickhandhold 🅕
│${setv} ${prefix}stickshinobu 🅕
│${setv} ${prefix}stickcuddle 🅕
│${setv} ${prefix}stickhighfive 🅕
│${setv} ${prefix}stickdance 🅕
│${setv} ${prefix}stickcringe 🅕
│${setv} ${prefix}stickhappy 🅕
│${setv} ${prefix}stickglomp 🅕
│${setv} ${prefix}sticksmug 🅕
│${setv} ${prefix}stickblush 🅕
│${setv} ${prefix}stickawoo 🅕
│${setv} ${prefix}stickwave 🅕
│${setv} ${prefix}sticksmile 🅕
│${setv} ${prefix}stickslap 🅕
│${setv} ${prefix}stickpoke 🅕
│${setv} ${prefix}stickwink 🅕
│${setv} ${prefix}stickbonk 🅕
│${setv} ${prefix}stickbully 🅕
│${setv} ${prefix}stickyeet 🅕
│${setv} ${prefix}stickbike 🅕
│${setv} ${prefix}stickkiss 🅕
│${setv} ${prefix}sticklick 🅕
│${setv} ${prefix}stickpat 🅕
│${setv} ${prefix}stickhug 🅕
│${setv} ${prefix}stickkill 🅕
│${setv} ${prefix}stickcry 🅕
│${setv} ${prefix}stickspank 🅕
│${setv} ${prefix}sticktickle 🅕
│${setv} ${prefix}traceanime 🅕
│${setv} ${prefix}akira 🅕
│${setv} ${prefix}akiyama 🅕
│${setv} ${prefix}ana 🅕
│${setv} ${prefix}asuna 🅕
│${setv} ${prefix}ayuzawa 🅕
│${setv} ${prefix}boruto 🅕
│${setv} ${prefix}chiho 🅕
│${setv} ${prefix}chitoge 🅕
│${setv} ${prefix}cosplayloli 🅕
│${setv} ${prefix}cosplaysagiri 🅕
│${setv} ${prefix}deidara 🅕
│${setv} ${prefix}doraemon 🅕
│${setv} ${prefix}elaina 🅕
│${setv} ${prefix}emilia 🅕
│${setv} ${prefix}erza 🅕
│${setv} ${prefix}gremory 🅕
│${setv} ${prefix}hestia 🅕
│${setv} ${prefix}husbu 🅕
│${setv} ${prefix}inori 🅕
│${setv} ${prefix}isuzu 🅕
│${setv} ${prefix}itachi 🅕
│${setv} ${prefix}itori 🅕
│${setv} ${prefix}kaga 🅕
│${setv} ${prefix}kagura 🅕
│${setv} ${prefix}kakasih 🅕
│${setv} ${prefix}kaori 🅕
│${setv} ${prefix}keneki 🅕
│${setv} ${prefix}kotori 🅕
│${setv} ${prefix}kurumi 🅕
│${setv} ${prefix}loli 🅕
│${setv} ${prefix}loli2 🅕
│${setv} ${prefix}madara 🅕
│${setv} ${prefix}megumin 🅕
│${setv} ${prefix}mikasa 🅕
│${setv} ${prefix}mikey 🅕
│${setv} ${prefix}miku 🅕
│${setv} ${prefix}minato 🅕
│${setv} ${prefix}naruto 🅕
│${setv} ${prefix}neko 🅕
│${setv} ${prefix}nekonime 🅕
│${setv} ${prefix}nezuko 🅕
│${setv} ${prefix}onepiece 🅕
│${setv} ${prefix}pokemon 🅕
│${setv} ${prefix}randomnime 🅕
│${setv} ${prefix}randomnime2 🅕
│${setv} ${prefix}rize 🅕
│${setv} ${prefix}sagiri 🅕
│${setv} ${prefix}sakura 🅕
│${setv} ${prefix}sasuke 🅕
│${setv} ${prefix}shina 🅕
│${setv} ${prefix}shinka 🅕
│${setv} ${prefix}shinomiya 🅕
│${setv} ${prefix}shizuka 🅕
│${setv} ${prefix}shota 🅕
│${setv} ${prefix}tejina 🅕
│${setv} ${prefix}toukachan 🅕
│${setv} ${prefix}tsunade 🅕
│${setv} ${prefix}waifu 🅕
│${setv} ${prefix}waifu2 🅕
│${setv} ${prefix}animewall 🅕
│${setv} ${prefix}yotsuba 🅕
│${setv} ${prefix}yuki 🅕
│${setv} ${prefix}yulibocil 🅕
│${setv} ${prefix}yumeko 🅕
│${setv} ${prefix}8ball 🅕
│${setv} ${prefix}animeawoo 🅕
│${setv} ${prefix}animemegumin 🅕
│${setv} ${prefix}animeshinobu 🅕
│${setv} ${prefix}animehandhold 🅕
│${setv} ${prefix}animehighfive 🅕
│${setv} ${prefix}animecringe 🅕
│${setv} ${prefix}animedance 🅕
│${setv} ${prefix}animehappy 🅕
│${setv} ${prefix}animeglomp 🅕
│${setv} ${prefix}animeblush 🅕
│${setv} ${prefix}animesmug 🅕
│${setv} ${prefix}animewave 🅕
│${setv} ${prefix}animesmille 🅕
│${setv} ${prefix}animepoke 🅕
│${setv} ${prefix}animewink 🅕
│${setv} ${prefix}animebonk 🅕
│${setv} ${prefix}animebully 🅕
│${setv} ${prefix}animeyeet 🅕
│${setv} ${prefix}animebite 🅕
│${setv} ${prefix}animelick 🅕
│${setv} ${prefix}animekill 🅕
│${setv} ${prefix}animecry 🅕
│${setv} ${prefix}animewlp 🅕
│${setv} ${prefix}animekiss 🅕
│${setv} ${prefix}animehug 🅕
│${setv} ${prefix}animeneko 🅕
│${setv} ${prefix}animepat 🅕
│${setv} ${prefix}animeslap 🅕
│${setv} ${prefix}animecuddle 🅕
│${setv} ${prefix}animewaifu 🅕
│${setv} ${prefix}animenom 🅕
│${setv} ${prefix}animefoxgirl 🅕
│${setv} ${prefix}animegecg 🅕
│${setv} ${prefix}animetickle 🅕
│${setv} ${prefix}animefeed 🅕
│${setv} ${prefix}animeavatar 🅕
│${setv} ${prefix}anime 🅕
│${setv} ${prefix}avatar 🅕
│${setv} ${prefix}shinobu 🅕
│${setv} ${prefix}fox_girl 🅕
│${setv} ${prefix}gecg 🅕 
╰─┬────❍
╭─┴❍「 *Anime NSFW* 」❍
│ *_Sorry USERS_*
│ > NO NSFW MENU AVAILABLE
╰─┬────❍
╭─┴❍「 *💾 Database* 」❍
│${setv} ${prefix}setcmd 🅞
│${setv} ${prefix}delcmd 🅞
│${setv} ${prefix}listcmd 🅕
│${setv} ${prefix}lockcmd 🅞
│${setv} ${prefix}addmsg 🅞
│${setv} ${prefix}delmsg 🅞
│${setv} ${prefix}getmsg 🅕
│${setv} ${prefix}listmsg 🅕
╰─┬────❍
╭─┴❍「 *🛍️ Store* 」❍
│${setv} ${prefix}list 🅕
│${setv} ${prefix}store 🅕
│${setv} ${prefix}shop 🅕
│${setv} ${prefix}addlist 🅞
│${setv} ${prefix}dellist 🅞
╰─┬────❍
╭─┴❍「 *🛐 Religon* 」❍
│${setv} ${prefix}bible 🅕
│${setv} ${prefix}quran 🅕
│${setv} ${prefix}gita 🅕
│${setv} ${prefix}namazchk 🅕
│${setv} ${prefix}prophetname 🅕
│${setv} ${prefix}prayertime 🅕
│${setv} ${prefix}sahihbukhari 🅕
│${setv} ${prefix}jamiattirmidhi 🅕
│${setv} ${prefix}sunanannasai 🅕
│${setv} ${prefix}sunanibnmajah 🅕
│${setv} ${prefix}sunanabudawud 🅕
│${setv} ${prefix}kisahnabi 🅕
│${setv} ${prefix}asmaulhusna 🅕
│${setv} ${prefix}duas 🅕
│${setv} ${prefix}namaz 🅕
│${setv} ${prefix}masnoonduas 🅕
│${setv} ${prefix}ayatalkursi 🅕
│${setv} ${prefix}niyatnamaz 🅕
│${setv} ${prefix}quotesislami 🅕
│${setv} ${prefix}assalamualaikum 🅕
╰─┬────❍
╭─┴❍「 *⚙️ Other* 」❍
│${setv} ${prefix}update 🅕
│${setv} ${prefix}cricket 🅕
│${setv} ${prefix}score 🅕
│${setv} ${prefix}ping 🅕
│${setv} ${prefix}menu 🅕
│${setv} ${prefix}myip 🅕
│${setv} ${prefix}repo 🅕
│${setv} ${prefix}reportbug 🅕
│${setv} ${prefix}idgroup 🅕
│${setv} ${prefix}owner 🅕
│${setv} ${prefix}rentbot 🅕
│${setv} ${prefix}donate 🅕
│${setv} ${prefix}runtime 🅕
│${setv} ${prefix}confess 🅕
│${setv} ${prefix}react 🅕
│${setv} ${prefix}q 🅕
│${setv} ${prefix}inspect 🅕
│${setv} ${prefix}tagme 🅕
│${setv} ${prefix}nowa 🅕
│${setv} ${prefix}truecaller 🅕
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'ownermenu': {
let xmenu_oh = `
╭───❍「 *🤖 GREETING* 」
│ ✨ *Hi!* 👋
│ 🏷️ *Name* : ${m.pushName || 'No Name'}
│ 🎉 *${pappyytimewisher}* 😄
╰─┬───────❍ ${readmore}
╭─┴──❍「 *🅞 GUIDE* 」❍
│ 👑 *For Owner* = 🅞
│ 💸 *For Free User* = 🅕
│ 🌟 *For Premium User* = 🅟
╰──┬──────❍
╭──┴─❍「 *👑 OWNER MENU* 」❍
│${setv} ${prefix}delsession 🅞
│${setv} ${prefix}update-repo 🅞
│ ${setv} ${prefix}addbadword 🅞
│ ${setv} ${prefix}delbadword 🅞
│ ${setv} ${prefix}autoread 🅞
│ ${setv} ${prefix}autobio 🅞
│ ${setv} ${prefix}autotype 🅞
│ ${setv} ${prefix}unavailable 🅞
│ ${setv} ${prefix}autorecord 🅞
│ ${setv} ${prefix}autorecordtype 🅞
│ ${setv} ${prefix}autoswview 🅞
│ ${setv} ${prefix}setautoblock 🅞
│ ${setv} ${prefix}setantiforeign 🅞
│ ${setv} ${prefix}autoblock 🅞
│ ${setv} ${prefix}onlygc 🅞
│ ${setv} ${prefix}onlypc 🅞
│ ${setv} ${prefix}onlyindia 🅞
│ ${setv} ${prefix}onlyindo 🅞
│ ${setv} ${prefix}anticall 🅞
│ ${setv} ${prefix}self 🅞
│ ${setv} ${prefix}public 🅞
│ ${setv} ${prefix}join 🅞
│ ${setv} ${prefix}poll 🅞
│ ${setv} ${prefix}spam 🅞
│ ${setv} ${prefix}bc 🅞
│ ${setv} ${prefix}bcgroup 🅞
│ ${setv} ${prefix}setmenu 🅞
│ ${setv} ${prefix}setimgmenu 🅞
│ ${setv} ${prefix}setvidmenu 🅞
│ ${setv} ${prefix}setgifmenu 🅞
│ ${setv} ${prefix}setreply 🅞
│ ${setv} ${prefix}resethit 🅞
│ ${setv} ${prefix}resetuser 🅞
│ ${setv} ${prefix}creategc 🅞
│ ${setv} ${prefix}setexif 🅞
│ ${setv} ${prefix}getexif 🅞
│ ${setv} ${prefix}getautoblocknumber 🅞
│ ${setv} ${prefix}getantiforeignnumber 🅞
│ ${setv} ${prefix}userjid 🅞
│ ${setv} ${prefix}setbotbio 🅞
│ ${setv} ${prefix}delppbot 🅞
│ ${setv} ${prefix}shutdown 🅞
│ ${setv} ${prefix}setppbot 🅞
│ ${setv} ${prefix}addprem 🅞
│ ${setv} ${prefix}delprem 🅞
│ ${setv} ${prefix}addowner 🅞
│ ${setv} ${prefix}delowner 🅞
│ ${setv} ${prefix}addvn 🅞
│ ${setv} ${prefix}addapk 🅞
│ ${setv} ${prefix}addzip 🅞
│ ${setv} ${prefix}addpdf 🅞
│ ${setv} ${prefix}delapk 🅞
│ ${setv} ${prefix}delzip 🅞
│ ${setv} ${prefix}delpdf 🅞
│ ${setv} ${prefix}delvn 🅞
│ ${setv} ${prefix}addsticker 🅞
│ ${setv} ${prefix}delsticker 🅞
│ ${setv} ${prefix}addimage 🅞
│ ${setv} ${prefix}delimage 🅞
│ ${setv} ${prefix}addvideo 🅞
│ ${setv} ${prefix}delvideo 🅞
│ ${setv} ${prefix}upswtext 🅞
│ ${setv} ${prefix}upswvideo 🅞
│ ${setv} ${prefix}upswimage 🅞
│ ${setv} ${prefix}upswaudio 🅞
│ ${setv} ${prefix}autosticker 🅞
│ ${setv} ${prefix}block 🅞
│ ${setv} ${prefix}unblock 🅞
│ ${setv} ${prefix}leavegc 🅞
│ ${setv} ${prefix}pushcontact 🅞
│ ${setv} ${prefix}pushcontactv2 🅞
│ ${setv} ${prefix}pushcontactv3 🅞
│ ${setv} ${prefix}jpm 🅞
│ ${setv} ${prefix}checkmember 🅞
│ ${setv} ${prefix}post 🅞
│ ${setv} ${prefix}clearchat 🅞
│ ${setv} ${prefix}setprefix 🅞
│ ${setv} $ 🅞
│ ${setv} > 🅞
│ ${setv} < 🅞
╰───────────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'groupmenu': {
let xmenu_oh = `
╭──❍「 🤖 GREETING 」❍
│ ✨ Hi! 👋
│ 🏷️ Name : ${m.pushName || 'No Name'}
│ 🎉 ${pappyytimewisher} 😄
╰─┬────❍ ${readmore}
╭─┴❍「 🅞 GUIDE 」❍
│ *👑 For Owner* = 🅞
│ *💸 For Free User* = 🅕
│ *🌟 For Premium User* = 🅟
| *🛡️ For Group* = 🅖 
╰─┬────❍
╭─┴❍「 🛡️ GROUP 」❍
│ ${setv} ${prefix}antibot 🅖
│ ${setv} ${prefix}antiviewonce 🅖
│ ${setv} ${prefix}readviewonce 🅖
│ ${setv} ${prefix}welcome 🅖
│ ${setv} ${prefix}adminevent 🅖
│ ${setv} ${prefix}groupevent 🅖
│ ${setv} ${prefix}antiforeign 🅖
│ ${setv} ${prefix}antimedia 🅖
│ ${setv} ${prefix}antiaudio 🅖
│ ${setv} ${prefix}antivideo 🅖
│ ${setv} ${prefix}antiimage 🅖
│ ${setv} ${prefix}antidocument 🅖
│ ${setv} ${prefix}antilocation 🅖
│ ${setv} ${prefix}anticontact 🅖
│ ${setv} ${prefix}antisticker 🅖
│ ${setv} ${prefix}antipoll 🅖
│ ${setv} ${prefix}antilink 🅖
│ ${setv} ${prefix}antipromotion 🅖
│ ${setv} ${prefix}antivirtex 🅖
│ ${setv} ${prefix}grouplink 🅖
│ ${setv} ${prefix}listadmin 🅖
│ ${setv} ${prefix}invite 🅖
│ ${setv} ${prefix}ephemeral 🅖
│ ${setv} ${prefix}delete 🅖
│ ${setv} ${prefix}setppgroup 🅖
│ ${setv} ${prefix}delppgroup 🅖
│ ${setv} ${prefix}setnamegc 🅖
│ ${setv} ${prefix}setdesc 🅖
│ ${setv} ${prefix}add 🅖
│ ${setv} ${prefix}kick 🅖
│ ${setv} ${prefix}promote 🅖
│ ${setv} ${prefix}demote 🅖
│ ${setv} ${prefix}kickall 🅖
│ ${setv} ${prefix}promoteall 🅖
│ ${setv} ${prefix}demoteall 🅖
│ ${setv} ${prefix}getcontact 🅞
│ ${setv} ${prefix}savecontact 🅞
│ ${setv} ${prefix}sendcontact 🅞
│ ${setv} ${prefix}contactag 🅞
│ ${setv} ${prefix}hidetag 🅖
│ ${setv} ${prefix}totag 🅖
│ ${setv} ${prefix}tagall 🅖
│ ${setv} ${prefix}editinfo 🅖
│ ${setv} ${prefix}opentime 🅖
│ ${setv} ${prefix}closetime 🅖
│ ${setv} ${prefix}resetlink 🅖
│ ${setv} ${prefix}getbio 🅖
│ ${setv} ${prefix}vote 🅖
│ ${setv} ${prefix}upvote 🅖
│ ${setv} ${prefix}downvote 🅖
│ ${setv} ${prefix}checkvote 🅖
│ ${setv} ${prefix}delvote 🅖
│ ${setv} ${prefix}antivirus 🅖
│ ${setv} ${prefix}antibadword 🅖
│ ${setv} ${prefix}nsfw 🅖
│ ${setv} ${prefix}react 🅖
│ ${setv} ${prefix}getjoinrequest 🅖
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'searchmenu': {
let xmenu_oh = `
╭──❍「 *GREETING* 」❍
├ *Hi* 👋✨
├ *${m.pushName}* 🏷️
├ *${pappyytimewisher}* 😄🎉
╰─┬────❍ ${readmore}
╭─┴❍「 *GUIDE* 」❍
├ *👑 For Owner* = 🅞 
├ *💸 For Free User* = 🅕 
├ *🌟 For Premium User* = 🅟 
╰─┬────❍
╭─┴❍「 *🔍 Search* 」❍
│${setv} ${prefix}google 🅕
│${setv} ${prefix}wikipedia 🅕
│${setv} ${prefix}ytsearch 🅕
│${setv} ${prefix}apksearch 🅕
│${setv} ${prefix}stickersearch 🅕
│${setv} ${prefix}imdb 🅕
│${setv} ${prefix}wanumber 🅕
│${setv} ${prefix}friend 🅕
│${setv} ${prefix}lyrics 🅕
│${setv} ${prefix}pixiv 🅕
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'downloadmenu': {
let xmenu_oh = `
╭──❍「 🤖 GREETING 」❍
│ ✨ Hi! 👋
│ 🏷️ Name : ${m.pushName}
│ 🎉 ${pappyytimewisher} 😄
╰─┬────❍ ${readmore}
╭─┴❍「 🅞 GUIDE 」❍
│ *👑 For Owner* = 🅞
│ *💸 For Free User* = 🅕
│ *🌟 For Premium User* = 🅟
╰─┬────❍
╭─┴❍「 🛡️ DOWNLOAD 」❍
│${setv} ${prefix}itunes 🅕
│${setv} ${prefix}play 🅕
│${setv} ${prefix}play2 🅕
│${setv} ${prefix}ytplay - termux 🅕
│${setv} ${prefix}ytmp3 - termux 🅕
│${setv} ${prefix}ytmp4 - termux 🅕
│${setv} ${prefix}yta 🅕
│${setv} ${prefix}ytv 🅕
│${setv} ${prefix}yta2 🅕
│${setv} ${prefix}ytv2 🅕
│${setv} ${prefix}image 🅕
│${setv} ${prefix}gimage 🅕
│${setv} ${prefix}live-wallpaper 🅕
│${setv} ${prefix}tiktok 🅕
│${setv} ${prefix}tiktokaudio 🅕
│${setv} ${prefix}tiktokvideo 🅕
│${setv} ${prefix}likee 🅕
│${setv} ${prefix}capcut 🅕
│${setv} ${prefix}instagram 🅕
│${setv} ${prefix}igimg 🅕
│${setv} ${prefix}facebook 🅕
│${setv} ${prefix}twitter 🅕
│${setv} ${prefix}apk 🅕
│${setv} ${prefix}bilibili 🅕
│${setv} ${prefix}dailymotion 🅕
│${setv} ${prefix}mega 🅕
│${setv} ${prefix}mediafire 🅕
│${setv} ${prefix}searchsoundcloud 🅕
│${setv} ${prefix}soundcloud 🅕
│${setv} ${prefix}google 🅕
│${setv} ${prefix}gimage 🅕
│${setv} ${prefix}weather 🅕
│${setv} ${prefix} 🅟
│${setv} ${prefix}gitclone 🅕
│${setv} ${prefix}happymod 🅕
│${setv} ${prefix}gdrive 🅕
│${setv} ${prefix}pinterest 🅕
│${setv} ${prefix}pindl 🅕
│${setv} ${prefix}ringtone 🅕
│${setv} ${prefix}autodownload 🅞
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break


case 'toolmenu': {
let xmenu_oh = `
╭──❍「 🤖 GREETING 」❍
│ ✨ Hi! 👋
│ 🏷️ Name : ${m.pushName}
│ 🎉 ${pappyytimewisher} 😄
╰─┬────❍ ${readmore}
╭─┴❍「 🅞 GUIDE 」❍
│ *👑 For Owner* = 🅞
│ *💸 For Free User* = 🅕
│ *🌟 For Premium User* = 🅟
╰─┬────❍
╭─┴❍「 🛠️ TOOL MENU 」❍
│${setv} ${prefix}obfuscate 🅕
│${setv} ${prefix}styletext 🅕
│${setv} ${prefix}fliptext 🅕
│${setv} ${prefix}tts 🅕
│${setv} ${prefix}say 🅕
│${setv} ${prefix}togif 🅕
│${setv} ${prefix}toqr 🅕
│${setv} ${prefix}bass 🅕
│${setv} ${prefix}blown 🅕
│${setv} ${prefix}deep 🅕
│${setv} ${prefix}earrape 🅕
│${setv} ${prefix}fast 🅕
│${setv} ${prefix}fat 🅕
│${setv} ${prefix}nightcore 🅕
│${setv} ${prefix}reverse 🅕
│${setv} ${prefix}robot 🅕
│${setv} ${prefix}slow 🅕
│${setv} ${prefix}smooth 🅕
│${setv} ${prefix}squirrel 🅕
│${setv} ${prefix}tinyurl 🅕
│${setv} ${prefix}tovn 🅕
│${setv} ${prefix}toptv 🅕
│${setv} ${prefix}toaudio 🅕
│${setv} ${prefix}tomp3 🅕
│${setv} ${prefix}tomp4🅕
│${setv} ${prefix}toimg 🅕
│${setv} ${prefix}toonce 🅕
│${setv} ${prefix}toptv 🅕
│${setv} ${prefix}sticker 🅕
│${setv} ${prefix}smeme 🅕
│${setv} ${prefix}smeta 🅕
│${setv} ${prefix}take 🅟
│${setv} ${prefix}emojimix 🅕
│${setv} ${prefix}volaudio 🅕
│${setv} ${prefix}volvideo 🅕
│${setv} ${prefix}ebinary 🅕
│${setv} ${prefix}dbinary 🅕
│${setv} ${prefix}ssweb 🅕
│${setv} ${prefix}quoted 🅕
│${setv} ${prefix}translate 🅕
│${setv} ${prefix}get 🅕
│${setv} ${prefix}tourl 🅕
│${setv} ${prefix}write 🅕
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'listmenu': {
let xmenu_oh = `
╭──❍「 🤖 GREETING 」❍
│ ✨ Hi! 👋
│ 🏷️ Name : ${m.pushName}
│ 🎉 ${pappyytimewisher} 😄
╰─┬────❍ ${readmore}
╭─┴❍「 🅞 GUIDE 」❍
│ *👑 For Owner* = 🅞
│ *💸 For Free User* = 🅕
│ *🌟 For Premium User* = 🅟
╰─┬────❍
╭─┴❍「 📋 LIST MENU 」❍
│${setv} ${prefix}listprem 🅕
│${setv} ${prefix}listowner 🅕
│${setv} ${prefix}liststicker 🅕
│${setv} ${prefix}listimage 🅕
│${setv} ${prefix}listvideo 🅕
│${setv} ${prefix}listvn 🅕
│${setv} ${prefix}listapk 🅕
│${setv} ${prefix}listzip 🅕
│${setv} ${prefix}listpdf 🅕
│${setv} ${prefix}listbadword 🅕
│${setv} ${prefix}listpc 🅕
│${setv} ${prefix}listgc 🅕
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'randomphotomenu': {
let xmenu_oh = `
╭──❍「 🤖 GREETING 」❍
│ ✨ Hi! 👋
│ 🏷️ Name : ${m.pushName}
│ 🎉 ${pappyytimewisher} 😄
╰─┬────❍ ${readmore}
╭─┴❍「 🅞 GUIDE 」❍
│ *👑 For Owner* = 🅞
│ *💸 For Free User* = 🅕
│ *🌟 For Premium User* = 🅟
╰─┬────❍
╭─┴❍「 📋 LIST MENU 」❍
│${setv} ${prefix}aesthetic 🅕
│${setv} ${prefix}coffee 🅕
│${setv} ${prefix}wikimedia 🅕
│${setv} ${prefix}wallpaper 🅕
│${setv} ${prefix}art 🅕
│${setv} ${prefix}bts 🅕
│${setv} ${prefix}dogwoof 🅕
│${setv} ${prefix}catmeow 🅕
│${setv} ${prefix}lizardpic 🅕
│${setv} ${prefix}goosebird 🅕
│${setv} ${prefix}8ballpool 🅕
│${setv} ${prefix}cosplay 🅕
│${setv} ${prefix}hacker 🅕
│${setv} ${prefix}cyber 🅕
│${setv} ${prefix}gamewallpaper 🅕
│${setv} ${prefix}islamic 🅕
│${setv} ${prefix}jennie 🅕
│${setv} ${prefix}jiso 🅕
│${setv} ${prefix}satanic 🅕
│${setv} ${prefix}justina 🅕
│${setv} ${prefix}cartoon 🅕
│${setv} ${prefix}pentol 🅕
│${setv} ${prefix}cat 🅕
│${setv} ${prefix}kpop 🅕
│${setv} ${prefix}exo 🅕
│${setv} ${prefix}lisa 🅕
│${setv} ${prefix}space 🅕
│${setv} ${prefix}car 🅕
│${setv} ${prefix}technology 🅕
│${setv} ${prefix}bike 🅕
│${setv} ${prefix}shortquote 🅕
│${setv} ${prefix}antiwork 🅕
│${setv} ${prefix}hacking 🅕
│${setv} ${prefix}boneka 🅕
│${setv} ${prefix}rose 🅕
│${setv} ${prefix}ryujin 🅕
│${setv} ${prefix}ulzzangboy 🅕
│${setv} ${prefix}ulzzanggirl 🅕
│${setv} ${prefix}wallml 🅕
│${setv} ${prefix}wallphone 🅕
│${setv} ${prefix}mountain 🅕
│${setv} ${prefix}goose 🅕
│${setv} ${prefix}profilepic 🅕
│${setv} ${prefix}couplepp 🅕
│${setv} ${prefix}programming 🅕
│${setv} ${prefix}pubg 🅕
│${setv} ${prefix}blackpink 🅕
│${setv} ${prefix}randomboy 🅕  
│${setv} ${prefix}randomgirl 🅕
│${setv} ${prefix}hijab 🅕  
│${setv} ${prefix}chinese 🅕
│${setv} ${prefix}indo 🅕
│${setv} ${prefix}japanese 🅕
│${setv} ${prefix}korean 🅕
│${setv} ${prefix}malay 🅕
│${setv} ${prefix}thai 🅕
│${setv} ${prefix}vietnamese 🅕
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'randomvideomenu': {
let xmenu_oh = `
╭──❍「 🤖 GREETING 」❍
│ ✨ Hi! 👋
│ 🏷️ Name : ${m.pushName}
│ 🎉 ${pappyytimewisher} 😄
╰─┬────❍ ${readmore}
╭─┴❍「 🅞 GUIDE 」❍
│ *👑 For Owner* = 🅞
│ *💸 For Free User* = 🅕
│ *🌟 For Premium User* = 🅟
╰─┬────❍
╭─┴❍「 🎥 RANDOM VIDEO 」❍
│${setv} ${prefix}tiktokgirl 🅕
│${setv} ${prefix}tiktoknukthy 🅕
│${setv} ${prefix}tiktokkayes 🅕
│${setv} ${prefix}tiktokpanrika 🅕
│${setv} ${prefix}tiktoknotnot 🅕
│${setv} ${prefix}tiktokghea 🅕
│${setv} ${prefix}tiktoksantuy 🅕
│${setv} ${prefix}tiktokbocil 🅕
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'stalkermenu': {
let xmenu_oh = `
╭──❍「 🤖 GREETING 」❍
│ ✨ Hi! 👋
│ 🏷️ Name : ${m.pushName}
│ 🎉 ${pappyytimewisher} 😄
╰─┬────❍ ${readmore}
╭─┴❍「 🅞 GUIDE 」❍
│ *👑 For Owner* = 🅞
│ *💸 For Free User* = 🅕
│ *🌟 For Premium User* = 🅟
╰─┬────❍
╭─┴❍「 🎥 RANDOM VIDEO 」❍
│${setv} ${prefix}tiktokstalk 🅕
│${setv} ${prefix}mlstalk 🅕
│${setv} ${prefix}npmstalk 🅕
│${setv} ${prefix}ghstalk 🅕
│${setv} ${prefix}telestalk 🅕
│${setv} ${prefix}wachannelstalk 🅕
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'aimenu': {
let xmenu_oh = `
╭──❍「 🤖 GREETING 」❍
│ ✨ Hi! 👋
│ 🏷️ Name : ${m.pushName}
│ 🎉 ${pappyytimewisher} 😄
╰─┬────❍ ${readmore}
╭─┴❍「 🅞 GUIDE 」❍
│ *👑 For Owner* = 🅞
│ *💸 For Free User* = 🅕
│ *🌟 For Premium User* = 🅟
╰─┬────❍
╭─┴❍「 🧠 OpenAI 」❍
│${setv} ${prefix}blackboxai 🅕
│${setv} ${prefix}travel-assistant 🅕
│${setv} ${prefix}realistic 🅕
│${setv} ${prefix}mangaimg 🅕
│${setv} ${prefix}animeimg 🅕
│${setv} ${prefix}lexica 🅕
│${setv} ${prefix}chechkgpt 🅕
│${setv} ${prefix}3dmodel 🅕
│${setv} ${prefix}photoleap 🅕
│${setv} ${prefix}chatgpt4 🅕
│${setv} ${prefix}darky 🅕
│${setv} ${prefix}bing 🅕
│${setv} ${prefix}mathsai 🅕
│${setv} ${prefix}openai 🅕
│${setv} ${prefix}dalle 🅕
│${setv} ${prefix}stablediffusion 🅕
│${setv} ${prefix}ai 🅕
│${setv} ${prefix}remini 🅕
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'gamemenu': {
let xmenu_oh = `
╭──❍「 🤖 GREETING 」❍
│ ✨ Hi! 👋
│ 🏷️ Name : ${m.pushName}
│ 🎉 ${pappyytimewisher} 😄
╰─┬────❍ ${readmore}
╭─┴❍「 🅞 GUIDE 」❍
│ *👑 For Owner* = 🅞
│ *💸 For Free User* = 🅕
│ *🌟 For Premium User* = 🅟
╰─┬────❍
╭─┴❍「 🧠 GAME 」❍
│${setv} ${prefix}truth 🅕
│${setv} ${prefix}dare 🅕
│${setv} ${prefix}suit 🅕
│${setv} ${prefix}tictactoe 🅕
│${setv} ${prefix}math 🅕
│${setv} ${prefix}playbomb 🅕
│${setv} ${prefix}casino 🅕
│${setv} ${prefix}rob 🅕
│${setv} ${prefix}slot 🅕
│${setv} ${prefix}dice 🅕 
│${setv} ${prefix} profile 🅕
│${setv} ${prefix} claim 🅕
│${setv} ${prefix} tmoney 🅕
│${setv} ${prefix} tflimit 🅕
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break


case 'funmenu': {
let xmenu_oh = `
╭──❍「 🤖 GREETING 」❍
│ ✨ Hi! 👋
│ 🏷️ Name : ${m.pushName}
│ 🎉 ${pappyytimewisher} 😄
╰─┬────❍ ${readmore}
╭─┴❍「 🅞 GUIDE 」❍
│ *👑 For Owner* = 🅞
│ *💸 For Free User* = 🅕
│ *🌟 For Premium User* = 🅟
╰─┬────❍
╭─┴❍「 🎉 Fun 」❍
│${setv} ${prefix}define 🅕
│${setv} ${prefix}readmore 🅕
│${setv} ${prefix}yomamajoke 🅕
│${setv} ${prefix}fact 🅕
│${setv} ${prefix}couple 🅕
│${setv} ${prefix}soulmate 🅕
│${setv} ${prefix}stupidcheck 🅕
│${setv} ${prefix}handsomecheck 🅕
│${setv} ${prefix}uncleancheck 🅕
│${setv} ${prefix}hotcheck 🅕
│${setv} ${prefix}smartcheck 🅕
│${setv} ${prefix}greatcheck 🅕
│${setv} ${prefix}evilcheck 🅕
│${setv} ${prefix}dogcheck 🅕
│${setv} ${prefix}coolcheck 🅕
│${setv} ${prefix}waifucheck 🅕
│${setv} ${prefix}awesomecheck 🅕
│${setv} ${prefix}gaycheck 🅕
│${setv} ${prefix}cutecheck 🅕
│${setv} ${prefix}lesbiancheck 🅕
│${setv} ${prefix}hornycheck 🅕
│${setv} ${prefix}prettycheck 🅕
│${setv} ${prefix}lovelycheck 🅕
│${setv} ${prefix}uglycheck 🅕
│${setv} ${prefix}pick 🅕
│${setv} ${prefix}pickupline 🅕
│${setv} ${prefix}quotes 🅕
│${setv} ${prefix}can 🅕
│${setv} ${prefix}is 🅕
│${setv} ${prefix}when 🅕
│${setv} ${prefix}where 🅕
│${setv} ${prefix}what 🅕
│${setv} ${prefix}how 🅕
│${setv} ${prefix}rate 🅕
│${setv} ${prefix}cry 🅕
│${setv} ${prefix}kill 🅕
│${setv} ${prefix}hug 🅕
│${setv} ${prefix}pat 🅕
│${setv} ${prefix}lick 🅕 
│${setv} ${prefix}kiss 🅕
│${setv} ${prefix}bite 🅕
│${setv} ${prefix}yeet 🅕
│${setv} ${prefix}bully 🅕
│${setv} ${prefix}bonk 🅕
│${setv} ${prefix}wink 🅕
│${setv} ${prefix}poke 🅕
│${setv} ${prefix}nom 🅕
│${setv} ${prefix}slap 🅕
│${setv} ${prefix}smile 🅕 
│${setv} ${prefix}wave 🅕
│${setv} ${prefix}awoo 🅕
│${setv} ${prefix}blush 🅕
│${setv} ${prefix}smug 🅕
│${setv} ${prefix}glomp 🅕 
│${setv} ${prefix}happy 🅕
│${setv} ${prefix}dance 🅕
│${setv} ${prefix}cringe 🅕
│${setv} ${prefix}cuddle 🅕
│${setv} ${prefix}highfive 🅕 
│${setv} ${prefix}handhold 🅕
│${setv} ${prefix}spank 🅕
│${setv} ${prefix}tickle 🅕
│${setv} ${prefix}feed 🅕
│${setv} ${prefix}checkme 🅕
│${setv} ${prefix}sound1 - sound161 🅕
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'stickermenu': {
let xmenu_oh = `
╭──❍「 🤖 GREETING 」❍
│ ✨ Hi! 👋
│ 🏷️ Name : ${m.pushName}
│ 🎉 ${pappyytimewisher} 😄
╰─┬────❍ ${readmore}
╭─┴❍「 🅞 GUIDE 」❍
│ *👑 For Owner* = 🅞
│ *💸 For Free User* = 🅕
│ *🌟 For Premium User* = 🅟
╰─┬────❍
╭─┴❍「 🖼️ Sticker 」❍
│${setv} ${prefix}goose 🅕
│${setv} ${prefix}woof 🅕
│${setv} ${prefix}8ball 🅕
│${setv} ${prefix}lizard 🅕
│${setv} ${prefix}meow 🅕
│${setv} ${prefix}gura 🅕
│${setv} ${prefix}telestick 🅕
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'animemenu': {
let xmenu_oh = `
╭──❍「 🤖 *GREETING* 」❍
│ ✨ *Hi!* 👋
│ 🏷️ *Name :* ${m.pushName}
│ 🎉 ${pappyytimewisher} 😄
╰─┬────❍ ${readmore}
╭─┴❍「 🅞 *GUIDE* 」❍
│ *👑 For Owner* = 🅞
│ *💸 For Free User* = 🅕
│ *🌟 For Premium User* = 🅟
╰─┬────❍
╭─┴❍「 🌸 *Anime* 」❍
│${setv} ${prefix}searchanime 🅕
│${setv} ${prefix}animeinfo 🅕
│${setv} ${prefix}animeid 🅕
│${setv} ${prefix}animedl 🅕
│${setv} ${prefix}mangainfo 🅕
│${setv} ${prefix}searchchapter 🅕
│${setv} ${prefix}mangachapter 🅕
│${setv} ${prefix}mangachapter2 🅕
│${setv} ${prefix}randommanga 🅕
│${setv} ${prefix}amv 🅕
│${setv} ${prefix}stickhandhold 🅕
│${setv} ${prefix}stickshinobu 🅕
│${setv} ${prefix}stickcuddle 🅕
│${setv} ${prefix}stickhighfive 🅕
│${setv} ${prefix}stickdance 🅕
│${setv} ${prefix}stickcringe 🅕
│${setv} ${prefix}stickhappy 🅕
│${setv} ${prefix}stickglomp 🅕
│${setv} ${prefix}sticksmug 🅕
│${setv} ${prefix}stickblush 🅕
│${setv} ${prefix}stickawoo 🅕
│${setv} ${prefix}stickwave 🅕
│${setv} ${prefix}sticksmile 🅕
│${setv} ${prefix}stickslap 🅕
│${setv} ${prefix}stickpoke 🅕
│${setv} ${prefix}stickwink 🅕
│${setv} ${prefix}stickbonk 🅕
│${setv} ${prefix}stickbully 🅕
│${setv} ${prefix}stickyeet 🅕
│${setv} ${prefix}stickbike 🅕
│${setv} ${prefix}stickkiss 🅕
│${setv} ${prefix}sticklick 🅕
│${setv} ${prefix}stickpat 🅕
│${setv} ${prefix}stickhug 🅕
│${setv} ${prefix}stickkill 🅕
│${setv} ${prefix}stickcry 🅕
│${setv} ${prefix}stickspank 🅕
│${setv} ${prefix}sticktickle 🅕
│${setv} ${prefix}traceanime 🅕
│${setv} ${prefix}akira 🅕
│${setv} ${prefix}akiyama 🅕
│${setv} ${prefix}ana 🅕
│${setv} ${prefix}asuna 🅕
│${setv} ${prefix}ayuzawa 🅕
│${setv} ${prefix}boruto 🅕
│${setv} ${prefix}chiho 🅕
│${setv} ${prefix}chitoge 🅕
│${setv} ${prefix}cosplayloli 🅕
│${setv} ${prefix}cosplaysagiri 🅕
│${setv} ${prefix}deidara 🅕
│${setv} ${prefix}doraemon 🅕
│${setv} ${prefix}elaina 🅕
│${setv} ${prefix}emilia 🅕
│${setv} ${prefix}erza 🅕
│${setv} ${prefix}gremory 🅕
│${setv} ${prefix}hestia 🅕
│${setv} ${prefix}husbu 🅕
│${setv} ${prefix}inori 🅕
│${setv} ${prefix}isuzu 🅕
│${setv} ${prefix}itachi 🅕
│${setv} ${prefix}itori 🅕
│${setv} ${prefix}kaga 🅕
│${setv} ${prefix}kagura 🅕
│${setv} ${prefix}kakasih 🅕
│${setv} ${prefix}kaori 🅕
│${setv} ${prefix}keneki 🅕
│${setv} ${prefix}kotori 🅕
│${setv} ${prefix}kurumi 🅕
│${setv} ${prefix}loli 🅕
│${setv} ${prefix}loli2 🅕
│${setv} ${prefix}madara 🅕
│${setv} ${prefix}megumin 🅕
│${setv} ${prefix}mikasa 🅕
│${setv} ${prefix}mikey 🅕
│${setv} ${prefix}miku 🅕
│${setv} ${prefix}minato 🅕
│${setv} ${prefix}naruto 🅕
│${setv} ${prefix}neko 🅕
│${setv} ${prefix}nekonime 🅕
│${setv} ${prefix}nezuko 🅕
│${setv} ${prefix}onepiece 🅕
│${setv} ${prefix}pokemon 🅕
│${setv} ${prefix}randomnime 🅕
│${setv} ${prefix}randomnime2 🅕
│${setv} ${prefix}rize 🅕
│${setv} ${prefix}sagiri 🅕
│${setv} ${prefix}sakura 🅕
│${setv} ${prefix}sasuke 🅕
│${setv} ${prefix}shina 🅕
│${setv} ${prefix}shinka 🅕
│${setv} ${prefix}shinomiya 🅕
│${setv} ${prefix}shizuka 🅕
│${setv} ${prefix}shota 🅕
│${setv} ${prefix}tejina 🅕
│${setv} ${prefix}toukachan 🅕
│${setv} ${prefix}tsunade 🅕
│${setv} ${prefix}waifu 🅕
│${setv} ${prefix}waifu2 🅕
│${setv} ${prefix}animewall 🅕
│${setv} ${prefix}yotsuba 🅕
│${setv} ${prefix}yuki 🅕
│${setv} ${prefix}yulibocil 🅕
│${setv} ${prefix}yumeko 🅕
│${setv} ${prefix}8ball 🅕
│${setv} ${prefix}animeawoo 🅕
│${setv} ${prefix}animemegumin 🅕
│${setv} ${prefix}animeshinobu 🅕
│${setv} ${prefix}animehandhold 🅕
│${setv} ${prefix}animehighfive 🅕
│${setv} ${prefix}animecringe 🅕
│${setv} ${prefix}animedance 🅕
│${setv} ${prefix}animehappy 🅕
│${setv} ${prefix}animeglomp 🅕
│${setv} ${prefix}animeblush 🅕
│${setv} ${prefix}animesmug 🅕
│${setv} ${prefix}animewave 🅕
│${setv} ${prefix}animesmille 🅕
│${setv} ${prefix}animepoke 🅕
│${setv} ${prefix}animewink 🅕
│${setv} ${prefix}animebonk 🅕
│${setv} ${prefix}animebully 🅕
│${setv} ${prefix}animeyeet 🅕
│${setv} ${prefix}animebite 🅕
│${setv} ${prefix}animelick 🅕
│${setv} ${prefix}animekill 🅕
│${setv} ${prefix}animecry 🅕
│${setv} ${prefix}animewlp 🅕
│${setv} ${prefix}animekiss 🅕
│${setv} ${prefix}animehug 🅕
│${setv} ${prefix}animeneko 🅕
│${setv} ${prefix}animepat 🅕
│${setv} ${prefix}animeslap 🅕
│${setv} ${prefix}animecuddle 🅕
│${setv} ${prefix}animewaifu 🅕
│${setv} ${prefix}animenom 🅕
│${setv} ${prefix}animefoxgirl 🅕
│${setv} ${prefix}animegecg 🅕
│${setv} ${prefix}animetickle 🅕
│${setv} ${prefix}animefeed 🅕
│${setv} ${prefix}animeavatar 🅕
│${setv} ${prefix}anime 🅕
│${setv} ${prefix}avatar 🅕
│${setv} ${prefix}shinobu 🅕
│${setv} ${prefix}fox_girl 🅕
│${setv} ${prefix}gecg 🅕
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break



case 'databasemenu': {
let xmenu_oh = `
╭──❍「 🤖 *GREETING* 」❍
│ ✨ *Hi!* 👋
│ 🏷️ *Name :* ${m.pushName}
│ 🎉 ${pappyytimewisher} 😄
╰─┬────❍ ${readmore}
╭─┴❍「 🅞 *GUIDE* 」❍
│ *👑 For Owner* = 🅞
│ *💸 For Free User* = 🅕
│ *🌟 For Premium User* = 🅟
╰─┬────❍
╭─┴❍「 💾 *Database* 」❍
│${setv} ${prefix}setcmd 🅞
│${setv} ${prefix}delcmd 🅞
│${setv} ${prefix}listcmd 🅕
│${setv} ${prefix}lockcmd 🅞
│${setv} ${prefix}addmsg 🅞
│${setv} ${prefix}delmsg 🅞
│${setv} ${prefix}getmsg 🅕
│${setv} ${prefix}listmsg 🅕
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'storemenu': {
let xmenu_oh = `
╭──❍「 🤖 *GREETING* 」❍
│ ✨ *Hi!* 👋
│ 🏷️ *Name :* ${m.pushName}
│ 🎉 ${pappyytimewisher} 😄
╰─┬────❍ ${readmore}
╭─┴❍「 🅞 *GUIDE* 」❍
│ *👑 For Owner* = 🅞
│ *💸 For Free User* = 🅕
│ *🌟 For Premium User* = 🅟
╰─┬────❍
╭─┴❍「 🛒 *Store* 」❍
│${setv} ${prefix}list 🅕
│${setv} ${prefix}store 🅕
│${setv} ${prefix}shop 🅕
│${setv} ${prefix}addlist 🅞
│${setv} ${prefix}dellist 🅞
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break


case 'religionmenu': {
let xmenu_oh = `
╭──❍「 🤖 *GREETING* 」❍
│ ✨ *Hi!* 👋
│ 🏷️ *Name :* ${m.pushName}
│ 🎉 ${pappyytimewisher} 😄
╰─┬────❍ ${readmore}
╭─┴❍「 🅞 *GUIDE* 」❍
│ *👑 For Owner* = 🅞
│ *💸 For Free User* = 🅕
│ *🌟 For Premium User* = 🅟
╰─┬────❍
╭─┴❍「 ✝️ *Religion* 」❍
│${setv} ${prefix}bible 🅕
│${setv} ${prefix}quran 🅕
│${setv} ${prefix}gita 🅕
│${setv} ${prefix}namazchk 🅕
│${setv} ${prefix}prophetname 🅕
│${setv} ${prefix}prayertime 🅕
│${setv} ${prefix}sahihbukhari 🅕
│${setv} ${prefix}jamiattirmidhi 🅕
│${setv} ${prefix}sunanannasai 🅕
│${setv} ${prefix}sunanibnmajah 🅕
│${setv} ${prefix}sunanabudawud 🅕
│${setv} ${prefix}kisahnabi 🅕
│${setv} ${prefix}asmaulhusna 🅕
│${setv} ${prefix}duas 🅕
│${setv} ${prefix}namaz 🅕
│${setv} ${prefix}masnoonduas 🅕
│${setv} ${prefix}ayatalkursi 🅕
│${setv} ${prefix}niyatnamaz 🅕
│${setv} ${prefix}quotesislami 🅕
│${setv} ${prefix}assalamualaikum 🅕
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break



case 'othermenu': {
let xmenu_oh = `
╭──❍「 🤖 *GREETING* 」❍
│ ✨ *Hi!* 👋
│ 🏷️ *Name :* ${m.pushName || 'No Name'}
│ 🎉 ${pappyytimewisher} 😄
╰─┬────❍ ${readmore}
╭─┴❍「 🅞 *GUIDE* 」❍
│ *👑 For Owner* = 🅞
│ *💸 For Free User* = 🅕
│ *🌟 For Premium User* = 🅟
╰─┬────❍
╭─┴❍「 🛠️ *Other* 」❍
│${setv} ${prefix}update 🅕
│${setv} ${prefix}cricket 🅕
│${setv} ${prefix}score 🅕
│${setv} ${prefix}ping 🅕
│${setv} ${prefix}menu 🅕
│${setv} ${prefix}myip 🅕
│${setv} ${prefix}repo 🅕
│${setv} ${prefix}reportbug 🅕
│${setv} ${prefix}idgroup 🅕
│${setv} ${prefix}owner 🅕
│${setv} ${prefix}rentbot 🅕
│${setv} ${prefix}donate 🅕
│${setv} ${prefix}runtime 🅕
│${setv} ${prefix}confess 🅕
│${setv} ${prefix}react 🅕
│${setv} ${prefix}q 🅕
│${setv} ${prefix}inspect 🅕
│${setv} ${prefix}tagme 🅕
│${setv} ${prefix}nowa 🅕
│${setv} ${prefix}truecaller 🅕
╰──────❍`
if (typemenu === 'v1') {
  PappyBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  PappyBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./PappyMedia/theme/PappyPic.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v5') {
  PappyBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v6') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png',
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v7') {
  PappyBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./PappyMedia/theme/Pappy-Video.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: 'Pappy Bot V2',
              newsletterJid: "120363232303807350@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://raw.githubusercontent.com/pappy999666-dotcom/pappy-bot-v2/main/PappyMedia/theme/PappyPic.png",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break
//ALL MENUS CODE END AT HERE


default:
  if (budy.startsWith('>')) {
    if (!PappyTheCreator) return; // Ensure only the bot creator can run this command
    const codeToEvaluate = budy.slice(2).trim(); // Slice and trim the code after the '>' symbol
    if (!codeToEvaluate) return m.reply("❌ No code provided for evaluation.");
  
    try {
      let evaled = await eval(codeToEvaluate); // Evaluate the code synchronously
      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled); // Ensure the result is a string
      await m.reply(evaled); // Send the evaluation result back
    } catch (err) {
      console.error(err); // Log the error for debugging
      await m.reply(`❌ Error in evaluation: ${String(err)}`); // Return the error message to the user
    }
  }
  
  if (budy.startsWith('=>')) {
    if (!PappyTheCreator) return; // Ensure only the bot creator can run this command
    const codeToEvaluate = budy.slice(2).trim(); // Slice and trim the code after the '<' symbol
    if (!codeToEvaluate) return m.reply("❌ No code provided for evaluation.");
  
    try {
      let evaled = await eval(`(async () => { ${codeToEvaluate} })()`); // Execute asynchronous code inside an async function
      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled); // Ensure the result is a string
      await m.reply(evaled); // Send the evaluation result back
    } catch (err) {
      console.error(err); // Log the error for debugging
      await m.reply(`❌ Error in evaluation: ${String(err)}`); // Return the error message to the user
    }
  }
  
const { exec } = require('child_process'); // Import exec

if (budy.startsWith('$')) {
  if (!PappyTheCreator) return; // Ensure only the creator can run commands
  if (!text) return m.reply("❌ Please provide a command to execute.");

  // Slice off the '$' and any extra spaces
  const commandToRun = budy.slice(1).trim(); // trim() to remove extra spaces

  if (!commandToRun) {
    return m.reply("❌ No command provided after $");
  }

  // Execute the command
  exec(commandToRun, (err, stdout, stderr) => {
    if (err) {
      console.error(err); // Log error for debugging
      return m.reply(`❌ Error executing command: ${err.message}`);
    }

    if (stderr) {
      console.error(stderr); // Log any error output from the command
      return m.reply(`❌ Command Error: ${stderr}`);
    }

    if (stdout) {
      console.log(stdout); // Log output for debugging
      return m.reply(`\`\`\`bash\n${stdout}\n\`\`\``); // Send output with code block formatting
    }
  });
}

// ═══════════════════════════════════════════════════════════════════
// P5 — NEW COMMANDS (HIGH VALUE)
// ═══════════════════════════════════════════════════════════════════

case 'checkwa': case 'wa': {
  if (!text) return replygcpappy(`*Example:* ${prefix + command} 628123456789`);
  const numCheck = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  try {
    const [result] = await PappyBotInc.onWhatsApp(numCheck);
    if (result?.exists) {
      replygcpappy(`✅ *+${result.jid.split('@')[0]}* is registered on WhatsApp.`);
    } else {
      replygcpappy(`❌ *+${text.replace(/[^0-9]/g, '')}* is NOT on WhatsApp.`);
    }
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

case 'getstatus': case 'status': {
  let who = m.mentionedJid[0] || (m.quoted && m.quoted.sender) || m.sender;
  try {
    const bio = await PappyBotInc.fetchStatus(who);
    replygcpappy(`📝 *Status of @${who.split('@')[0]}:*\n\n${bio?.status || 'No status set.'}`);
  } catch { replygcpappy(`❌ Could not fetch status. The account may have privacy restrictions.`); }
}
break;

case 'quiz': {
  // P5: Native WhatsApp poll as a quiz
  if (!text) return replygcpappy(`*Example:* ${prefix + command} What is 2+2?|3|4|5|6\n\nFormat: question|opt1|opt2|...|optN`);
  const parts = text.split('|').map(s => s.trim());
  if (parts.length < 3) return replygcpappy(`❌ Provide at least 2 options after the question.\n*Example:* ${prefix + command} Capital of France?|London|Paris|Rome`);
  const [question, ...options] = parts;
  await PappyBotInc.sendMessage(m.chat, {
    poll: {
      name: `🧠 Quiz: ${question}`,
      values: options.slice(0, 12),
      selectableCount: 1
    }
  }, { quoted: m });
}
break;

case 'livelocation': {
  if (!m.isGroup) return replygcpappy('🗺️ Live location can only be shared in groups.');
  const minutes = parseInt(args[0]) || 5;
  const duration = Math.min(Math.max(minutes, 1), 60) * 60; // seconds, max 60 min
  await PappyBotInc.sendMessage(m.chat, {
    liveLocation: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      accuracyInMeters: 0,
      speedInMps: 0,
      degreesClockwiseFromMagneticNorth: 0,
      caption: `📍 Live location shared for ${Math.round(duration / 60)} minute(s) by @${m.sender.split('@')[0]}`,
      sequenceNumber: BigInt(0),
      timeOffset: 0,
      jpegThumbnail: null
    },
    mentions: [m.sender]
  }, { quoted: m });
}
break;

case 'location': {
  if (!text) return replygcpappy(`*Example:* ${prefix + command} 48.8566,2.3522\nOr: ${prefix + command} 48.8566 2.3522`);
  const coords = text.replace(',', ' ').trim().split(/\s+/);
  if (coords.length < 2) return replygcpappy('❌ Invalid format. Use: lat,lng or lat lng');
  const [lat, lng] = coords.map(Number);
  if (isNaN(lat) || isNaN(lng)) return replygcpappy('❌ Invalid coordinates.');
  await PappyBotInc.sendMessage(m.chat, {
    location: { degreesLatitude: lat, degreesLongitude: lng, name: text, address: `${lat}, ${lng}` }
  }, { quoted: m });
}
break;

case 'blocklist': {
  if (!PappyBotOwner) return replygcpappy('👑 Owner only command.');
  try {
    const blocked = await PappyBotInc.fetchBlocklist();
    if (!blocked.length) return replygcpappy('📋 No blocked contacts.');
    const list = blocked.map((jid, i) => `${i + 1}. +${jid.split('@')[0]}`).join('\n');
    replygcpappy(`🚫 *Blocked Contacts (${blocked.length}):*\n\n${list}`);
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

case 'privacy': {
  if (!PappyBotOwner) return replygcpappy('👑 Owner only command.');
  const validSettings = ['lastSeen', 'online', 'profilePicture', 'status', 'readReceipts', 'groupAdd', 'defaultDisappearingMode'];
  const validValues  = ['all', 'contacts', 'contact_blacklist', 'none', 'match_last_seen'];
  if (!args[0]) {
    return replygcpappy(`🔒 *Privacy Settings*\n\n*Settings:* ${validSettings.join(', ')}\n*Values:* ${validValues.join(', ')}\n\n*Example:* ${prefix + command} lastSeen none`);
  }
  const [setting, value] = args;
  if (!validSettings.includes(setting)) return replygcpappy(`❌ Invalid setting. Choose from: ${validSettings.join(', ')}`);
  if (!validValues.includes(value)) return replygcpappy(`❌ Invalid value. Choose from: ${validValues.join(', ')}`);
  try {
    await PappyBotInc.updatePrivacySettings(setting, value);
    replygcpappy(`✅ Privacy *${setting}* set to *${value}*`);
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

case 'setbotname': {
  if (!PappyBotOwner) return replygcpappy('👑 Owner only command.');
  if (!text) return replygcpappy(`*Example:* ${prefix + command} My Awesome Bot`);
  try {
    await PappyBotInc.updateProfileName(text);
    global.botname = text;
    replygcpappy(`✅ Bot name updated to: *${text}*`);
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

case 'setbotbio': case 'setbio': {
  if (!PappyBotOwner) return replygcpappy('👑 Owner only command.');
  if (!text) return replygcpappy(`*Example:* ${prefix + command} Powered by pappy-bot-v2 🤖`);
  try {
    await PappyBotInc.updateProfileStatus(text);
    replygcpappy(`✅ Bot bio updated!`);
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

case 'setbotpp': case 'setbotpic': {
  if (!PappyBotOwner) return replygcpappy('👑 Owner only command.');
  const media = m.quoted?.message?.imageMessage ? m.quoted : m;
  if (!media.message?.imageMessage) return replygcpappy('❌ Reply to an image to set it as the bot profile picture.');
  try {
    const imgBuffer = await downloadContentFromMessage(media.message.imageMessage, 'image');
    const chunks = [];
    for await (const chunk of imgBuffer) chunks.push(chunk);
    await PappyBotInc.updateProfilePicture(PappyBotInc.user.id, Buffer.concat(chunks));
    replygcpappy('✅ Bot profile picture updated!');
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

case 'contact': case 'vcard': {
  if (!text) return replygcpappy(`*Example:* ${prefix + command} 628123456789 John Doe`);
  const [numRaw, ...nameParts] = args;
  const num = numRaw.replace(/[^0-9]/g, '');
  const name = nameParts.join(' ') || `+${num}`;
  const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nORG:${name};\nTEL;type=CELL;type=VOICE;waid=${num}:+${num}\nEND:VCARD`;
  await PappyBotInc.sendMessage(m.chat, {
    contacts: { displayName: name, contacts: [{ vcard }] }
  }, { quoted: m });
}
break;

case 'welcomeflow': {
  if (!PappyBotOwner) return replygcpappy('👑 Owner only command.');
  if (!args[0]) return replygcpappy(`*Example:* ${prefix + command} on\nOr: ${prefix + command} off`);
  const wfState = args[0].toLowerCase() === 'on';
  try {
    if (wfState) {
      await createWelcomeFlow(PappyBotInc, {
        jid: m.chat,
        message: `Welcome to *${global.botname}*! 🎉\n\nType *${prefix}menu* to see all commands.`,
        header: `👋 Welcome!`,
        footer: global.botname
      });
      replygcpappy(`✅ Welcome flow *enabled* for this chat.`);
    } else {
      replygcpappy(`✅ Welcome flow *disabled* for this chat.`);
    }
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

case 'aisteps': {
  if (!text) return replygcpappy(`*Example:* ${prefix + command} how to build a REST API`);
  try {
    await metaTyping(PappyBotInc, m.chat).catch(() => {});
    let steps;
    try {
      steps = await replayPlanning(PappyBotInc, text);
    } catch {
      steps = null;
    }
    // Fallback: generate steps via AI
    if (!steps) {
      const res = await fetch(`https://aemt.uk.to/openai?text=${encodeURIComponent(`Give me step-by-step reasoning for: ${text}`)}`).then(r => r.json()).catch(() => null);
      steps = res?.result;
    }
    if (!steps) return replygcpappy('❌ Could not generate steps. Try again.');
    replygcpappy(`🧠 *Step-by-step: ${text}*\n\n${typeof steps === 'string' ? steps : steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`);
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

case 'viewonce': case 'vo': {
  const voMedia = m.quoted?.message;
  if (!voMedia) return replygcpappy('❌ Reply to an image or video to send it as view-once.');
  const hasImg = voMedia.imageMessage;
  const hasVid = voMedia.videoMessage;
  if (!hasImg && !hasVid) return replygcpappy('❌ Reply to an image or video.');
  try {
    const msgType = hasImg ? 'imageMessage' : 'videoMessage';
    const dlType  = hasImg ? 'image' : 'video';
    const stream  = await downloadContentFromMessage(voMedia[msgType], dlType);
    const chunks  = [];
    for await (const chunk of stream) chunks.push(chunk);
    const buf = Buffer.concat(chunks);
    await PappyBotInc.sendMessage(m.chat, {
      [dlType]: buf,
      viewOnce: true,
      caption: hasImg ? '📸 View-once image' : undefined
    }, { quoted: m });
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

case 'disappear': {
  if (!PappyBotOwner && !m.isGroup) return;
  const dSecs = {
    'off': 0, '0': 0,
    '24h': 86400,  '1d': 86400,
    '7d': 604800,  '1w': 604800,
    '90d': 7776000, '3m': 7776000
  }[args[0]?.toLowerCase()] ?? null;
  if (dSecs === null) return replygcpappy(`*Example:* ${prefix + command} off | 24h | 7d | 90d`);
  try {
    await PappyBotInc.sendMessage(m.chat, { disappearingMessagesInChat: dSecs });
    replygcpappy(`✅ Disappearing messages set to *${args[0]}*`);
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

// ═══════════════════════════════════════════════════════════════════
// P6 — INFRASTRUCTURE COMMANDS
// ═══════════════════════════════════════════════════════════════════

case 'getbizprofile': case 'bizprofile': {
  if (!PappyBotOwner) return replygcpappy('👑 Owner only command.');
  const bizTarget = m.mentionedJid[0] || PappyBotInc.user.id;
  try {
    const biz = await PappyBotInc.getBusinessProfile(bizTarget);
    if (!biz) return replygcpappy('❌ No business profile found.');
    replygcpappy(`🏢 *Business Profile*\n\n📛 *Name:* ${biz.description || 'N/A'}\n📞 *Phone:* ${biz.call || 'N/A'}\n📧 *Email:* ${biz.email || 'N/A'}\n🌐 *Website:* ${(biz.websites || []).join(', ') || 'N/A'}\n📍 *Category:* ${biz.business_hours?.timezone || 'N/A'}`);
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

case 'setbizprofile': {
  if (!PappyBotOwner) return replygcpappy('👑 Owner only command.');
  const [bizEmail, bizWebsite, ...bizDescParts] = args;
  if (!bizEmail) return replygcpappy(`*Example:* ${prefix + command} email@example.com https://example.com My Business Description`);
  try {
    await PappyBotInc.updateBusinessProfile({
      email: bizEmail,
      websites: bizWebsite ? [bizWebsite] : [],
      description: bizDescParts.join(' ') || 'Powered by pappy-bot-v2',
      address: '',
    });
    replygcpappy('✅ Business profile updated!');
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

case 'commcreate': case 'createcommunity': {
  if (!PappyBotOwner) return replygcpappy('👑 Owner only command.');
  if (!text) return replygcpappy(`*Example:* ${prefix + command} My Community Name`);
  try {
    const comm = await PappyBotInc.communityCreate(text, `Created via ${global.botname}`);
    replygcpappy(`✅ *Community created!*\n\n📛 *Name:* ${text}\n🆔 *ID:* ${comm}`);
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

case 'comminfo': case 'communityinfo': {
  if (!m.isGroup) return replygcpappy('❌ Use this command inside a community group.');
  try {
    const meta = await PappyBotInc.communityMetadata(m.chat);
    replygcpappy(`🏘️ *Community Info*\n\n📛 *Name:* ${meta.subject}\n📝 *Desc:* ${meta.desc || 'None'}\n👥 *Members:* ${meta.participants?.length || 0}\n📅 *Created:* ${new Date((meta.creation || 0) * 1000).toDateString()}`);
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

case 'label': case 'addlabel': {
  if (!PappyBotOwner) return replygcpappy('👑 Owner only command.');
  if (!args[0]) return replygcpappy(`*Example:* ${prefix + command} 1\nLabels are numeric IDs assigned in WhatsApp Business.`);
  try {
    await PappyBotInc.addChatLabel(m.chat, args[0]);
    replygcpappy(`✅ Label *${args[0]}* added to this chat.`);
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

case 'removelabel': {
  if (!PappyBotOwner) return replygcpappy('👑 Owner only command.');
  if (!args[0]) return replygcpappy(`*Example:* ${prefix + command} 1`);
  try {
    await PappyBotInc.removeChatLabel(m.chat, args[0]);
    replygcpappy(`✅ Label *${args[0]}* removed from this chat.`);
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

case 'broadcast': case 'bc': {
  if (!PappyBotOwner) return replygcpappy('👑 Owner only command.');
  if (!text) return replygcpappy(`*Example:* ${prefix + command} Hello everyone! 👋`);
  try {
    const chats = Object.keys(global.db.users);
    let sent = 0, failed = 0;
    for (const jid of chats) {
      try {
        await PappyBotInc.sendMessage(jid, { text: `📢 *Broadcast*\n\n${text}` });
        sent++;
        await sleep(500);
      } catch { failed++; }
    }
    replygcpappy(`✅ Broadcast complete!\n📤 Sent: ${sent}\n❌ Failed: ${failed}`);
  } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
}
break;

case 'newsletter': case 'news': {
  if (!PappyBotOwner) return replygcpappy('👑 Owner only command.');
  const [newsAction, ...newsArgs] = args;
  switch ((newsAction || '').toLowerCase()) {
    case 'create': {
      const newsName = newsArgs.join(' ');
      if (!newsName) return replygcpappy(`*Example:* ${prefix + command} newsletter create My Channel Name`);
      try {
        const channel = await PappyBotInc.createNewsletterChannel({ name: newsName, description: `Powered by ${global.botname}` });
        replygcpappy(`✅ Newsletter channel created!\n📛 *Name:* ${newsName}\n🆔 *JID:* ${channel?.id || 'Created'}`);
      } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
      break;
    }
    case 'post': {
      const newsText = newsArgs.join(' ');
      if (!m.isGroup && !newsText) return replygcpappy(`*Example:* ${prefix + command} newsletter post Hello from the channel!`);
      try {
        await PappyBotInc.sendMessage(m.chat, { text: newsText || 'Test post' });
        replygcpappy('✅ Post sent to newsletter!');
      } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
      break;
    }
    case 'follow': {
      const followJid = newsArgs[0];
      if (!followJid) return replygcpappy(`*Example:* ${prefix + command} newsletter follow 1234567890@newsletter`);
      try {
        await PappyBotInc.followNewsletter(followJid);
        replygcpappy(`✅ Following newsletter: ${followJid}`);
      } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
      break;
    }
    case 'unfollow': {
      const unfollowJid = newsArgs[0];
      if (!unfollowJid) return replygcpappy(`*Example:* ${prefix + command} newsletter unfollow 1234567890@newsletter`);
      try {
        await PappyBotInc.unfollowNewsletter(unfollowJid);
        replygcpappy(`✅ Unfollowed newsletter: ${unfollowJid}`);
      } catch (e) { replygcpappy(`❗ Error: ${e.message}`); }
      break;
    }
    default:
      replygcpappy(`📰 *Newsletter Commands:*\n${prefix + command} newsletter create <name>\n${prefix + command} newsletter follow <jid>\n${prefix + command} newsletter unfollow <jid>`);
  }
}
break;

// ── end P5/P6 ──────────────────────────────────────────────────────

// ─── Verbose-Fishstick: Group-Status commands ─────────────────────
case 'updategstatus':
case 'gstatus':
case 'ggstatus':
case 'pstatus':
case 'setstatus':
case 'getabout': {
    if (!_gsPlugin) {
        replygcpappy('❌ Group-status plugin not loaded. Check plugins/pappy-groupstatus.js.');
        break;
    }
    try {
        await _gsPlugin.execute(PappyBotInc, m, {
            sock:       PappyBotInc,
            msg:        m,
            chat:       m.chat,
            cmdName:    prefix + command,
            args,
            text,
            quoted:     m.quoted || null,
            isGroup:    m.isGroup,
            isAdmin:    m.isAdmin,
            isBotAdmin: m.isBotAdmin,
        });
    } catch (e) {
        replygcpappy(`❗ Error in groupstatus plugin: ${e.message}`);
    }
}
break;

// ─── End group-status commands ────────────────────────────────────

			if (m.message && budy.toLowerCase() != undefined) {
if (m.chat.endsWith('broadcast')) return
if (m.isBaileys) return
let msgs = global.db.database
if (!(budy.toLowerCase() in msgs)) return
PappyBotInc.copyNForward(m.chat, msgs[budy.toLowerCase()], true, {quoted: m})
}
		}
	} catch (err) {
        // Log locally only — do not spam owner's DM on every handler error
        console.error('[PappyV4] Handler error:', util.format(err).slice(0, 500));
	}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
