"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inDevelopment = exports.connectorDb = exports.botToken = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.botToken = process.env.BOT_TOKEN || '';
exports.connectorDb = process.env.CONNECT_DB || '';
exports.inDevelopment = process.env.DEVELOPMENT || '';
