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
exports.banCommand = void 0;
const discord_js_1 = require("discord.js");
const utils_1 = require("../../utils");
const banCommand = (msg, args, client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const member = ((_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) || ((_b = msg.guild) === null || _b === void 0 ? void 0 : _b.members.cache.get(args[0]));
    const reason = args.slice(1).join(' ');
    if ((0, utils_1.setErrors)(msg, [
        [
            Boolean(!((_c = msg.member) === null || _c === void 0 ? void 0 : _c.permissions.has('BanMembers'))),
            'No tienes los permisos necesarios para ejecutar el comando, permiso requerido *Banear miembros*.'
        ],
        [
            Boolean(!member && isNaN(Number(args[0]))),
            'No has proporcionado el miembro o la ID del miembro o usuario externo a banear.'
        ],
        [
            Boolean(member ? (member === null || member === void 0 ? void 0 : member.id) == msg.author.id : msg.author.id == args[0]),
            'El miembro que proporcionaste eres tu, no te puedes banear a ti mismo.'
        ],
        [
            Boolean(member ? (member === null || member === void 0 ? void 0 : member.id) == ((_d = msg.guild) === null || _d === void 0 ? void 0 : _d.ownerId) : ((_e = msg.guild) === null || _e === void 0 ? void 0 : _e.ownerId) == args[0]),
            'El miembro que proporcionaste es el dueño/a del servidor, *ten cuidado con lo que intentas*.'
        ],
        [
            Boolean(!reason),
            'No has proporcionado la razón.'
        ]
    ]))
        return;
    const BanEb = new discord_js_1.EmbedBuilder()
        .setTitle('Miembro baneado')
        .setColor('#F40A0A');
    const BanDmEb = new discord_js_1.EmbedBuilder()
        .setTitle('Baneado')
        .setDescription(`Has sido baneado del servidor **${(_f = msg.guild) === null || _f === void 0 ? void 0 : _f.name}** por ${msg.author}\n\n**Razón:** ${reason}`)
        .setColor('#F40A0A')
        .setFooter({ text: ((_g = msg.guild) === null || _g === void 0 ? void 0 : _g.name) || 'undefined', iconURL: ((_h = msg.guild) === null || _h === void 0 ? void 0 : _h.iconURL()) || undefined });
    msg.channel.sendTyping();
    if (member) {
        if (member.user.bot) {
            BanEb.setDescription(`El bot ${member} ha sido baneado por ${msg.author}\n\n**Razón:** *${reason}*`);
            member.ban({ reason: `Por ${msg.author.tag} | Razón: ${reason}`, deleteMessageSeconds: 5 * 24 * 60 * 60 }).then(() => {
                msg.reply({ allowedMentions: { repliedUser: false }, embeds: [BanEb] });
            });
        }
        else {
            BanEb.setDescription(`El miembro ${member} ha sido baneado por ${msg.author}\n\n**Razón:** *${reason}*`);
            member === null || member === void 0 ? void 0 : member.send({ embeds: [BanDmEb] }).then(() => {
                member.ban({ reason: `Por ${msg.author.tag} | Razón: ${reason}`, deleteMessageSeconds: 5 * 24 * 60 * 60 }).then(() => {
                    msg.reply({ allowedMentions: { repliedUser: false }, embeds: [BanEb] });
                });
            }).catch(() => {
                BanEb.setFooter({ text: 'No he podido enviar la advertencia al miembro, es probable que no acepte mensajes directos.' });
                member.ban({ reason: `Por ${msg.author.tag} | Razón: ${reason}`, deleteMessageSeconds: 5 * 24 * 60 * 60 }).then(() => {
                    msg.reply({ allowedMentions: { repliedUser: false }, embeds: [BanEb] });
                });
            });
        }
    }
    else {
        client.users.fetch(args[0]).then(user => {
            var _a;
            if (user.bot) {
                BanEb.setDescription(`El bot externo ${user.tag} ha sido baneado por ${msg.author}\n\n**Razón:** *${reason}*`);
            }
            else {
                BanEb.setDescription(`El usuario externo ${user.tag} ha sido baneado por ${msg.author}\n\n**Razón:** *${reason}*`);
            }
            (_a = msg.guild) === null || _a === void 0 ? void 0 : _a.members.ban(user.id, { reason: `Por ${msg.author.tag} | Razón: ${reason}` }).then(() => {
                msg.reply({ embeds: [BanEb] });
            });
        });
    }
});
exports.banCommand = banCommand;
