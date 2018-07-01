"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const NameBasicDataSet_1 = require("./NameBasicDataSet");
const filename = path.join(process.cwd(), './data/name.basics.tsv.gz');
const streamer = new NameBasicDataSet_1.NameBasicDataSet();
streamer.data(filename).subscribe(value => console.log(value));
//# sourceMappingURL=CLI.js.map