"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataSetReader {
    constructor() {
        this.locked = false;
        this.table = {
            columns: [],
            rows: [],
        };
    }
    addColumnName(name) {
        if (this.locked === false) {
            return this.table.columns.push(name);
        }
        throw new Error(`Cannot add {name}, column definitions are locked.`);
    }
    addRowData(values) {
        if (this.locked === false) {
            this.locked = true;
        }
        return this.table.rows.push(values.reduce((row, value, index) => row[this.getColumnName(index)] = value, {}));
    }
    getColumnName(index) {
        return this.table.columns[index];
    }
}
exports.DataSetReader = DataSetReader;
//# sourceMappingURL=DataSetReader.js.map