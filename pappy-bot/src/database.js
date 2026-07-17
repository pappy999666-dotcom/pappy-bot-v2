//══════════════════════════════════════════════════════════════════════════════════════════════════════//
//                                                                                                      //
//                                    𝗫𝗟𝗜𝗖𝗢𝗡-𝗩𝟰-𝗠𝗗  𝐁𝐎𝐓                                                //
//                                                                                                      //
//                                         Ｖ：4.0                                                       //
//                                                                                                      //
//                                                                                                      //      
//               ██╗  ██╗██╗     ██╗ ██████╗ ██████╗ ███╗   ██╗      ██╗   ██╗██╗  ██╗                  //              
//                ██╗██╔╝██║     ██║██╔════╝██╔═══██╗████╗  ██║      ██║   ██║██║  ██║                  //
//                ╚███╔╝ ██║     ██║██║     ██║   ██║██╔██╗ ██║█████╗██║   ██║███████║                  // 
//                ██╔██╗ ██║     ██║██║     ██║   ██║██║╚██╗██║╚════╝╚██╗ ██╔╝╚════██║                  // 
//               ██╔╝ ██╗███████╗██║╚██████╗╚██████╔╝██║ ╚████║       ╚████╔╝      ██║                  //
//                ═╝  ╚═╝╚══════╝╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝        ╚═══╝       ╚═╝                  // 
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//══════════════════════════════════════════════════════════════════════════════════════════════════════//
//*
//  * @project_name : PAPPY-BOT-V2
//  * @author : pappy999666-dotcom
//  * @youtube : https://t.me/pappylung
//  * @description : PAPPY-V4 ,A Multi-functional whatsapp user bot.
//*
//*
//base by Pappy
//re-upload? recode? copy code? give credit ya :)
//Instagram: pappy
//Telegram: t.me/pappylung
//GitHub: @pappy999666-dotcom
//WhatsApp: +923184070915
//want more free bot scripts? subscribe to my youtube channel: https://youtube.com/@PappyBot
//   * Created By Github: Pappy.
//   * Credit To Xeon
//   * © 2024 PAPPY-V3-MD.
// ⛥┌┤
// */

require('../settings');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const mongoose = require('mongoose');
let DataBase;

if (/mongo/.test(global.tempatDB)) {
	DataBase = class mongoDB {
		constructor(url, options = { useNewUrlParser: true, useUnifiedTopology: true }) {
			this.url = url
			this.data = {}
			this._model = {}
			this.options = options
		}
		
		read = async () => {
			mongoose.connect(this.url, { ...this.options })
			this.connection = mongoose.connection
			try {
				const schema = new mongoose.Schema({
					data: {
						type: Object,
						required: true,
						default: {},
					}
				})
				this._model = mongoose.model('data', schema)
			} catch {
				this._model = mongoose.model('data')
			}
			this.data = await this._model.findOne({})
			if (!this.data) {
				new this._model({ data: {} }).save()
				this.data = await this._model.findOne({})
			} else return this?.data?.data || this?.data
		}
		
		write = async (data) => {
			if (this.data && !this.data.data) return (new this._model({ data })).save()
			this._model.findById(this.data._id, (err, docs) => {
				if (!err) {
					if (!docs.data) docs.data = {}
					docs.data = data
					return docs.save()
				}
			})
		}
	}
} else if (/json/.test(global.tempatDB)) {
	DataBase = class dataBase {
		data = {}
		file = path.join(process.cwd(), 'database', global.tempatDB);
		
		read = async () => {
			let data;
			if (fs.existsSync(this.file)) {
				data = JSON.parse(fs.readFileSync(this.file))
			} else {
				fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2))
				data = this.data
			}
			return data
		}
		
		write = async (data) => {
			this.data = !!data ? data : global.db
			let dirname = path.dirname(this.file)
			if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true })
			fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2))
			return this.file
		}
	}
}

module.exports = DataBase


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});