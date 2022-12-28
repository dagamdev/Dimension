"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageCreateEvent = void 0;
const discord_js_1 = require("discord.js");
const db_1 = require("../db");
const eval_1 = require("../commands/text/eval");
const warn_1 = require("../commands/text/warn");
const ban_1 = require("../commands/text/ban");
const messageCreateEvent = (msg, client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (msg.author.bot)
        return;
    const server = client.guilds.cache.get(db_1.botDB.serverId);
    // console.log(msg.channelId)
    if (msg.channelId == '942882096693772328') {
        msg.react('1035717696622428170');
        msg.react('938641123348475914');
    }
    if (server === null || server === void 0 ? void 0 : server.channels.cache.filter(f => f.parentId == '889585373523615764' && f.name.includes('🌟》')).some(s => s.id == msg.channelId)) {
        msg.react('1039665999403819068');
        msg.react('1035719304219471913');
        msg.react('938639678603681842');
    }
    if (msg.channelId == '1022914793511850084' && msg.content.startsWith('=birthday date')) {
        msg.reply({ content: '**Aprieta a "celebrar en este servidor" para que nos notifique <a:slowdance:1053308466552373318>**' }).then(res => setTimeout(() => res.delete(), 5 * 60 * 1000));
    }
    const { prefix } = db_1.botDB;
    if (msg.author.bot || !msg.content.toLowerCase().startsWith(prefix))
        return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (command == 'eval' && ['717420870267830382', '551146834941313026', '853063286320922634'].some(s => s == msg.author.id))
        (0, eval_1.evalCommand)(msg, client, args.join(' '));
    //870430667777904640
    if (msg.channel.type == discord_js_1.ChannelType.GuildText && msg.channel.parentId == '870430667777904640') {
        if (command == 'warn')
            (0, warn_1.warnCommand)(msg, args, client);
        if (command == 'ban')
            (0, ban_1.banCommand)(msg, args, client);
    }
});
exports.messageCreateEvent = messageCreateEvent;
