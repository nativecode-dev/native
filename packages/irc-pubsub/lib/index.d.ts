/// <reference types="node" />
export * from './IrcQueue';
export * from './IrcQueueConsumer';
export * from './QueueConnection';
export * from './TorrentLink';
import { URL } from 'url';
export declare const CreateQueueUrl: (host: string, port: number | undefined, username: string, password: string, vhost: string) => URL;
