/// <reference types="node" />
import { IrcQueue } from '@ncpub/irc-pubsub';
import { Client } from 'ircv3';
import { URL } from 'url';
export declare class IrcWatch {
    private readonly queue;
    private readonly url;
    private readonly retryCount?;
    private readonly irclient;
    private readonly logger;
    private retries;
    constructor(queue: IrcQueue, url: URL, retryCount?: number | undefined);
    protected readonly client: Client;
    connect(channel: string): Promise<void>;
    protected normalizeChannelName(channel: string): string;
    private onConnect;
    private onDisconnect;
    private onPrivateMessage;
    private onRegister;
}
