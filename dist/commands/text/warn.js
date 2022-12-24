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
exports.warnCommand = void 0;
const discord_js_1 = require("discord.js");
const utils_1 = require("../../utils");
const warnCommand = (msg, args, client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const member = ((_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) || ((_b = msg.guild) === null || _b === void 0 ? void 0 : _b.members.cache.get(args[0]));
    const reason = args.slice(1).join(' ');
    if ((0, utils_1.setErrors)(msg, [
        [
            Boolean(!member),
            'No has proporcionado el miembro a advertir.'
        ],
        [
            Boolean(member === null || member === void 0 ? void 0 : member.user.bot),
            'No puedes advertir a un bot.'
        ],
        [
            Boolean((member === null || member === void 0 ? void 0 : member.id) == msg.author.id),
            'El miembro que proporcionaste eres tu, no te puedes advertir a ti mismo.'
        ],
        [
            Boolean((member === null || member === void 0 ? void 0 : member.id) == ((_c = msg.guild) === null || _c === void 0 ? void 0 : _c.ownerId)),
            'El miembro que proporcionaste es el dueño/a del servidor, *ten cuidado con lo que intentas*.'
        ],
        [
            Boolean(!reason),
            'No has proporcionado la razón.'
        ]
    ]))
        return;
    const WarnEb = new discord_js_1.EmbedBuilder()
        .setTitle('Miembro advertido')
        .setDescription(`El miembro ${member} ha sido advertido por ${msg.author}\n\n**Razón:** *${reason}*`)
        .setColor('Yellow');
    const WarnDmEb = new discord_js_1.EmbedBuilder()
        .setTitle('Advertencia')
        .setDescription(`Has sido advertido del servidor **${(_d = msg.guild) === null || _d === void 0 ? void 0 : _d.name}** por ${msg.author}\n\n**Razón:** ${reason}`)
        .setColor('Yellow')
        .setFooter({ text: ((_e = msg.guild) === null || _e === void 0 ? void 0 : _e.name) || 'undefined', iconURL: ((_f = msg.guild) === null || _f === void 0 ? void 0 : _f.iconURL()) || undefined });
    msg.channel.sendTyping();
    member === null || member === void 0 ? void 0 : member.send({ embeds: [WarnDmEb] }).then(() => {
        msg.reply({ allowedMentions: { repliedUser: false }, embeds: [WarnEb] });
    }).catch(() => {
        WarnEb.setFooter({ text: 'No he podido enviar la advertencia al miembro, es probable que no acepte mensajes directos.' });
        msg.reply({ allowedMentions: { repliedUser: false }, embeds: [WarnEb] });
    });
});
exports.warnCommand = warnCommand;
