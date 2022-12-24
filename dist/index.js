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
const discord_js_1 = require("discord.js");
const config_1 = require("./config");
const interaction_1 = require("./events/interaction");
const messageCreate_1 = require("./events/messageCreate");
const ready_1 = require("./events/ready");
const db_1 = require("./db");
const Bot = new discord_js_1.Client({ intents: 131071 });
Bot.on('ready', () => {
    (0, ready_1.readyEvent)(Bot);
});
Bot.on('messageCreate', (message) => {
    (0, messageCreate_1.messageCreateEvent)(message, Bot);
});
Bot.on('interactionCreate', (interaction) => {
    (0, interaction_1.interactionEvent)(interaction, Bot);
});
//! Errors events
Bot.on("shardError", (err) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(err);
    const channelLog = Bot.channels.cache.get(db_1.botDB.channelLogId);
    const embErr = new discord_js_1.EmbedBuilder()
        .setTitle(`❌ Ocurrió un error`)
        .setDescription(`\`\`\`js\n${err.name}\n\n${err.message}\n\n${err.stack}\`\`\``)
        .setColor('Red')
        .setTimestamp();
    if ((channelLog === null || channelLog === void 0 ? void 0 : channelLog.type) == discord_js_1.ChannelType.GuildText)
        channelLog.send({ embeds: [embErr] });
}));
process.on("unhandledRejection", (err) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(err);
    const channelLog = Bot.channels.cache.get(db_1.botDB.channelLogId);
    const embErr = new discord_js_1.EmbedBuilder()
        .setTitle(`❌ Ocurrió un error`)
        .setDescription(`\`\`\`js\n${err}\`\`\``)
        .setColor('Red')
        .setTimestamp();
    if ((channelLog === null || channelLog === void 0 ? void 0 : channelLog.type) == discord_js_1.ChannelType.GuildText)
        channelLog.send({ embeds: [embErr] });
}));
Bot.login(config_1.botToken);
