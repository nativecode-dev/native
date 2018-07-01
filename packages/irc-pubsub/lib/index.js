"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./IrcQueue"));
__export(require("./IrcQueueConsumer"));
__export(require("./QueueConnection"));
const url_1 = require("url");
exports.CreateQueueUrl = (host, port = 5672, username, password, vhost) => {
    const url = new url_1.URL(`amqp://${host}`);
    url.username = username;
    url.password = password;
    url.pathname = vhost;
    url.port = port.toString();
    return url;
};
//# sourceMappingURL=index.js.map