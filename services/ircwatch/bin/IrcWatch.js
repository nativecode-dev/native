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
const colors = require("irc-colors");
const ircv3_1 = require("ircv3");
const Logger_1 = require("./Logger");
class IrcWatch {
    constructor(queue, url, retryCount) {
        this.queue = queue;
        this.url = url;
        this.retryCount = retryCount;
        this.logger = Logger_1.Logger;
        this.retries = 0;
        this.onConnect = () => {
            this.logger.info(`connected to ${this.url.toString()}`);
        };
        this.onDisconnect = (reason) => {
            if (reason) {
                this.logger.error(reason);
            }
            if (this.retryCount === undefined) {
                return;
            }
            if (this.retries < this.retryCount) {
                this.retries++;
            }
            const timeout = this.retries * this.retryCount * 1000;
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                this.logger.debug(`reconnecting, waiting ${timeout / 1000} seconds...`);
                yield this.client.reconnect();
            }), timeout);
        };
        this.onPrivateMessage = (target, user, text, message) => {
            if (target === '#announce' && user === 'Announce') {
                try {
                    const clean = colors.stripColorsAndStyle(message.params.message);
                    const pattern = /(?:(\w+):\s\(\s([\w\.\-\_\s\?\=\/\:]+)\s\))+/g;
                    const link = {};
                    let matches;
                    while ((matches = pattern.exec(clean)) !== null) {
                        const key = matches[1].toLowerCase();
                        const value = matches[2];
                        link[key] = value;
                    }
                    this.logger.debug('privmsg', link);
                    this.queue.enqueue(link);
                }
                catch (error) {
                    this.logger.error(error, text, target, user);
                }
            }
        };
        this.onRegister = (channel) => {
            const channelName = this.normalizeChannelName(channel);
            this.client.join(channelName);
            this.logger.info(`listening for new messages in ${channelName}`);
        };
        const connection = {
            hostName: url.host,
            nick: url.username,
            port: Number(url.port),
        };
        this.irclient = new ircv3_1.Client({ connection, debugLevel: 0 });
    }
    get client() {
        return this.irclient;
    }
    connect(channel) {
        this.retries = 0;
        this.client.onConnect(this.onConnect);
        this.client.onDisconnect(this.onDisconnect);
        this.client.onPrivmsg(this.onPrivateMessage);
        this.client.onRegister(() => this.onRegister(channel));
        return this.client.connect();
    }
    normalizeChannelName(channel) {
        if (channel && channel.startsWith('#')) {
            return channel;
        }
        return `#${channel}`;
    }
}
exports.IrcWatch = IrcWatch;
//# sourceMappingURL=IrcWatch.js.map