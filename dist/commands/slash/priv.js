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
exports.privSlashCommand = exports.privScb = void 0;
const discord_js_1 = require("discord.js");
const utils_1 = require("../../utils");
exports.privScb = new discord_js_1.SlashCommandBuilder()
    .setName('priv')
    .setDescription('Envía un mensaje privado a un miembro.')
    .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
    .addUserOption(member => member.setName('miembro')
    .setDescription('El miembro a enviar el mensaje.')
    .setRequired(true))
    .addStringOption(message => message.setName('mensaje')
    .setDescription('El mensaje a enviar.')
    .setRequired(true)).toJSON();
const privSlashCommand = (int, client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { options, user, guild } = int, member = options.getUser('miembro', true), message = options.getString('mensaje', true);
    if ((0, utils_1.setSlashErrors)(int, [
        [
            Boolean(user.id == member.id),
            'No puedes enviarte mensajes a ti mismo/a.'
        ],
        [
            Boolean(((_a = client.user) === null || _a === void 0 ? void 0 : _a.id) == member.id),
            'No tiene sentido enviarme un mensaje a mi mismo.'
        ],
        [
            Boolean(member.bot),
            'No tiene sentido enviarle un mensaje a un bot.'
        ]
    ]))
        return;
    const PrivEb = new discord_js_1.EmbedBuilder()
        .setTitle('✅ Mensaje enviado')
        .setDescription(`El mensaje se ha enviado al miembro ${member}\n\n**Mensaje:** *${message}*`)
        .setColor('Green');
    const PrivDmEb = new discord_js_1.EmbedBuilder()
        .setDescription(`${message}\n\n*Enviado desde **${guild === null || guild === void 0 ? void 0 : guild.name}***`)
        .setColor('#FFDB58');
    member.send({ embeds: [PrivDmEb] }).then(() => __awaiter(void 0, void 0, void 0, function* () {
        int.deferReply();
        (0, utils_1.sendMessageSlash)(int, { embeds: [PrivEb] });
    })).catch(() => __awaiter(void 0, void 0, void 0, function* () {
        (0, utils_1.setSlashError)(int, 'No he podido enviar el menaje a el miembro, es probable que no acepte menajes directos.');
    }));
});
exports.privSlashCommand = privSlashCommand;
