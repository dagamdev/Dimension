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
exports.readyEvent = void 0;
const discord_js_1 = require("discord.js");
const config_1 = require("../config");
const db_1 = require("../db");
const utils_1 = require("../utils");
const interaction_1 = require("./interaction");
const readyEvent = (client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('Estoy listo ' + ((_a = client.user) === null || _a === void 0 ? void 0 : _a.username));
    const server = client.guilds.cache.get(db_1.botDB.serverId);
    const textServer = client.guilds.cache.get(db_1.botDB.testServerId);
    const channelLog = client.channels.cache.get('1053686859840102431');
    const ReadyEb = new discord_js_1.EmbedBuilder()
        .setTitle('I am ready')
        .setDescription('Connected again')
        .setColor('Random');
    if (!config_1.inDevelopment && (channelLog === null || channelLog === void 0 ? void 0 : channelLog.type) == discord_js_1.ChannelType.GuildText)
        channelLog.send({ embeds: [ReadyEb] });
    // console.log(server?.emojis.cache.filter(f=> f.animated).map(({name, id}) => ({name, id})))
    // client.user?.edit({avatar: server?.iconURL()})
    let counter = 0;
    counter = (0, utils_1.setActivity)(client, counter);
    setInterval(() => {
        counter = (0, utils_1.setActivity)(client, counter);
    }, 10 * 60000);
    [server, textServer].forEach(sv => {
        interaction_1.slashCommands.forEach((scmd) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (!((_a = (yield (sv === null || sv === void 0 ? void 0 : sv.commands.fetch()))) === null || _a === void 0 ? void 0 : _a.some(s => s.name == scmd.name))) {
                sv === null || sv === void 0 ? void 0 : sv.commands.create(scmd).then(c => console.log(`Comando ${c.name} creado en ${sv.name}.`));
            }
        }));
    });
    // const command = slashCommands.get('anuncio')
    // ;(await server?.commands.fetch('1034508374219427931'))?.edit({options: command?.options}).then(c=> console.log(`Comando ${c.name} editado`))
    // console.log((await server?.commands.fetch())?.map(m=> ({id: m.id, name: m.name})))
});
exports.readyEvent = readyEvent;
