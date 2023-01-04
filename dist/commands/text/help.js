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
exports.helpCommand = void 0;
const discord_js_1 = require("discord.js");
const db_1 = require("../../db");
const utils_1 = require("../../utils");
const helpCommand = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    msg.channel.sendTyping();
    const slashCommands = yield ((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.commands.fetch());
    const HelpEb = new discord_js_1.EmbedBuilder()
        .setTitle('Mis comandos')
        .addFields({ name: 'Texto:', value: ['warn', 'ban'].map(m => `\`\`${db_1.botDB.prefix.toUpperCase() + m}\`\``).join('\n') }, { name: 'Barra:', value: `${slashCommands === null || slashCommands === void 0 ? void 0 : slashCommands.map(m => m.options.filter(f => f.type == 1).length ? m.options.filter(f => f.type == 1).map(n => `</${m.name} ${n.name}:${m.id}>`) : `</${m.name}:${m.id}>`).flat().join('\n')}` })
        .setColor('#C8A2C8');
    (0, utils_1.sendMessageText)(msg, { embeds: [HelpEb] });
});
exports.helpCommand = helpCommand;
