#!/usr/bin/env node

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const irc_pubsub_1 = require("@ncpub/irc-pubsub");
const url_1 = require("url");
const IrcWatch_1 = require("./IrcWatch");
const Logger_1 = require("./Logger");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const url_queue = new url_1.URL(process.env['URL_QUEUE'] || 'amqp://localhost');
        Logger_1.Logger.info(`starting queue [${url_queue.toString()}]...`);
        const queue = new irc_pubsub_1.IrcQueue(url_queue);
        yield queue.connect();
        const url_irc = new url_1.URL(process.env['URL_IRC'] || 'irc://locahost');
        Logger_1.Logger.info(`starting watcher [${url_irc.toString()}]...`);
        const irc = new IrcWatch_1.IrcWatch(queue, url_irc, 0);
        yield irc.connect('announce');
    });
}
run().catch(console.log);
//# sourceMappingURL=CLI.js.map