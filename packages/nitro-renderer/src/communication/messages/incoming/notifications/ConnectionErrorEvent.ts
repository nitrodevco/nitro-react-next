import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { ConnectionErrorMessageParser } from '../../parser/notifications/ConnectionErrorMessageParser';

export class ConnectionErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ConnectionErrorMessageParser);
    }

    public getParser(): ConnectionErrorMessageParser
    {
        return this.parser as ConnectionErrorMessageParser;
    }
}
