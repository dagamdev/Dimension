"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setErrors = exports.setError = exports.createEmbedMessage = exports.sendMessageText = void 0;
const discord_js_1 = require("discord.js");
const sendMessageText = (msg, optionsMessage) => {
    setTimeout(() => {
        msg.reply(optionsMessage);
    }, 3000);
};
exports.sendMessageText = sendMessageText;
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
