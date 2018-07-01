"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqp_ts_1 = require("amqp-ts");
const QueueConnection_1 = require("./QueueConnection");
class IrcQueue extends QueueConnection_1.QueueConnection {
    constructor(url) {
        super(url);
        const name = url.pathname.substr(1);
        this.exchange = this.connection.declareExchange(name, 'fanout', { durable: true });
    }
    enqueue(link) {
        const message = new amqp_ts_1.Message(link);
        this.logger.debug('enqueue', message);
        this.exchange.send(message);
        this.next(link);
    }
}
exports.IrcQueue = IrcQueue;
//# sourceMappingURL=IrcQueue.js.map