import { Subject } from 'rxjs';
import { DataSetStreamer } from './DataSetStreamer';
export interface NameBasic {
    nconst: string;
    primaryName: string;
    birthYear: number;
    deathYear?: number;
    primaryProfession: string;
    knownForTitles: string[];
}
export declare class NameBasicDataSet extends DataSetStreamer<NameBasic> {
    protected parse(subject: Subject<NameBasic>, line: string): void;
}
