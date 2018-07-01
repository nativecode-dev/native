import { Client } from 'ircv3';
import { IrcQueue } from '@ncpub/irc-pubsub';
export declare class IrcWatch {
    private readonly queue;
    private readonly host;
    private readonly port;
    private readonly retryCount?;
    private readonly irclient;
    private readonly logger;
    private retries;
    constructor(queue: IrcQueue, host: string, port?: number, retryCount?: number | undefined);
    protected readonly client: Client;
    connect(channel: string): Promise<void>;
    protected normalizeChannelName(channel: string): string;
    private onConnect;
    private onDisconnect;
    private onPrivateMessage;
    private onRegister;
}
