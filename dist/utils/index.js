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
exports.setSlashErrors = exports.setSlashError = exports.setErrors = exports.setError = exports.createEmbedMessage = exports.sendMessageSlash = exports.sendMessageText = void 0;
const discord_js_1 = require("discord.js");
const sendMessageText = (msg, optionsMessage) => {
    setTimeout(() => {
        msg.reply(optionsMessage);
    }, 3000);
};
exports.sendMessageText = sendMessageText;
const sendMessageSlash = (int, optionsMessage) => {
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield int.editReply(optionsMessage);
    }), 3000);
};
exports.sendMessageSlash = sendMessageSlash;
const createEmbedMessage = (title, description, color) => {
    return new discord_js_1.EmbedBuilder({ title, description }).setColor(color);
};
exports.createEmbedMessage = createEmbedMessage;
const setError = (msg, description) => {
    msg.channel.sendTyping();
    setTimeout(() => {
        msg.reply({ allowedMentions: { repliedUser: false }, embeds: [(0, exports.createEmbedMessage)(`❌ Error`, description, 'Red')] }).then(tnt => setTimeout(() => {
            tnt.delete().catch(() => '');
            msg.delete().catch(() => '');
        }, 20000));
    }, 3000);
};
exports.setError = setError;
const setErrors = (msg, descriptionsAndConditions) => {
    let res = false;
    for (const dac of descriptionsAndConditions) {
        if (dac[0]) {
            (0, exports.setError)(msg, typeof dac[1] == 'boolean' ? '' : dac[1]);
            res = true;
            break;
        }
    }
    return res;
};
exports.setErrors = setErrors;
const setSlashError = (int, description) => __awaiter(void 0, void 0, void 0, function* () {
    yield int.deferReply({ ephemeral: true });
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield int.editReply({ allowedMentions: { repliedUser: false }, embeds: [(0, exports.createEmbedMessage)(`❌ Error`, description, 'Red')] });
    }), 3000);
});
exports.setSlashError = setSlashError;
const setSlashErrors = (int, descriptionsAndConditions) => {
    let res = false;
    for (const dac of descriptionsAndConditions) {
        if (dac[0]) {
            (0, exports.setSlashError)(int, typeof dac[1] == 'boolean' ? '' : dac[1]);
            res = true;
            break;
        }
    }
    return res;
};
exports.setSlashErrors = setSlashErrors;
