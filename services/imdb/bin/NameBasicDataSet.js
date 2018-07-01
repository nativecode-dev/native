"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataSetStreamer_1 = require("./DataSetStreamer");
class NameBasicDataSet extends DataSetStreamer_1.DataSetStreamer {
    parse(subject, line) {
        const values = line.split('\t');
        subject.next({
            nconst: values[0],
            primaryName: values[1],
            birthYear: parseInt(values[2]),
            deathYear: values[3] === '\N' ? undefined : parseInt(values[3]),
            primaryProfession: values[4],
            knownForTitles: values[5] ? values[5].split(',') : [],
        });
    }
}
exports.NameBasicDataSet = NameBasicDataSet;
//# sourceMappingURL=NameBasicDataSet.js.map