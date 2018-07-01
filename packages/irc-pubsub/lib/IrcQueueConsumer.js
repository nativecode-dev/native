"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QueueConnection_1 = require("./QueueConnection");
class IrcQueueConsumer extends QueueConnection_1.QueueConnection {
    constructor(url) {
        super(url);
        this.dequeue = (message) => {
            try {
                const content = message.getContent();
                this.logger.debug(content);
                this.next(content);
                message.ack();
            }
            catch (error) {
                this.logger.error(error);
                message.nack();
            }
        };
        const name = url.pathname.substr(1);
        this.exchange = this.connection.declareExchange(name, 'fanout', { durable: true });
        this.queue = this.connection.declareQueue(name, { durable: true });
        this.queue.bind(this.exchange);
        this.queue.activateConsumer(this.dequeue, { consumerTag: `${process.pid}:${process.getuid()}` });
    }
}
exports.IrcQueueConsumer = IrcQueueConsumer;
//# sourceMappingURL=IrcQueueConsumer.js.map