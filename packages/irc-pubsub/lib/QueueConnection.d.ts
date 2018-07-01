import { Connection } from 'amqp-ts';
import { Subject } from 'rxjs';
export declare abstract class QueueConnection<T> extends Subject<T> {
    protected readonly connection: Connection;
    protected readonly logger: import("@nofrills/lincoln/lib/Lincoln").Lincoln;
    constructor(url: URL);
    connect(): Promise<any>;
}
