"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalCommand = void 0;
const discord_js_1 = require("discord.js");
const util_1 = require("util");
const utils_1 = require("../../utils");
const evalCommand = (msg, client, args) => {
    var _a, _b;
    try {
        msg.channel.sendTyping();
        const code = eval(args), texto = (0, util_1.inspect)(code);
        const evalEb = new discord_js_1.EmbedBuilder()
            .setDescription(`\`\`\`js\n${texto.length > 2040 ? texto.substring(0, 2040).concat('...') : texto}\`\`\``)
            .setColor(((_b = (_a = msg.guild) === null || _a === void 0 ? void 0 : _a.members.me) === null || _b === void 0 ? void 0 : _b.displayHexColor) || 'White');
        (0, utils_1.sendMessageText)(msg, { embeds: [evalEb] });
        msg.channel.send({});
    }
    catch (error) {
        (0, utils_1.setError)(msg, `${error}`);
    }
};
exports.evalCommand = evalCommand;
