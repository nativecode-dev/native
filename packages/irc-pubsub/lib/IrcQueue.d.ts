/// <reference types="node" />
import { URL } from 'url';
import { TorrentLink } from './TorrentLink';
import { QueueConnection } from './QueueConnection';
export declare class IrcQueue extends QueueConnection<TorrentLink> {
    private readonly exchange;
    constructor(url: URL);
    enqueue(link: TorrentLink): void;
}
