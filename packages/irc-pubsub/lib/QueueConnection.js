"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqp_ts_1 = require("amqp-ts");
const rxjs_1 = require("rxjs");
const Logger_1 = require("./Logger");
class QueueConnection extends rxjs_1.Subject {
    constructor(url) {
        super();
        this.logger = Logger_1.Logger.extend('queue');
        this.connection = new amqp_ts_1.Connection(url.toString());
    }
    connect() {
        return Promise.resolve(this.connection.completeConfiguration());
    }
}
exports.QueueConnection = QueueConnection;
//# sourceMappingURL=QueueConnection.js.map