import { Observable, Subject } from 'rxjs';
export declare abstract class DataSetStreamer<T> {
    data(filename: string): Observable<T>;
    protected abstract parse(subject: Subject<T>, line: string): void;
}
