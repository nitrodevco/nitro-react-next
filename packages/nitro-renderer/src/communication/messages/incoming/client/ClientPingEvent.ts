import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { ClientPingParser } from '../../parser';

export class ClientPingEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ClientPingParser);
    }

    public getParser(): ClientPingParser
    {
        return this.parser as ClientPingParser;
    }
}
