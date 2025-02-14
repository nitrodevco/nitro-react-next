import { ICommunicationManager, IConnection, IMessageConfiguration, IMessageEvent } from '#renderer/api';
import { NitroEventType } from '#renderer/events';
import { GetTickerTime } from '#renderer/utils';
import { EventStore, GetConfigValue } from '@nitrodevco/nitro-shared';
import { NitroMessages } from './NitroMessages';
import { SocketConnection } from './SocketConnection';
import { AuthenticatedEvent, ClientHelloMessageComposer, ClientPingEvent, InfoRetrieveMessageComposer, PongMessageComposer, SSOTicketMessageComposer } from './messages';

export class CommunicationManager implements ICommunicationManager
{
    private _connection: IConnection = new SocketConnection();
    private _messages: IMessageConfiguration = new NitroMessages();

    private _pongInterval: any = null;

    constructor()
    {
        this._connection.registerMessages(this._messages);
    }

    public async init(): Promise<void>
    {
        EventStore.getState().subscribe(NitroEventType.SOCKET_CLOSED, () =>
        {
            this.stopPong();
        });

        return new Promise((resolve, reject) =>
        {
            EventStore.getState().subscribe(NitroEventType.SOCKET_OPENED, () =>
            {
                if (GetConfigValue<boolean>('socket.pongManually', false)) this.startPong();

                this._connection.send(new ClientHelloMessageComposer(null, null, null, null));
                this._connection.send(new SSOTicketMessageComposer(GetConfigValue('socket.ticket', ''), GetTickerTime()));
            });

            EventStore.getState().subscribe(NitroEventType.SOCKET_ERROR, () =>
            {
                reject();
            });

            this._connection.addMessageEvent(new ClientPingEvent((event: ClientPingEvent) => this.sendPong()));

            this._connection.addMessageEvent(new AuthenticatedEvent((event: AuthenticatedEvent) =>
            {
                this._connection.authenticated();

                resolve();

                event.connection.send(new InfoRetrieveMessageComposer());
            }));

            this._connection.init(GetConfigValue<string>('socket.url'));
        });
    }

    protected startPong(): void
    {
        if (this._pongInterval) this.stopPong();

        this._pongInterval = setInterval(() => this.sendPong(), GetConfigValue<number>('socket.pongInterval', 20000));
    }

    protected stopPong(): void
    {
        if (!this._pongInterval) return;

        clearInterval(this._pongInterval);

        this._pongInterval = null;
    }

    protected sendPong(): void
    {
        this._connection?.send(new PongMessageComposer());
    }

    public registerMessageEvent(event: IMessageEvent): IMessageEvent
    {
        if (this._connection) this._connection.addMessageEvent(event);

        return event;
    }

    public removeMessageEvent(event: IMessageEvent): void
    {
        if (!this._connection) return;

        this._connection.removeMessageEvent(event);
    }

    public get connection(): IConnection
    {
        return this._connection;
    }
}
