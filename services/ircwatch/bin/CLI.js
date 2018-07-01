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
const IrcWatch_1 = require("./IrcWatch");
const irc_pubsub_1 = require("@ncpub/irc-pubsub");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        process.env['AMQPTS_LOGLEVEL'] = 'info';
        const url = irc_pubsub_1.CreateQueueUrl('queue.nativecode.com', undefined, 'ircwatch', 'irc.watch', 'ircwatch');
        console.log(`starting queue [${url.toString()}]...`);
        const queue = new irc_pubsub_1.IrcQueue(url);
        yield queue.connect();
        console.log('starting watcher...');
        const irc = new IrcWatch_1.IrcWatch(queue, 'irc.xspeeds.eu', undefined, 0);
        yield irc.connect('announce');
    });
}
run().catch(console.log);
//# sourceMappingURL=CLI.js.map