"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataSetReader_1 = require("./DataSetReader");
class GzipDataSetReader extends DataSetReader_1.DataSetReader {
    constructor(filename) {
        super();
        this.filename = filename;
    }
}
exports.GzipDataSetReader = GzipDataSetReader;
//# sourceMappingURL=GzipDataSetReader.js.map