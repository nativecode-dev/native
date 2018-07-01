"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const zlib = require("zlib");
const rxjs_1 = require("rxjs");
class DataSetStreamer {
    data(filename) {
        const subject = new rxjs_1.Subject();
        fs.createReadStream(filename)
            .pipe(zlib.createGunzip())
            .on('error', (error) => subject.error(error))
            .on('end', () => subject.complete())
            .on('data', (data) => data.toString().split('\n').forEach(line => this.parse(subject, line)));
        return subject;
    }
}
exports.DataSetStreamer = DataSetStreamer;
//# sourceMappingURL=DataSetStreamer.js.map