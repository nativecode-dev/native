import { QueueConnection } from './QueueConnection';
import { TorrentLink } from './TorrentLink';
export declare class IrcQueueConsumer extends QueueConnection<TorrentLink> {
    private readonly exchange;
    private readonly queue;
    constructor(url: URL);
    private dequeue;
}
